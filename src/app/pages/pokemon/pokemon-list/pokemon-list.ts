import { Component, inject, signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CharacterSummary } from '../../../core/models/character-summary.model';
import { PokemonService } from '../../../core/services/pokemon.service';
import { CharacterList } from '../../../shared/character-list/character-list';

@Component({
  selector: 'app-pokemon-list',
  imports: [CharacterList],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
})
export class PokemonList {
  private service = inject(PokemonService);
  private snackBar = inject(MatSnackBar);

  characters = signal<CharacterSummary[]>([]);
  total = signal(0);
  pageIndex = signal(0);
  pageSize = signal(12);
  loading = signal(true);
  error = signal(false);

  constructor() {
    this.loadPage();
  }

  loadPage() {
    this.loading.set(true);
    this.error.set(false);

    this.service.getList(this.pageIndex(), this.pageSize()).subscribe({
      next: (response) => {
        const list: CharacterSummary[] = [];

        for (const pokemon of response.results) {
          // La dirección termina en el ID
          const id = Number(pokemon.url.split('/')[6]);
          // El nombre viene en minúscula; se cambia la primera letra a mayúscula
          const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

          list.push({ id: id, name: name, image: this.service.getImageUrl(id) });
        }

        this.characters.set(list);
        this.total.set(response.count);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
        this.snackBar.open('No se pudo conectar con PokeAPI', 'Cerrar', { duration: 5000 });
      },
    });
  }

  // Se ejecuta cuando el usuario cambia de página o el tamaño de página
  onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadPage();
  }
}