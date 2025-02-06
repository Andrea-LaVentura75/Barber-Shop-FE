import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { iUser } from '../../../interface/i-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-barbiere',
  templateUrl: './dashboard-barbiere.component.html',
  styleUrls: ['./dashboard-barbiere.component.scss'],
})
export class DashboardBarbiereComponent implements OnInit {
  nomeBarbiere: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Recupera i dati dell'utente loggato
    const user = this.authService.authSubject$.getValue()?.user;

    if (this.isUser(user) && user.isBarber) {
      // Usa il type guard
      this.nomeBarbiere = user.nome;
    } else {
      this.nomeBarbiere = 'Utente';
    }
  }

  // Type guard per verificare se l'utente è di tipo iUser
  private isUser(user: any): user is iUser {
    return (user as iUser).isBarber !== undefined;
  }

  // Metodo per il logout
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Naviga alla pagina di login dopo il logout
  }
}
