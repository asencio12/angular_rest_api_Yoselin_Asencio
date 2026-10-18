import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CharacterSummary } from '../../core/models/character-summary.model';
import { ImageDialog } from '../image-dialog/image-dialog';

/**
 * Tarjeta lleva al personaje (imagen, ID y nombre).
 * - Clic en la imagen: abre el modal con la imagen ampliada.
 * - Clic en el resto de la tarjeta: navega a la página de detalle.
 */
@Component({
  selector: 'app-character-card',
  imports: [RouterLink, MatCardModule, MatIconModule],
  templateUrl: './character-card.html',
  styleUrl: './character-card.scss',
})
export class CharacterCard {
  private readonly dialog = inject(MatDialog);

  readonly character = input.required<CharacterSummary>();
  /** Ruta base del detalle, por ejemplo '/digimon' (se le agrega el ID). */
  readonly detailPath = input.required<string>();

  protected readonly imageFailed = signal(false);

  protected openImage(): void {
    const { image, name } = this.character();
    this.dialog.open(ImageDialog, {
      data: { src: image, alt: name },
      maxWidth: '95vw',
    });
  }
}