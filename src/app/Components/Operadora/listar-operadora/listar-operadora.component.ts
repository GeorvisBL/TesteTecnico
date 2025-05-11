import { Component, OnInit, ViewChild } from '@angular/core';
import{ Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2'

import { Operadora } from '../../../Interface/Operadora/operadora';

import { OperadoraService } from '../../../Services/Operadora/operadora.service';
import { UtilidadeService } from '../../../Services/Utilidade/utilidade.service';

@Component({
  selector: 'app-listar-operadora',
  imports: [MatIconModule, CommonModule, MatTableModule, MatCardModule],
  templateUrl: './listar-operadora.component.html',
  styleUrl: './listar-operadora.component.css'
})
export class ListarOperadoraComponent implements OnInit {

  title: string = 'Operadoras';

  colunasTabela: string[] = ["id", "nomeOperadora", "tipoServico", "contatoSuporte", "acoes"];
  dados: Operadora[] = [];
  dataListaProdutos = new MatTableDataSource(this.dados);
  @ViewChild(MatPaginator) paginacaoTabela! : MatPaginator;


  constructor(
    private _router: Router,
    private _operadoraServico: OperadoraService,
    private _utilidadeServico: UtilidadeService
  ){}


  ngOnInit(): void {
      this.buscarListaOperadoras();
  }


  buscarListaOperadoras(){

    this._operadoraServico.obterOperadoras().subscribe({
      next: (data) => {

        this.dataListaProdutos.data = data;

      },
      error:(e) => {
        this._utilidadeServico.mostrarAlerta("Erro de sistema ..!", 'Oops!');
      }
    })

  }



  cadastrarEditarOperadora(id: number){

    this._router.navigate(['operadora', id]); 

  }


  eliminarOperadora(operadora: Operadora){    

    Swal.fire({
      title: 'Deseja Eliminar essa operadora?',
      text: `${operadora.nomeOperadora}`,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sim, Eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Não, Voltar'
    }).then((resultado) => {
    
      if(resultado.isConfirmed){
        this._operadoraServico.deletarOperadora(operadora.id).subscribe({
          
          next:(data) => {

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: data.msg,
              showConfirmButton: false,
              timer: 2500
            });

            this.buscarListaOperadoras();
            
          },
    
          error:(e) => {
            this._utilidadeServico.mostrarAlerta("Erro de sistema ..!", 'Oops!');
          }
          
        })
      }

    })


  }


}
