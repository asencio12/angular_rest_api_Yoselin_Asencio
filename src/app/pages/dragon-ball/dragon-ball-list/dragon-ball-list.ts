import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { DragonBallService } from '../../../core/services/dragon-ball.service';
import { CharacterBrowser, CharacterPageLoader } from '../../../shared/character-browser/character-browser';

@Component({
  selector: 'app-dragon-ball-list',
  imports: [CharacterBrowser],
  templateUrl: './dragon-ball-list.html',
  styleUrl: './dragon-ball-list.scss',
})
export class DragonBallList {
  private readonly service = inject(DragonBallService);

  /** Convierte la respuesta de la API de Dragon Ball al formato común del listado. */
  protected readonly loader: CharacterPageLoader = (pageIndex, pageSize) =>
    this.service.getPage(pageIndex, pageSize).pipe(
      map((response) => ({
        characters: response.items.map(({ id, name, image }) => ({ id, name, image })),
        total: response.meta.totalItems,
      })),
    );
}