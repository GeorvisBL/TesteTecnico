import { Component, OnInit } from '@angular/core';

import { EvolucaoMensal } from '../../Interface/Fatura/evolucao-mensal';

import { FaturaService } from '../../Services/Fatura/fatura.service';
import { UtilidadeService } from '../../Services/Utilidade/utilidade.service';

import Chart from 'chart.js/auto';

@Component({
  selector: 'app-grafico-barra',
  imports: [],
  templateUrl: './grafico-barra.component.html',
  styleUrl: './grafico-barra.component.css'
})
export class GraficoBarraComponent implements OnInit {

  titulo: string = 'Evolução mensal do total de faturas emitidas e pagas no último ano';

  evolucaoMensal!: EvolucaoMensal;

  constructor(
    private _faturaServico: FaturaService,
    private _utilidadeServico: UtilidadeService
  ) { }



  ngOnInit():void{

    this.inicializarGrafico();

  }

  inicializarGrafico(){

    this._faturaServico.obterEvolucaoMensal().subscribe({
      next: (data) => {

        if(data != null){
          this.evolucaoMensal = data;

          this.mostrarGrafico(this.evolucaoMensal.listaMeses ,this.evolucaoMensal.listaValor); 
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

    const cartBarras = new Chart('chartBarras',{

      type:'bar',
      data:{
        labels: labelGrafico,
        datasets:[{
          label:'# de Vendas',
          data: dataGrafico,
          backgroundColor:[
            'rgb(54, 162, 235)'
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
