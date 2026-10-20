import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DemonSlayerInfo } from '../../../core/models/demon-slayer.model';
import { DemonSlayerService } from '../../../core/services/demon-slayer.service';

@Component({
  selector: 'app-demon-slayer-detail',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './demon-slayer-detail.html',
  styleUrl: './demon-slayer-detail.scss',
})
export class DemonSlayerDetail {
  private service = inject(DemonSlayerService);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  character = signal<DemonSlayerInfo | null>(null);
  loading = signal(true);
  error = signal(false);

  constructor() {
    // Se toma el ID de la dirección: /demon-slayer/30
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getById(id).subscribe({
      next: (response) => {
        // El personaje viene dentro de la lista "content"; si está vacía, no existe
        if (response.content.length > 0) {
          this.character.set(response.content[0]);
        }
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
        this.snackBar.open('No se pudo cargar el detalle del personaje', 'Cerrar', { duration: 5000 });
      },
    });
  }
}