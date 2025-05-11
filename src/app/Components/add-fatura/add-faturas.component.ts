import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { FaturaAdicionarAtualizar } from '../../Interface/Fatura/fatura-adicionar-atualizar';
import { FaturaStatus } from '../../Interface/FaturaStatus/fatura-status';
import { Contrato } from '../../Interface/Contrato/contrato';

import { FaturaService } from '../../Services/Fatura/fatura.service';
import { FaturaStatusService } from '../../Services/FaturaStatus/fatura-status.service';
import { UtilidadeService } from '../../Services/Utilidade/utilidade.service';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-add-faturas',
  imports: [
    MatIconModule, 
    CommonModule, 
    MatTableModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './add-faturas.component.html',
  styleUrl: './add-faturas.component.css'
})
export class AddFaturaComponent implements OnInit {

  idContratoUrl: number = 0;
  nomeOperadoraUrl: string = "";
  titulo: string = "Nova Fatura";
  botaoAcao: string = "Salvar";

  listarFaturaStatus: FaturaStatus[] = [];
  listarContratos: Contrato[] = [];
  formularioFatura: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private route: ActivatedRoute,
    private _faturaServico: FaturaService,
    private _faturaStatusServico: FaturaStatusService,
    private _utilidadeServico: UtilidadeService
  ){
    this.route.params.subscribe(params => this.idContratoUrl = params['cod1']);
    this.route.params.subscribe(params => this.nomeOperadoraUrl = params['cod2']);

    this.formularioFatura = this.fb.group({
      idFaturaStatus: ['', Validators.required],
      dataEmissao: ['', Validators.required],
      dataVencimento: ['', Validators.required],
      valorCobrado: ['', Validators.required]
    });

  }


  ngOnInit(): void {

    this.buscarFaturaStatus();
      
  }


  buscarFaturaStatus(){

    this._faturaStatusServico.obterFaturas().subscribe({
      next:(data) => {

        this.listarFaturaStatus = data;

      },
      error:(e) => {
        this._utilidadeServico.mostrarAlerta("Erro de sistema ..!", 'Oops!');
      }
    })

  };



  salvar(){

    if(this.formularioFatura.valid || this.idContratoUrl > 0){

      if(this.formularioFatura.value.dataEmissao >= this.formularioFatura.value.dataVencimento){
      
        this._utilidadeServico.mostrarAlerta("A Data Emissão não pode ser maior do que a Data de Vencimento!", 'Oops!');
              
      }
      else{

        const newFatura: FaturaAdicionarAtualizar ={
          idContrato: this.idContratoUrl,
          idFaturaStatus: 2,
          dataEmissao: this.formularioFatura.value.dataEmissao,
          dataVencimento: this.formularioFatura.value.dataVencimento,
          valorCobrado: this.formularioFatura.value.valorCobrado
        }

        this._faturaServico.cadastrarFatura(newFatura).subscribe({
          next:(data) => {

            if(data.status){
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: data.msg,
                showConfirmButton: false,
                timer: 1500
              });             
              
              this._router.navigate(['/contrato']); 
            }
            else{
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: data.msg,
                showConfirmButton: false,
                timer: 1500
              });
            }            

          },
          error:(e) => {
            this._utilidadeServico.mostrarAlerta("Erro de sistema ..!", 'Oops!');
          }
        })

      }

    }


  }


  voltarParaContrato(){

    this._router.navigate(['/contrato']); 

  }


}
