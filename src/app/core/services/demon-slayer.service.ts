import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { DemonSlayerDetailResponse, DemonSlayerListResponse } from '../models/demon-slayer.model';

/** Pide los datos a la API de Demon Slayer (https://www.demonslayer-api.com). */
@Injectable({ providedIn: 'root' })
export class DemonSlayerService {
  private http = inject(HttpClient);
  private baseUrl = 'https://www.demonslayer-api.com/api/v1/characters';

  // El paginador cuenta desde 0, pero esta API cuenta desde 1: por eso se suma 1
  getList(pageIndex: number, pageSize: number) {
    return this.http.get<DemonSlayerListResponse>(`${this.baseUrl}?page=${pageIndex + 1}&limit=${pageSize}`);
  }

  // En esta API el detalle se pide con ?id=
  getById(id: number) {
    return this.http.get<DemonSlayerDetailResponse>(`${this.baseUrl}?id=${id}`);
  }
}