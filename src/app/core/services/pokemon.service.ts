import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PokemonInfo, PokemonListResponse } from '../models/pokemon.model';

/** Pide los datos a PokeAPI (https://pokeapi.co). */
@Injectable({ providedIn: 'root' })
export class PokemonService {
  private http = inject(HttpClient);
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  getList(pageIndex: number, pageSize: number) {
    const offset = pageIndex * pageSize;
    return this.http.get<PokemonListResponse>(`${this.baseUrl}?limit=${pageSize}&offset=${offset}`);
  }

  getById(id: number) {
    return this.http.get<PokemonInfo>(`${this.baseUrl}/${id}`);
  }

  getImageUrl(id: number) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
}