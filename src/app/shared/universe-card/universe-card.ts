import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Universe } from '../../core/models/universe.model';

/** Tarjeta reutilizable de un universo: imagen, nombre, descripción y enlace al listado. */
@Component({
  selector: 'app-universe-card',
  imports: [RouterLink, MatCardModule, MatIconModule],
  templateUrl: './universe-card.html',
  styleUrl: './universe-card.scss',
})
export class UniverseCard {
  readonly universe = input.required<Universe>();
  readonly index = input(0);
}