import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { DigimonService } from '../../../core/services/digimon.service';
import { CharacterBrowser, CharacterPageLoader } from '../../../shared/character-browser/character-browser';

@Component({
  selector: 'app-digimon-list',
  imports: [CharacterBrowser],
  templateUrl: './digimon-list.html',
  styleUrl: './digimon-list.scss',
})
export class DigimonList {
  private readonly service = inject(DigimonService);

  
  protected readonly loader: CharacterPageLoader = (pageIndex, pageSize) =>
    this.service.getPage(pageIndex, pageSize).pipe(
      map((response) => ({
        characters: response.content.map(({ id, name, image }) => ({ id, name, image })),
        total: response.pageable.totalElements,
      })),
    );
}