import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServizioService } from '../../../services/servizio.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-servizi-barbiere',
  templateUrl: './servizi-barbiere.component.html',
  styleUrls: ['./servizi-barbiere.component.scss'],
})
export class ServiziBarbiereComponent implements OnInit {
  servizi: any[] = []; // Array per contenere i servizi
  servizioForm!: FormGroup; // Form per aggiungere/modificare servizi
  isEditing: boolean = false; // Flag per distinguere aggiunta/modifica
  servizioInModifica: any = null; // Servizio attualmente in modifica

  constructor(
    private fb: FormBuilder,
    private servizioService: ServizioService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Inizializza il form
    this.servizioForm = this.fb.group({
      nome: ['', Validators.required],
      prezzo: ['', [Validators.required, Validators.min(1)]],
    });

    // Recupera i servizi dal backend
    this.caricaServizi();
  }

  // Recupera i servizi dal backend
  caricaServizi() {
    const barbiereId = this.authService.authSubject$.getValue()?.user.id; // Ottieni il barbiereId
    if (!barbiereId) {
      console.error('ID del barbiere non trovato!');
      return;
    }

    this.servizioService.trovaServizi(barbiereId).subscribe(
      (servizi) => {
        this.servizi = servizi;
        console.log('Servizi caricati con successo:', servizi);
      },
      (error) => {
        console.error('Errore durante il recupero dei servizi:', error);
      }
    );
  }

  // Aggiunge o modifica un servizio
  salvaServizio() {
    if (this.servizioForm.valid) {
      const barbiereId = this.authService.authSubject$.getValue()?.user.id;
      if (!barbiereId) {
        console.error('ID del barbiere non trovato!');
        return;
      }

      const payload = {
        barbiereId: barbiereId,
        nome: this.servizioForm.value.nome,
        prezzo: this.servizioForm.value.prezzo,
      };

      if (this.isEditing && this.servizioInModifica) {
        this.servizioService
          .modificaServizio(this.servizioInModifica.id, payload)
          .subscribe(
            (response) => {
              console.log('Servizio modificato con successo:', response);
              this.caricaServizi(); // Ricarica i servizi
              this.resetForm(); // Resetta il form
            },
            (error) => {
              console.error('Errore nella modifica del servizio:', error);
            }
          );
      } else {
        this.servizioService.aggiungiServizio(payload).subscribe(
          (response) => {
            console.log('Servizio aggiunto con successo:', response);
            this.caricaServizi(); // Ricarica i servizi
            this.resetForm(); // Resetta il form
          },
          (error) => {
            console.error("Errore nell'aggiunta del servizio:", error);
          }
        );
      }
    } else {
      console.error('Il form non è valido.');
    }
  }

  // Riempi il form con i dati del servizio da modificare
  modificaServizio(servizio: any) {
    this.isEditing = true;
    this.servizioInModifica = servizio;
    this.servizioForm.patchValue(servizio); // Riempie il form con i dati del servizio
  }

  // Elimina un servizio
  eliminaServizio(servizioId: number) {
    this.servizioService.eliminaServizio(servizioId).subscribe(
      () => {
        this.servizi = this.servizi.filter((s) => s.id !== servizioId); // Rimuove dalla tabella
      },
      (error) =>
        console.error("Errore durante l'eliminazione del servizio:", error)
    );
  }

  // Resetta il form e il flag
  resetForm() {
    this.isEditing = false;
    this.servizioInModifica = null;
    this.servizioForm.reset();
  }
}
