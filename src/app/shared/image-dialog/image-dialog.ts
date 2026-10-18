import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

export interface ImageDialogData {
  src: string;
  alt: string;
}

/** Modal que muestra una imagen en grande sin deformarla. */
@Component({
  selector: 'app-image-dialog',
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.alt }}</h2>
    <mat-dialog-content>
      <img class="large" [src]="data.src" [alt]="data.alt" referrerpolicy="no-referrer" />
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button type="button" mat-dialog-close>Cerrar</button>
    </mat-dialog-actions>
  `,
  styles: `
    .large {
      display: block;
      max-width: 100%;
      max-height: 60vh;
      width: auto;
      height: auto;
      margin: 0 auto;
      object-fit: contain;
    }
  `,
})
export class ImageDialog {
  protected readonly data = inject<ImageDialogData>(MAT_DIALOG_DATA);
}