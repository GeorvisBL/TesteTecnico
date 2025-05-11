import { Component, OnInit } from '@angular/core';

import { DistribuicaoFaturasPorStatus } from '../../Interface/Fatura/distribuicao-faturas-por-status';

import { FaturaService } from '../../Services/Fatura/fatura.service';
import { UtilidadeService } from '../../Services/Utilidade/utilidade.service';

import Chart from 'chart.js/auto';

@Component({
  selector: 'app-grafico-pizza',
  imports: [],
  templateUrl: './grafico-pizza.component.html',
  styleUrl: './grafico-pizza.component.css'
})
export class GraficoPizzaComponent implements OnInit{
  
  public chartPizza: any;
  titulo: string = 'Distribuição das faturas por status';
  distribuicaoFaturasPorStatus!: DistribuicaoFaturasPorStatus;

  constructor(
    private _faturaServico: FaturaService,
    private _utilidadeServico: UtilidadeService
  ) { }

  ngOnInit():void{

    this.inicializarGrafico();

  }

  inicializarGrafico(){

    this._faturaServico.obterDistribuicoFaturasPorStatus().subscribe({
      next: (data) => {

        if(data != null){
          this.distribuicaoFaturasPorStatus = data;

          this.mostrarGrafico(this.distribuicaoFaturasPorStatus.listaTipoFatura,this.distribuicaoFaturasPorStatus.listaValor); 
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

  mostrarGrafico(labelGrafico:any[],dataGrafico:any[]){

    const cartBarras = new Chart('chartPizza',{
    
      type:'pie',
      data:{
        labels: labelGrafico,
        datasets:[{
          data: dataGrafico,
          backgroundColor:[
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            'rgb(255, 99, 132)',
          ],
          borderColor:[
            'rgb(150, 148, 148)'
          ],
          borderWidth: 1
        }]
      },

      options:{
        maintainAspectRatio: false,
        responsive: true,
        scales:{
          y:{
            beginAtZero: true
          }
        }
      }

    })     

  }


}
