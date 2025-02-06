import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { iUser } from '../../../interface/i-user';
import { RicercaService } from '../../../services/ricerca.service';
import { Router } from '@angular/router';
import { PrenotazioneService } from '../../../services/prenotazione.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  appuntamenti: any[] = []; // Array per memorizzare gli appuntamenti del cliente

  constructor(
    private authService: AuthService,
    private ricercaService: RicercaService,
    private prenotazioneService: PrenotazioneService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Recupera i dati dell'utente loggato
    const user = this.authService.authSubject$.getValue()?.user as any;
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

  // Metodo per aprire il modale
  apriModale(content: any): void {
    this.modalService.open(content, { size: 'lg', backdrop: 'static' });
    this.caricaAppuntamenti(); // Carica gli appuntamenti quando il modale si apre
  }

  // Metodo per caricare gli appuntamenti
  caricaAppuntamenti(): void {
    const clienteId = this.authService.authSubject$.getValue()?.user.id;
    if (!clienteId) {
      console.error('ID del cliente non trovato!');
      return;
    }

    this.prenotazioneService.getAppuntamentiCliente(clienteId).subscribe(
      (appuntamenti) => {
        this.appuntamenti = appuntamenti;
        console.log('Appuntamenti caricati con successo:', appuntamenti);
      },
      (error) => {
        console.error('Errore durante il recupero degli appuntamenti:', error);
      }
    );
  }

  // Metodo per il logout
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Naviga alla pagina di login dopo il logout
  }
}
