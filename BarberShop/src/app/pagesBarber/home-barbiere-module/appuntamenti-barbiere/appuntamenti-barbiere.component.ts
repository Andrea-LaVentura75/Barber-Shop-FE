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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
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
          console.log('Slot creati con successo:', response.message); // Usa il messaggio della risposta JSON
          alert(response.message); // Mostra un messaggio all'utente
        },
        (error) => {
          console.error('Errore nella creazione degli slot:', error);
        }
      );
    }
  }
}
