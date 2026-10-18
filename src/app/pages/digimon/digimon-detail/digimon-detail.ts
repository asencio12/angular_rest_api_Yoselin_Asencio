import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BehaviorSubject, catchError, combineLatest, map, of, switchMap, tap } from 'rxjs';
import { DigimonDetail as DigimonInfo } from '../../../core/models/digimon.model';
import { DigimonService } from '../../../core/services/digimon.service';

@Component({
  selector: 'app-digimon-detail',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './digimon-detail.html',
  styleUrl: './digimon-detail.scss',
})
export class DigimonDetail {
  private readonly service = inject(DigimonService);
  private readonly route = inject(ActivatedRoute);
  private readonly snackBar = inject(MatSnackBar);
  private readonly reload = new BehaviorSubject<void>(undefined);

  protected readonly digimon = signal<DigimonInfo | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);
  protected readonly imageFailed = signal(false);

  protected readonly image = computed(() => this.digimon()?.images?.[0]?.href ?? '');

  /** Descripción en inglés si existe; si no, la primera disponible. */
  protected readonly description = computed(() => {
    const list = this.digimon()?.descriptions ?? [];
    const chosen = list.find((d) => d.language === 'en_us') ?? list[0];
    return chosen?.description?.trim() ?? '';
  });

  /** Solo se muestran los grupos que tienen datos (evita campos vacíos). */
  protected readonly groups = computed(() => {
    const d = this.digimon();
    if (!d) {
      return [];
    }
    return [
      { label: 'Nivel', values: (d.levels ?? []).map((x) => x.level) },
      { label: 'Tipo', values: (d.types ?? []).map((x) => x.type) },
      { label: 'Atributo', values: (d.attributes ?? []).map((x) => x.attribute) },
      { label: 'Campo', values: (d.fields ?? []).map((x) => x.field) },
    ].filter((g) => g.values.length > 0);
  });

  protected readonly evolutions = computed(() => {
    const d = this.digimon();
    if (!d) {
      return [];
    }
    return [
      { label: 'Evoluciona de', items: (d.priorEvolutions ?? []).filter((e) => e.id) },
      { label: 'Evoluciona a', items: (d.nextEvolutions ?? []).filter((e) => e.id) },
    ].filter((g) => g.items.length > 0);
  });

  constructor() {
    // Se escucha el parámetro de la ruta: al pulsar una evolución (/digimon/5 -> /digimon/9)
    // Angular reutiliza este componente y solo cambia el ID.
    combineLatest([this.route.paramMap.pipe(map((p) => p.get('id') ?? '')), this.reload])
      .pipe(
        tap(() => {
          this.loading.set(true);
          this.error.set(false);
          this.imageFailed.set(false);
        }),
        switchMap(([id]) =>
          this.service.getById(id).pipe(
            catchError(() => {
              this.error.set(true);
              this.snackBar.open('No se pudo cargar el detalle del Digimon.', 'Cerrar', { duration: 5000 });
              return of(null);
            }),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe((data) => {
        this.digimon.set(data);
        this.loading.set(false);
        window.scrollTo({ top: 0 });
      });
  }

  protected retry(): void {
    this.reload.next();
  }
}