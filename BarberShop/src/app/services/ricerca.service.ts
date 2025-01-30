import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class RicercaService {
  private baseUrl = `${environment.apiUrl}/barbiere`;

  constructor(private http: HttpClient) {}

  cercaBarbieri(nomeSalone: string): Observable<any> {
    const params = new HttpParams().set('nomeSalone', nomeSalone);

    // Posiziona i log prima del return
    console.log('Parametro nomeSalone:', nomeSalone);
    console.log('URL chiamato:', `${this.baseUrl}/cerca`);

    return this.http.get(`${this.baseUrl}/cerca`, { params });
  }

  cercaBarbierePerId(idBarbiere: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${idBarbiere}`);
  }
}
