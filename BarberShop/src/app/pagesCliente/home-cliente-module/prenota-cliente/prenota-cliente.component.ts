import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PrenotazioneService } from '../../../services/prenotazione.service';
import { ServizioService } from '../../../services/servizio.service';
import { iUser } from '../../../interface/i-user';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-prenota-cliente',
  templateUrl: './prenota-cliente.component.html',
  styleUrls: ['./prenota-cliente.component.scss'],
})
export class PrenotaClienteComponent implements OnInit {
  idBarbiere!: number;
  barbiere!: any;
  dataSelezionata!: string;
  slotDisponibili: any[] = [];
  slotSelezionato!: any;
  servizi: any[] = [];
  servizioSelezionato!: number;
  nota: string = '';

  constructor(
    private route: ActivatedRoute,
    private prenotazioneService: PrenotazioneService,
    private servizioService: ServizioService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Recupera l'ID del barbiere dal parametro del route
    this.idBarbiere = +this.route.snapshot.paramMap.get('idBarbiere')!;
    console.log('ID del barbiere:', this.idBarbiere);

    // Recupera i dettagli del barbiere
    this.prenotazioneService.getBarbiere(this.idBarbiere).subscribe({
      next: (data) => {
        this.barbiere = data;
        console.log('Dettagli del barbiere:', this.barbiere);
      },
      error: (err) => {
        console.error('Errore nel recupero del barbiere:', err);
      },
    });

    // Recupera i servizi del barbiere
    this.servizioService.trovaServizi(this.idBarbiere).subscribe({
      next: (data) => {
        this.servizi = data;
        console.log('Servizi:', this.servizi);
      },
      error: (err) => {
        console.error('Errore nel recupero dei servizi:', err);
      },
    });
  }

  cercaSlotDisponibili(): void {
    if (!this.dataSelezionata) return;

    this.prenotazioneService
      .getSlotDisponibili(this.idBarbiere, this.dataSelezionata)
      .subscribe({
        next: (slotDisponibili) => {
          this.slotDisponibili = slotDisponibili;
          console.log('Slot disponibili:', this.slotDisponibili);
        },
        error: (err) => {
          console.error('Errore nel recupero degli slot disponibili:', err);
        },
      });
  }

  selezionaSlot(slot: any, modalTemplate: any): void {
    this.slotSelezionato = slot;

    // Opzioni del modale
    const modalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      animation: true,
    };

    // Apertura del modale con il template passato
    this.modalService.open(modalTemplate, modalOptions).result.finally(() => {
      // Ripristina il focus su un elemento esterno dopo la chiusura
      const focusElement = document.querySelector(
        '.focusable-element'
      ) as HTMLElement;
      if (focusElement) {
        focusElement.focus();
      }
    });
  }

  prenotaAppuntamento(): void {
    const user = this.authService.authSubject$.getValue()?.user;
    const clienteId = (user as iUser)?.id;

    if (!clienteId) {
      console.error('ID del cliente non trovato!');
      return;
    }

    const payload = {
      cliente: { id: clienteId },
      barbiere: { id: this.idBarbiere },
      dataOra: this.slotSelezionato.dataOra,
      servizio: { id: this.servizioSelezionato },
      nota: this.nota,
    };

    this.prenotazioneService.creaPrenotazione(payload).subscribe({
      next: (data) => {
        console.log('Prenotazione avvenuta con successo:', data);
        this.modalService.dismissAll(); // Chiude il modale

        // Aggiorna gli slot disponibili
        this.cercaSlotDisponibili();
      },
      error: (err) => {
        console.error('Errore nella prenotazione:', err);
      },
    });
  }
}
