import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { iRegisterRequest } from '../../interface/i-register-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  avatarFile?: File;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      avatar: [null], // Campo opzionale per il file avatar
      barber: [false], // Cambiato da isBarber a barber
      comuneSalone: [''], // Applicabile solo ai barbieri
      viaSalone: [''],
      nomeSalone: [''],
      rangeAppuntamento: [null],
    });
  }

  // Metodo per gestire il caricamento del file avatar
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.avatarFile = event.target.files[0];
    }
  }

  // Metodo per registrare un nuovo utente
  register() {
    if (this.form.valid) {
      // Prepara i dati del form per la richiesta
      const formData: iRegisterRequest = {
        username: this.form.value.username,
        nome: this.form.value.nome,
        cognome: this.form.value.cognome,
        email: this.form.value.email,
        password: this.form.value.password,
        isBarber: this.form.value.barber, // Il valore della checkbox
        comuneSalone: this.form.value.barber
          ? this.form.value.comuneSalone
          : undefined,
        viaSalone: this.form.value.barber
          ? this.form.value.viaSalone
          : undefined,
        nomeSalone: this.form.value.barber
          ? this.form.value.nomeSalone
          : undefined,
        rangeAppuntamento: this.form.value.barber
          ? this.form.value.rangeAppuntamento
          : undefined,
      };

      // Invia la richiesta di registrazione tramite il servizio
      this.authSvc.register(formData, this.avatarFile).subscribe(
        (response) => {
          console.log('Registrazione completata:', response);
          this.router.navigate(['/auth/login']); // Reindirizza al login
        },
        (error) => {
          console.error('Errore durante la registrazione:', error);
        }
      );
    } else {
      console.error('Il form non è valido.');
    }
  }

  // Metodo per gestire il cambiamento della checkbox "Sei un barbiere"
  onBarberToggle() {
    const isBarber = this.form.get('barber')?.value;

    if (isBarber) {
      this.form.get('comuneSalone')?.setValidators(Validators.required);
      this.form.get('viaSalone')?.setValidators(Validators.required);
      this.form.get('nomeSalone')?.setValidators(Validators.required);
      this.form.get('rangeAppuntamento')?.setValidators(Validators.required);
    } else {
      this.form.get('comuneSalone')?.clearValidators();
      this.form.get('viaSalone')?.clearValidators();
      this.form.get('nomeSalone')?.clearValidators();
      this.form.get('rangeAppuntamento')?.clearValidators();
    }

    this.form.get('comuneSalone')?.updateValueAndValidity();
    this.form.get('viaSalone')?.updateValueAndValidity();
    this.form.get('nomeSalone')?.updateValueAndValidity();
    this.form.get('rangeAppuntamento')?.updateValueAndValidity();
  }
}
