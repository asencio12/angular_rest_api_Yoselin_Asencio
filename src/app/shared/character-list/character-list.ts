import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CharacterSummary } from '../../core/models/character-summary.model';
import { CharacterCard } from '../character-card/character-card';

/**
 * Listado reutilizable para los cuatro universos: título, cuadrícula de tarjetas,
 * estados de carga y error, y paginador. No sabe de dónde vienen los datos.
 */
@Component({
  selector: 'app-character-list',
  imports: [CharacterCard, MatPaginatorModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule],
  templateUrl: './character-list.html',
  styleUrl: './character-list.scss',
})
export class CharacterList {
  readonly title = input.required<string>();
  readonly characters = input.required<CharacterSummary[]>();
  readonly total = input.required<number>();
  readonly pageIndex = input.required<number>();
  readonly pageSize = input.required<number>();
  readonly detailPath = input.required<string>();
  readonly loading = input(false);
  readonly error = input(false);
  readonly pageSizeOptions = input<number[]>([12, 24, 48]);

  readonly pageChange = output<PageEvent>();
  readonly retry = output<void>();
}