import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Itaglio } from '../interface/itaglio';

@Injectable({
  providedIn: 'root',
})
export class TaglioService {
  private baseUrl = `${environment.apiUrl}/tagli`;

  constructor(private http: HttpClient) {}

  trovaTagli(barbiereId: number): Observable<Itaglio[]> {
    return this.http.get<Itaglio[]>(`${this.baseUrl}/${barbiereId}`);
  }

  aggiungiTaglio(barbiereId: number, formData: FormData): Observable<Itaglio> {
    return this.http.post<Itaglio>(`${this.baseUrl}/${barbiereId}`, formData);
  }

  eliminaTaglio(taglioId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${taglioId}`);
  }
}
