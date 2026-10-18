import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DigimonDetail, DigimonListResponse } from '../models/digimon.model';

/** Centraliza el consumo de la API de Digimon (https://digi-api.com). */
@Injectable({ providedIn: 'root' })
export class DigimonService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://digi-api.com/api/v1/digimon';

  /** La API pagina desde 0, igual que MatPaginator. */
  getPage(page: number, pageSize: number): Observable<DigimonListResponse> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);
    return this.http.get<DigimonListResponse>(this.baseUrl, { params });
  }

  getById(id: number | string): Observable<DigimonDetail> {
    return this.http.get<DigimonDetail>(`${this.baseUrl}/${id}`);
  }
}