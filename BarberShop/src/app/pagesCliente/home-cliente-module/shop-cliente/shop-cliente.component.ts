import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdottoService } from '../../../services/prodotto.service';

@Component({
  selector: 'app-shop-cliente',
  templateUrl: './shop-cliente.component.html',
  styleUrl: './shop-cliente.component.scss',
})
export class ShopClienteComponent implements OnInit {
  prodotti: any[] = [];
  idBarbiere!: number;

  constructor(
    private route: ActivatedRoute,
    private prodottoService: ProdottoService
  ) {}

  ngOnInit(): void {
    // Ottieni l'ID del barbiere dalla rotta
    this.idBarbiere = +this.route.snapshot.paramMap.get('idBarbiere')!;
    console.log('ID del barbiere:', this.idBarbiere);

    // Carica i prodotti del barbiere
    this.caricaProdotti();
  }

  caricaProdotti(): void {
    this.prodottoService.trovaProdotti(this.idBarbiere).subscribe(
      (response) => {
        this.prodotti = response;
        console.log('Prodotti caricati:', this.prodotti);
      },
      (error) => {
        console.error('Errore durante il caricamento dei prodotti:', error);
      }
    );
  }
}
