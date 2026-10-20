import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonInfo } from '../../../core/models/pokemon.model';
import { PokemonService } from '../../../core/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule, MatProgressBarModule, MatProgressSpinnerModule],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.scss',
})
export class PokemonDetail {
  private service = inject(PokemonService);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  pokemon = signal<PokemonInfo | null>(null);
  image = signal('');
  loading = signal(true);
  error = signal(false);

  constructor() {
    // Se toma el ID de la dirección: /pokemon/25
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getById(id).subscribe({
      next: (data) => {
        this.pokemon.set(data);
        this.image.set(this.service.getImageUrl(data.id));
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
        this.snackBar.open('No se pudo cargar el detalle del Pokémon', 'Cerrar', { duration: 5000 });
      },
    });
  }
}