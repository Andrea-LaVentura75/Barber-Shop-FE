import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RicercaService } from '../../../services/ricerca.service';

@Component({
  selector: 'app-prenota-cliente',
  templateUrl: './prenota-cliente.component.html',
  styleUrls: ['./prenota-cliente.component.scss'],
})
export class PrenotaClienteComponent implements OnInit {
  idBarbiere!: number; // ID del barbiere
  barbiere!: any; // Dettagli del barbiere

  constructor(
    private route: ActivatedRoute,
    private ricercaService: RicercaService
  ) {}

  ngOnInit(): void {
    // Recupera l'ID del barbiere dal parametro del route
    this.idBarbiere = +this.route.snapshot.paramMap.get('idBarbiere')!;
    console.log('ID del barbiere:', this.idBarbiere);

    // Recupera i dati del barbiere dal backend
    this.ricercaService.cercaBarbierePerId(this.idBarbiere).subscribe({
      next: (data) => {
        this.barbiere = data;
        console.log('Dettagli del barbiere:', this.barbiere);
      },
      error: (err) => {
        console.error('Errore nel recupero del barbiere:', err);
      },
    });
  }
}
