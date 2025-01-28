import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { iRegisterRequest } from '../interface/i-register-request';
import { Router } from '@angular/router';
import { iUser } from '../interface/i-user';
import { iLoginRequest } from '../interface/i-login-request';
import { ILoginResponse } from '../interface/i-login-response';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();

  registerUrl: string = environment.registerUrl;
  loginUrl: string = environment.loginUrl;
  autoLogoutTimer: any;

  authSubject$ = new BehaviorSubject<ILoginResponse | null>(null);

  isLoggedIn$ = this.authSubject$
    .asObservable()
    .pipe(map((accessData) => !!accessData));

  user$ = this.authSubject$
    .asObservable()
    .pipe(map((accessData) => accessData?.user));

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUser();
  }

  // Metodo per la registrazione
  register(userData: iRegisterRequest, avatar?: File) {
    const formData = new FormData();
    // Converti i dati utente in JSON string
    formData.append('appUser', JSON.stringify(userData));

    // Aggiungi il file avatar se presente
    if (avatar) {
      formData.append('avatar', avatar);
    }

    return this.http.post<iUser>(this.registerUrl, formData);
  }

  // Metodo per il login
  login(authData: iLoginRequest) {
    return this.http.post<ILoginResponse>(this.loginUrl, authData).pipe(
      tap((accessData) => {
        this.authSubject$.next(accessData);
        localStorage.setItem('accessData', JSON.stringify(accessData));

        const expDate = this.jwtHelper.getTokenExpirationDate(
          accessData.accessToken
        ) as Date;
        this.autoLogout(expDate);
      })
    );
  }

  // Metodo per il logout
  logout() {
    this.authSubject$.next(null);
    localStorage.removeItem('accessData');
    this.router.navigate(['/']);
  }

  // Auto logout al termine del token
  autoLogout(expDate: Date) {
    clearTimeout(this.autoLogoutTimer);
    const expMs = expDate.getTime() - new Date().getTime();

    this.autoLogoutTimer = setTimeout(() => {
      this.logout();
    }, expMs);
  }

  // Ripristina l'utente dal localStorage se il token è ancora valido
  restoreUser() {
    const userJson: string | null = localStorage.getItem('accessData');
    if (!userJson) return;
    const accessData: ILoginResponse = JSON.parse(userJson);
    if (this.jwtHelper.isTokenExpired(accessData.accessToken)) {
      localStorage.removeItem('accessData');
      return;
    }
    this.authSubject$.next(accessData);
  }
}
