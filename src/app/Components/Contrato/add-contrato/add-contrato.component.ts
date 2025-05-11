import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ContratoAdicionarAtualizar } from '../../../Interface/Contrato/contrato-adicionar-atualizar';
import { Operadora } from '../../../Interface/Operadora/operadora';
import { Plano } from '../../../Interface/Plano/plano';

import { OperadoraService } from '../../../Services/Operadora/operadora.service';
import { PlanoService } from '../../../Services/Plano/plano.service';
import { ContratoService } from '../../../Services/Contrato/contrato.service';
import { UtilidadeService } from '../../../Services/Utilidade/utilidade.service';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-add-contrato',
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
  templateUrl: './add-contrato.component.html',
  styleUrl: './add-contrato.component.css'
})
export class AddContratoComponent implements OnInit {

  titulo: string = "Novo Contrato";
  botaoAcao: string = "Salvar";
  
  listaOperadoras: Operadora[] = [];
  listaPlanos: Plano[] = [];
  formularioContrato: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _operadoraServico: OperadoraService,
    private _planoServico: PlanoService,
    private _contratoServico: ContratoService,
    private _utilidadeServico: UtilidadeService
  ){

    this.formularioContrato = this.fb.group({
      idOperadora: ['', Validators.required],
      idPlano: ['', Validators.required],
      nomeFilial: ['', Validators.required],
      dataInicio: ['', Validators.required],
      dataVencimento: ['', Validators.required],
      valorMensal: ['', Validators.required],
    });

  }


  ngOnInit(): void {
    
    this.buscarOperadoras();

    this.buscarPlanos();

  }


  buscarOperadoras(){

    this._operadoraServico.obterOperadoras().subscribe({
      next:(data) => {

        this.listaOperadoras = data;

      },
      error:(e) => {
        this._utilidadeServico.mostrarAlerta("Erro de sistema ..!", 'Oops!');
      }
    })

  }
    
  buscarPlanos(){

    this._planoServico.obterPlanos().subscribe({
      next:(data) => {

        this.listaPlanos = data;

      },
      error:(e) => {
        this._utilidadeServico.mostrarAlerta("Erro de sistema ..!", 'Oops!');
      }
    })

  }


  salvar(){

    if(this.formularioContrato.valid){

      if(this.formularioContrato.value.dataInicio >= this.formularioContrato.value.dataVencimento){

        this._utilidadeServico.mostrarAlerta("A Data Inicio não pode ser maior do que a Data de Vencimento!", 'Oops!');
       
      }
      else{

        const newContrato: ContratoAdicionarAtualizar = {
          idOperadora: this.formularioContrato.value.idOperadora,
          idPlano: this.formularioContrato.value.idPlano,
          nomeFilial: this.formularioContrato.value.nomeFilial,
          dataInicio: this.formularioContrato.value.dataInicio,
          dataVencimento: this.formularioContrato.value.dataVencimento,
          valorMensal: this.formularioContrato.value.valorMensal,
          status: true
        }
    
        this._contratoServico.cadastrarContrato(newContrato).subscribe({
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
