import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DragonBallDetail, DragonBallListResponse } from '../models/dragon-ball.model';

/** Centraliza el consumo de la API de Dragon Ball (https://dragonball-api.com). */
@Injectable({ providedIn: 'root' })
export class DragonBallService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://dragonball-api.com/api/characters';

  /** El paginador cuenta desde 0, pero esta API desde 1: la conversión se hace aquí. */
  getPage(pageIndex: number, pageSize: number): Observable<DragonBallListResponse> {
    const params = new HttpParams().set('page', pageIndex + 1).set('limit', pageSize);
    return this.http.get<DragonBallListResponse>(this.baseUrl, { params });
  }

  getById(id: number | string): Observable<DragonBallDetail> {
    return this.http.get<DragonBallDetail>(`${this.baseUrl}/${id}`);
  }
}