import { Component, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CharacterSummary } from '../../core/models/character-summary.model';
import { CharacterList } from '../character-list/character-list';

/** Una página de resultados ya convertida al formato común. */
export interface CharacterPage {
  characters: CharacterSummary[];
  total: number;
}

/** Función que cada universo entrega para pedir una página (índice desde 0). */
export type CharacterPageLoader = (pageIndex: number, pageSize: number) => Observable<CharacterPage>;

const DEFAULT_PAGE_SIZE = 12;

/**
 * Encapsula lo que se repite en los listados de los cuatro universos:
 * leer la página de la URL, pedir los datos, manejar carga/error y avisar con SnackBar.
 * Cada universo solo aporta su `loader`.
 */
@Component({
  selector: 'app-character-browser',
  imports: [CharacterList],
  template: `
    <app-character-list
      [title]="title()"
      [detailPath]="detailPath()"
      [characters]="characters()"
      [total]="total()"
      [pageIndex]="pageIndex()"
      [pageSize]="pageSize()"
      [loading]="loading()"
      [error]="error()"
      (pageChange)="onPageChange($event)"
      (retry)="retry()"
    />
  `,
})
export class CharacterBrowser {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  readonly title = input.required<string>();
  readonly detailPath = input.required<string>();
  readonly loader = input.required<CharacterPageLoader>();

  // La página y el tamaño viven en la URL (?page=2&size=24): así el botón
  // "atrás" desde el detalle vuelve a la misma página del listado.
  private readonly params = toSignal(this.route.queryParamMap, { requireSync: true });
  protected readonly pageIndex = computed(() => Math.max(0, Number(this.params().get('page')) || 0));
  protected readonly pageSize = computed(() => Number(this.params().get('size')) || DEFAULT_PAGE_SIZE);

  protected readonly characters = signal<CharacterSummary[]>([]);
  protected readonly total = signal(0);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);
  private readonly attempt = signal(0);

  constructor() {
    // Se vuelve a pedir la página cada vez que cambia el loader, la página, el tamaño o se reintenta.
    effect((onCleanup) => {
      const loader = this.loader();
      const pageIndex = this.pageIndex();
      const pageSize = this.pageSize();
      this.attempt();

      untracked(() => {
        this.loading.set(true);
        this.error.set(false);

        const subscription = loader(pageIndex, pageSize).subscribe({
          next: (page) => {
            this.characters.set(page.characters);
            this.total.set(page.total);
            this.loading.set(false);
          },
          error: () => {
            this.loading.set(false);
            this.error.set(true);
            this.snackBar.open(`No se pudo conectar con la API de ${this.title()}.`, 'Cerrar', { duration: 5000 });
          },
        });
        onCleanup(() => subscription.unsubscribe());
      });
    });
  }

  protected onPageChange(event: PageEvent): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: event.pageIndex, size: event.pageSize },
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected retry(): void {
    this.attempt.update((n) => n + 1);
  }
}