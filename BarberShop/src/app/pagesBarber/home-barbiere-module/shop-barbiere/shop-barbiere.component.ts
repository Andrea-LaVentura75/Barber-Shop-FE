import { Component, OnInit } from '@angular/core';
import { ProdottoService } from '../../../services/prodotto.service';
import { AuthService } from '../../../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shop-barbiere',
  templateUrl: './shop-barbiere.component.html',
  styleUrl: './shop-barbiere.component.scss',
})
export class ShopBarbiereComponent implements OnInit {
  prodotti: any[] = [];
  prodottoForm!: FormGroup; // Aggiunto un FormGroup
  immagineSelezionata: File | null = null;
  isEditing: boolean = false;
  prodottoInModifica: any = null;

  constructor(
    private prodottoService: ProdottoService,
    private authService: AuthService,
    private fb: FormBuilder // Iniezione del FormBuilder
  ) {}

  ngOnInit(): void {
    this.prodottoForm = this.fb.group({
      nome: ['', Validators.required],
      descrizione: ['', Validators.required],
      prezzo: [null, [Validators.required, Validators.min(0.01)]], // Validazione per un prezzo valido
      immagine: [null], // Campo opzionale per l'immagine
    });

    this.caricaProdotti();
  }

  // Recupera i prodotti dal backend
  caricaProdotti(): void {
    const barbiereId = this.authService.authSubject$.getValue()?.user.id;
    if (!barbiereId) {
      console.error('ID del barbiere non trovato!');
      return;
    }

    this.prodottoService.trovaProdotti(barbiereId).subscribe(
      (prodotti) => {
        this.prodotti = prodotti;
        console.log('Prodotti caricati con successo:', prodotti);
      },
      (error) => {
        console.error('Errore durante il recupero dei prodotti:', error);
      }
    );
  }

  // Aggiunge o modifica un prodotto
  salvaProdotto(): void {
    const barbiereId = this.authService.authSubject$.getValue()?.user.id;
    if (!barbiereId) {
      console.error('ID del barbiere non trovato!');
      return;
    }

    const formData = new FormData();
    const prodotto = {
      nome: this.prodottoForm.get('nome')?.value,
      descrizione: this.prodottoForm.get('descrizione')?.value,
      prezzo: this.prodottoForm.get('prezzo')?.value,
    };

    formData.append('prodotto', JSON.stringify(prodotto));

    const immagine = this.prodottoForm.get('immagine')?.value;
    if (immagine) {
      formData.append('immagine', immagine);
    }

    if (this.isEditing && this.prodottoInModifica) {
      this.prodottoService
        .modificaProdotto(this.prodottoInModifica.id, formData)
        .subscribe(
          (response) => {
            console.log('Prodotto modificato con successo:', response);
            this.caricaProdotti();
            this.resetForm();
          },
          (error) => {
            console.error('Errore nella modifica del prodotto:', error);
          }
        );
    } else {
      this.prodottoService.aggiungiProdotto(barbiereId, formData).subscribe(
        (response) => {
          console.log('Prodotto aggiunto con successo:', response);
          this.caricaProdotti();
          this.resetForm();
        },
        (error) => {
          console.error("Errore nell'aggiunta del prodotto:", error);
        }
      );
    }
  }

  // Riempi il form con i dati del prodotto da modificare
  modificaProdotto(prodotto: any): void {
    this.isEditing = true;
    this.prodottoInModifica = prodotto;
    this.prodottoForm = { ...prodotto };
  }

  // Elimina un prodotto
  eliminaProdotto(prodottoId: number): void {
    this.prodottoService.eliminaProdotto(prodottoId).subscribe(
      () => {
        this.prodotti = this.prodotti.filter((p) => p.id !== prodottoId);
      },
      (error) =>
        console.error("Errore durante l'eliminazione del prodotto:", error)
    );
  }

  aggiungiProdotto(): void {
    if (this.prodottoForm.valid && this.immagineSelezionata) {
      const barbiereId = this.authService.authSubject$.getValue()?.user.id;

      if (!barbiereId) {
        console.error('ID del barbiere non trovato!');
        return;
      }

      const formData = new FormData();
      const prodotto = {
        nome: this.prodottoForm.value.nome,
        descrizione: this.prodottoForm.value.descrizione,
        prezzo: this.prodottoForm.value.prezzo,
      };

      // Aggiungi il prodotto come JSON al FormData
      formData.append('prodotto', JSON.stringify(prodotto));

      // Aggiungi l'immagine
      formData.append('immagine', this.immagineSelezionata);

      this.prodottoService.aggiungiProdotto(barbiereId, formData).subscribe({
        next: (response) => {
          console.log('Prodotto aggiunto con successo:', response);
          this.caricaProdotti(); // Ricarica la lista dei prodotti
          this.resetForm(); // Resetta il form
        },
        error: (err) => {
          console.error("Errore durante l'aggiunta del prodotto:", err);
        },
      });
    } else {
      console.error(
        "Il form non è valido o l'immagine non è stata selezionata."
      );
    }
  }

  // Gestisci il file selezionato
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.prodottoForm.patchValue({ immagine: file });
      this.prodottoForm.get('immagine')?.updateValueAndValidity();
    }
  }

  // Resetta il form e il flag
  resetForm(): void {
    this.isEditing = false;
    this.prodottoInModifica = null;

    this.prodottoForm.reset({
      nome: '',
      descrizione: '',
      prezzo: null,
      immagine: null,
    });
  }
}
