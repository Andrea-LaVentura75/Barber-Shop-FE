import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ServizioService {
  private baseUrl = `${environment.apiUrl}/servizi`;

  constructor(private http: HttpClient) {}

  // Recupera i servizi del barbiere
  trovaServizi(barbiereId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/servizi/${barbiereId}`);
  }

  // Aggiunge un nuovo servizio
  aggiungiServizio(payload: any): Observable<any> {
    const params = new HttpParams().set(
      'barbiereId',
      payload.barbiereId.toString()
    );
    return this.http.post(
      `${environment.apiUrl}/servizi/${payload.barbiereId}`,
      payload
    );
  }

  // Modifica un servizio esistente
  modificaServizio(servizioId: number, payload: any): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}/servizi/${servizioId}`,
      payload
    );
  }

  // Elimina un servizio
  eliminaServizio(servizioId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${servizioId}`);
  }
}
