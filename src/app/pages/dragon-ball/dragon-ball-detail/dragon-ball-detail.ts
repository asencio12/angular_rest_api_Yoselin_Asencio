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
import { DragonBallDetail as DragonBallInfo } from '../../../core/models/dragon-ball.model';
import { DragonBallService } from '../../../core/services/dragon-ball.service';

@Component({
  selector: 'app-dragon-ball-detail',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './dragon-ball-detail.html',
  styleUrl: './dragon-ball-detail.scss',
})
export class DragonBallDetail {
  private readonly service = inject(DragonBallService);
  private readonly route = inject(ActivatedRoute);
  private readonly snackBar = inject(MatSnackBar);
  private readonly reload = new BehaviorSubject<void>(undefined);

  protected readonly character = signal<DragonBallInfo | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);
  protected readonly imageFailed = signal(false);

  /** Solo se muestran los datos que vienen con valor (evita campos vacíos). */
  protected readonly facts = computed(() => {
    const c = this.character();
    if (!c) {
      return [];
    }
    return [
      { label: 'Raza', value: c.race },
      { label: 'Género', value: c.gender },
      { label: 'Afiliación', value: c.affiliation },
      { label: 'Ki', value: c.ki },
      { label: 'Ki máximo', value: c.maxKi },
    ].filter((fact) => fact.value);
  });

  constructor() {
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
              this.snackBar.open('No se pudo cargar el detalle del personaje.', 'Cerrar', { duration: 5000 });
              return of(null);
            }),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe((data) => {
        this.character.set(data);
        this.loading.set(false);
        window.scrollTo({ top: 0 });
      });
  }

  protected retry(): void {
    this.reload.next();
  }
}