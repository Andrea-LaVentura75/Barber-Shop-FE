import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { iUser } from '../../../interface/i-user';
import { RicercaService } from '../../../services/ricerca.service';

@Component({
  selector: 'app-dashboard-cliente',
  templateUrl: './dashboard-cliente.component.html',
  styleUrls: ['./dashboard-cliente.component.scss'],
})
export class DashboardClienteComponent implements OnInit {
  nomeCliente: string = 'Utente';
  ricercaInput: string = ''; // Input dell'utente
  risultatiRicerca: any[] = []; // Array per memorizzare i risultati della ricerca
  erroreRicerca: string | null = null; // Per gestire eventuali errori

  constructor(
    private authService: AuthService,
    private ricercaService: RicercaService
  ) {}

  ngOnInit(): void {
    // Recupera i dati dell'utente loggato
    const user = this.authService.authSubject$.getValue()?.user as iUser;
    if (user) {
      this.nomeCliente = user.nome;
    }
  }

  cercaBarbiere(): void {
    // Controlla che l'input di ricerca non sia vuoto
    if (!this.ricercaInput.trim()) {
      this.erroreRicerca =
        'Inserisci il nome del salone per iniziare la ricerca.';
      return;
    }

    // Chiama il servizio di ricerca
    this.ricercaService.cercaBarbieri(this.ricercaInput).subscribe(
      (risultati) => {
        this.risultatiRicerca = risultati; // Popola i risultati
        this.erroreRicerca = null; // Resetta eventuali errori
      },
      (error) => {
        console.error('Errore nella ricerca:', error);
        this.erroreRicerca =
          'Non è stato possibile trovare risultati. Riprova.';
      }
    );
  }
}
