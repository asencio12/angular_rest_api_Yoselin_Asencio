import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Página temporal de la Fase 2: sirve para comprobar que Angular Material
 * y los temas claro/oscuro funcionan. Se reemplaza por el dashboard en la Fase 3.
 */
@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly snackBar = inject(MatSnackBar);

  protected mostrarMensaje(): void {
    this.snackBar.open('Angular Material funciona correctamente', 'Cerrar', { duration: 3000 });
  }
}