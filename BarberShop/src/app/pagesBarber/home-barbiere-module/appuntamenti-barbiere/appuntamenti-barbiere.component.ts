import { PrenotazioneService } from './../../../services/prenotazione.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { SlotService } from '../../../services/slot.service';

@Component({
  selector: 'app-appuntamenti-barbiere',
  templateUrl: './appuntamenti-barbiere.component.html',
  styleUrls: ['./appuntamenti-barbiere.component.scss'],
})
export class AppuntamentiBarbiereComponent implements OnInit {
  slotForm!: FormGroup;
  dataSelezionata!: string; // Data selezionata dal barbiere
  appuntamenti: any[] = []; // Lista di appuntamenti del giorno

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private prenotazioneService: PrenotazioneService,
    private slotService: SlotService
  ) {}

  ngOnInit() {
    this.slotForm = this.fb.group({
      orarioApertura: ['', Validators.required],
      orarioChiusura: ['', Validators.required],
      durata: ['', Validators.required],
      giorni: ['', Validators.required],
    });
  }

  creaSlot() {
    if (this.slotForm.valid) {
      const barbiereId = this.authService.authSubject$.getValue()?.user.id;

      if (!barbiereId) {
        console.error('ID del barbiere non trovato!');
        return;
      }

      const payload = {
        barbiereId: barbiereId,
        orarioApertura: this.slotForm.value.orarioApertura,
        orarioChiusura: this.slotForm.value.orarioChiusura,
        rangeMinuti: this.slotForm.value.durata,
        giorni: this.slotForm.value.giorni,
      };

      this.slotService.creaSlotRicorrenti(payload).subscribe(
        (response) => {
          console.log('Slot creati con successo:', response.message);
          alert(response.message);
        },
        (error) => {
          console.error('Errore nella creazione degli slot:', error);
        }
      );
    }
  }

  getAppuntamentiPerGiorno() {
    if (!this.dataSelezionata) return;

    const barbiereId = this.authService.authSubject$.getValue()?.user.id;

    if (!barbiereId) {
      console.error('ID del barbiere non trovato!');
      return;
    }

    this.prenotazioneService
      .trovaAppuntamentiPerGiorno(barbiereId, this.dataSelezionata)
      .subscribe({
        next: (data) => {
          this.appuntamenti = data;
          console.log('Appuntamenti trovati:', this.appuntamenti);
        },
        error: (err) => {
          console.error('Errore nel recupero degli appuntamenti:', err);
        },
      });
  }
}
