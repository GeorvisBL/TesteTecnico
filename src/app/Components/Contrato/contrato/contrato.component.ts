import { Component, OnInit, ViewChild } from '@angular/core';
import{ Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Contrato } from '../../../Interface/Contrato/contrato';

import { ContratoService } from '../../../Services/Contrato/contrato.service';
import { UtilidadeService } from '../../../Services/Utilidade/utilidade.service';

@Component({
  selector: 'app-contrato',
  imports: [MatIconModule, CommonModule, MatTableModule, MatCardModule],
  templateUrl: './contrato.component.html',
  styleUrl: './contrato.component.css'
})
export class ContratoComponent implements OnInit {

  title: string = 'Contratos';
  btnTitle: string = 'Nuevo Contrato';

  colunasTabela: string[] = ["id", "operadora", "plano", "nomeFilial", "dataInicio", "dataVencimento", "valorMensal", "acoes"];
  dados: Contrato[] = [];
  dataListaContratos = new MatTableDataSource(this.dados);
  @ViewChild(MatPaginator) paginacaoTabela! : MatPaginator;


  constructor(
    private _router: Router,
    private _contratoServico: ContratoService,
    private _utilidadeServico: UtilidadeService
  ){}


  ngOnInit(): void {

    this.buscarListaContratos();

  }


  buscarListaContratos(){

    this._contratoServico.obterContratos().subscribe({
      next:(data) => {

        this.dataListaContratos.data = data;

      },
      error:(e) => {
        this._utilidadeServico.mostrarAlerta("Erro de sistema ..!", 'Oops!');
      }
    })

    
  }


  cadastrarContrato(){

    this._router.navigate(['add-contrato']); 

  }
  

  cadastrarFatura(contrato: Contrato){

    this._router.navigate(['add-fatura/', contrato.id, contrato.operadora]); 

  }


}
