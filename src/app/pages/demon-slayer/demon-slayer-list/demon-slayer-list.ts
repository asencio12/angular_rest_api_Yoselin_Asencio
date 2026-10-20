import { Component, inject, signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CharacterSummary } from '../../../core/models/character-summary.model';
import { DemonSlayerService } from '../../../core/services/demon-slayer.service';
import { CharacterList } from '../../../shared/character-list/character-list';

@Component({
  selector: 'app-demon-slayer-list',
  imports: [CharacterList],
  templateUrl: './demon-slayer-list.html',
  styleUrl: './demon-slayer-list.scss',
})
export class DemonSlayerList {
  private service = inject(DemonSlayerService);
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

        for (const item of response.content) {
          // En esta API la imagen se llama "img"; la tarjeta usa "image"
          list.push({ id: item.id, name: item.name, image: item.img });
        }

        this.characters.set(list);
        this.total.set(response.pagination.totalElements);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
        this.snackBar.open('No se pudo conectar con la API de Demon Slayer', 'Cerrar', { duration: 5000 });
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