import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SlotService {
  private baseUrl = `${environment.apiUrl}/barbiere`;

  constructor(private http: HttpClient) {}

  creaSlotRicorrenti(payload: any): Observable<any> {
    const params = new HttpParams()
      .set('barbiereId', payload.barbiereId.toString()) // Converti in stringa
      .set('orarioApertura', payload.orarioApertura)
      .set('orarioChiusura', payload.orarioChiusura)
      .set('rangeMinuti', payload.rangeMinuti.toString())
      .set('giorni', payload.giorni.toString());

    return this.http.post(`${this.baseUrl}/slot-ricorrenti`, null, { params });
  }
}
