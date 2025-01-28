import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iLoginRequest } from '../../interface/i-login-request';
import { IBarber } from '../../interface/i-barber';
import { iUser } from '../../interface/i-user';
import { ILoginResponse } from '../../interface/i-login-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.login();
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  login() {
    if (this.form.valid) {
      const formData: iLoginRequest = this.form.value;

      this.authSvc.login(formData).subscribe(
        (data: ILoginResponse) => {
          console.log('Dati utente ricevuti:', data.user);

          // Usa il type guard per verificare se data.user è di tipo iUser
          if (this.isUser(data.user)) {
            if (data.user.isBarber) {
              this.router.navigate(['/barbiere/dashboard']); // Reindirizza al dashboard del barbiere
            } else {
              this.router.navigate(['/cliente/dashboard']); // Reindirizza al dashboard del cliente
            }
          } else {
            console.error('Tipo di utente sconosciuto:', data.user);
            alert('Errore: tipo di utente non riconosciuto.');
          }

          alert('Login effettuato correttamente');
        },
        (error) => {
          alert('Errore nel login: ' + error.message);
        }
      );
    }
  }

  // Type Guard per verificare se l'oggetto è di tipo iUser
  private isUser(user: iUser | IBarber): user is iUser {
    return (user as iUser).isBarber !== undefined;
  }
}
