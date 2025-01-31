import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PrenotazioneService {
  private baseUrl = `${environment.apiUrl}/appuntamenti`;

  constructor(private http: HttpClient) {}

  getSlotDisponibili(barbiereId: number, giorno: string): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/barbiere/${barbiereId}/slot-disponibili`,
      { params: { giorno: giorno } }
    );
  }

  creaPrenotazione(payload: any): Observable<any> {
    return this.http.post(this.baseUrl, payload);
  }

  getBarbiere(barbiereId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/barbiere/${barbiereId}`);
  }

  trovaAppuntamentiPerGiorno(
    barbiereId: number,
    giorno: string
  ): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/barbiere/${barbiereId}/giorno/${giorno}`
    );
  }
}
