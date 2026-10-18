import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterSummary } from '../../../core/models/character-summary.model';
import { DigimonService } from '../../../core/services/digimon.service';
import { CharacterList } from '../../../shared/character-list/character-list';

const DEFAULT_PAGE_SIZE = 12;

@Component({
  selector: 'app-digimon-list',
  imports: [CharacterList],
  templateUrl: './digimon-list.html',
  styleUrl: './digimon-list.scss',
})
export class DigimonList {
  private readonly service = inject(DigimonService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly characters = signal<CharacterSummary[]>([]);
  protected readonly total = signal(0);
  protected readonly pageIndex = signal(0);
  protected readonly pageSize = signal(DEFAULT_PAGE_SIZE);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);

  constructor() {
    // La página y el tamaño viven en la URL (?page=2&size=24): así el botón
    // "atrás" desde el detalle vuelve a la misma página del listado.
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.pageIndex.set(Math.max(0, Number(params.get('page')) || 0));
      this.pageSize.set(Number(params.get('size')) || DEFAULT_PAGE_SIZE);
      this.load();
    });
  }

  protected onPageChange(event: PageEvent): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: event.pageIndex, size: event.pageSize },
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected load(): void {
    this.loading.set(true);
    this.error.set(false);

    this.service
      .getPage(this.pageIndex(), this.pageSize())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.characters.set(response.content.map((d) => ({ id: d.id, name: d.name, image: d.image })));
          this.total.set(response.pageable.totalElements);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.error.set(true);
          this.snackBar.open('No se pudo conectar con la API de Digimon.', 'Cerrar', { duration: 5000 });
        },
      });
  }
}