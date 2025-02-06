import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProdottoService {
  private baseUrl = `${environment.apiUrl}/prodotti`;

  constructor(private http: HttpClient) {}

  // Aggiungi un nuovo prodotto
  aggiungiProdotto(barbiereId: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/${barbiereId}`, formData);
  }

  // Recupera i prodotti di un barbiere
  trovaProdotti(barbiereId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${barbiereId}`);
  }

  // Modifica un prodotto esistente
  modificaProdotto(prodottoId: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/${prodottoId}`, formData);
  }

  // Elimina un prodotto
  eliminaProdotto(prodottoId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${prodottoId}`);
  }
}
