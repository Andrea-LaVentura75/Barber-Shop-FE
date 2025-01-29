import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment.development';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthService) {
    console.log('TokenInterceptor Inizializzato!');
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(`Intercepting request to: ${request.url}`);

    // Escludi la richiesta di login dall'intercettazione
    if (request.url.includes(environment.loginUrl)) {
      console.log('Login URL, bypassing interceptor...');
      return next.handle(request);
    }

    const accessData = this.authSvc.authSubject$.getValue();
    if (!accessData) {
      console.log('No access token found, bypassing interceptor...');
      return next.handle(request);
    }

    console.log('Token trovato:', accessData.accessToken);

    const newRequest = request.clone({
      headers: request.headers.append(
        'Authorization',
        `Bearer ${accessData.accessToken}`
      ),
    });

    return next.handle(newRequest);
  }
}
