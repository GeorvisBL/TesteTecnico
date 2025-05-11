import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Indicadores } from '../../Interface/Indicadores/indicadores';

import { FaturaService } from '../../Services/Fatura/fatura.service';
import { UtilidadeService } from '../../Services/Utilidade/utilidade.service';

@Component({
  selector: 'app-indicadores-numericos-cards',
  imports: [CommonModule],
  templateUrl: './indicadores-numericos-cards.component.html',
  styleUrl: './indicadores-numericos-cards.component.css',
})
export class IndicadoresNumericosCardsComponent implements OnInit {

  indicadoresNumericos: Indicadores[] = [];


  constructor(
    private _faturaServico: FaturaService,
    private _utilidadeServico: UtilidadeService
  ){}


  ngOnInit(): void{

    this.buscarIndicadores();
    
  }

  buscarIndicadores(){

    this._faturaServico.obterInidcadores_Faturas().subscribe({

      next: (data) => {

        if(data.length > 0){
          this.indicadoresNumericos = data;
        }
        else{
          this._utilidadeServico.mostrarAlerta("Não existem registros na base de dados!", "Oops")
        }

      },
      error:(e) => {
        this._utilidadeServico.mostrarAlerta("Error de sistema ..!", "Oops!")
      }

    })

  } 


}
