import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaglioService } from '../../../services/taglio.service';

@Component({
  selector: 'app-bacheca-tagli-cliente',
  templateUrl: './bacheca-tagli-cliente.component.html',
  styleUrl: './bacheca-tagli-cliente.component.scss',
})
export class BachecaTagliClienteComponent implements OnInit {
  tagli: any[] = []; // Array per contenere i tagli
  idBarbiere!: number; // ID del barbiere passato nella rotta

  constructor(
    private route: ActivatedRoute,
    private taglioService: TaglioService
  ) {}

  ngOnInit(): void {
    // Ottieni l'ID del barbiere dalla rotta
    this.idBarbiere = +this.route.snapshot.paramMap.get('idBarbiere')!;
    console.log('ID del barbiere:', this.idBarbiere);

    // Carica i tagli del barbiere
    this.caricaTagli();
  }

  caricaTagli(): void {
    this.taglioService.trovaTagli(this.idBarbiere).subscribe(
      (response) => {
        this.tagli = response;
        console.log('Tagli caricati:', this.tagli);
      },
      (error) => {
        console.error('Errore durante il caricamento dei tagli:', error);
      }
    );
  }
}
