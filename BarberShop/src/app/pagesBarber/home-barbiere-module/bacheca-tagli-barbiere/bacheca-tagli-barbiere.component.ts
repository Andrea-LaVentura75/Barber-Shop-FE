import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { TaglioService } from '../../../services/taglio.service';
import { Itaglio } from '../../../interface/itaglio';

@Component({
  selector: 'app-bacheca-tagli-barbiere',
  templateUrl: './bacheca-tagli-barbiere.component.html',
  styleUrls: ['./bacheca-tagli-barbiere.component.scss'],
})
export class BachecaTagliBarbiereComponent implements OnInit {
  tagli: Itaglio[] = [];
  immagine!: File;
  descrizione: string = '';
  taglioForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private taglioService: TaglioService
  ) {}

  ngOnInit(): void {
    this.taglioForm = this.fb.group({
      descrizione: ['', Validators.required],
      immagine: [null, Validators.required],
    });

    this.caricaTagli();
  }

  caricaTagli(): void {
    const barbiereId = this.authService.authSubject$.getValue()?.user.id;
    if (!barbiereId) {
      console.error('ID del barbiere non trovato!');
      return;
    }

    this.taglioService.trovaTagli(barbiereId).subscribe(
      (tagli: Itaglio[]) => {
        this.tagli = tagli;
        console.log('Tagli caricati con successo:', tagli);
      },
      (error) => {
        console.error('Errore durante il recupero dei tagli:', error);
      }
    );
  }

  // Aggiunge un nuovo taglio
  aggiungiTaglio(): void {
    if (this.taglioForm.invalid) {
      console.error('Il form non è valido.');
      return;
    }

    const barbiereId = this.authService.authSubject$.getValue()?.user.id;
    if (!barbiereId) {
      console.error('ID del barbiere non trovato!');
      return;
    }

    const formData = new FormData();
    formData.append('immagine', this.taglioForm.value.immagine);
    formData.append('descrizione', this.taglioForm.value.descrizione);

    this.taglioService.aggiungiTaglio(barbiereId, formData).subscribe({
      next: (response) => {
        console.log('Taglio aggiunto con successo:', response);
        this.caricaTagli(); // Aggiorna la lista dei tagli
        this.taglioForm.reset(); // Resetta il form
      },
      error: (error) => {
        console.error("Errore durante l'aggiunta del taglio:", error);
      },
    });
  }

  // Elimina un taglio
  eliminaTaglio(taglioId: number): void {
    this.taglioService.eliminaTaglio(taglioId).subscribe(
      () => {
        console.log('Taglio eliminato con successo');
        this.tagli = this.tagli.filter((t) => t.id !== taglioId);
      },
      (error) => {
        console.error("Errore durante l'eliminazione del taglio:", error);
      }
    );
  }

  // Gestisce il file selezionato
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.taglioForm.patchValue({ immagine: file });
      this.taglioForm.get('immagine')?.updateValueAndValidity();
    }
  }
}
