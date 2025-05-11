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

import { TipoServico } from '../../../Interface/TipoServico/tipo-servico';
import { Operadora } from '../../../Interface/Operadora/operadora';
import { OperadoraAdicionarAtualizar } from '../../../Interface/Operadora/operadora-adicionar-atualizar';

import { OperadoraService } from '../../../Services/Operadora/operadora.service';
import { TipoServicoService } from '../../../Services/TipoServico/tipo-servico.service';
import { UtilidadeService } from '../../../Services/Utilidade/utilidade.service';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-operadora',
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
  templateUrl: './operadora.component.html',
  styleUrl: './operadora.component.css'
})
export class OperadoraComponent implements OnInit {


  idOperadoraUrl: number = 0;
  tituloAcao: string = "Cadastrar";
  botaoAcao: string = "Salvar";

  listaTipoServico: TipoServico[] = [];
  operadora!: Operadora;
  formularioOperadora: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private route: ActivatedRoute,
    private _operadoraServico: OperadoraService,
    private _tipoServicoServico: TipoServicoService,
    private _utilidadeServico: UtilidadeService
  ){
    this.route.params.subscribe(params => this.idOperadoraUrl = params['cod']);

    this.formularioOperadora = this.fb.group({
      id: [''],
      idTipoServico: ['', Validators.required],
      nomeOperadora: ['', Validators.required],
      contatoSuporte: ['', Validators.required]
    });

  }


  ngOnInit(): void {
    
    if(this.idOperadoraUrl > 0){
      this.tituloAcao = "Atualizar";

      this.buscarOperadoraParaAtualizar(this.idOperadoraUrl);
    }

    this.obterTipoServico();

  }

  
  voltarParaOperadora(){
    this._router.navigate(['listar-operadora']); 
  }


  obterTipoServico(){

    this._tipoServicoServico.obterTipoServicos().subscribe({
      next:(data) => {

        this.listaTipoServico = data;

      },
      error:(e) => {
        this._utilidadeServico.mostrarAlerta("Erro de sistema ..!", 'Oops!');
      }

    })

  }


  buscarOperadoraParaAtualizar(idOperadora: number){

    this._operadoraServico.obterOperadoraPorId(idOperadora).subscribe({
      next:(data) => {
      
        this.operadora = data;

        this.formularioOperadora.patchValue({
          id: data.id,
          idTipoServico: data.idTipoServico,
          nomeOperadora: data.nomeOperadora,
          contatoSuporte: data.contatoSuporte
        })

      },
      error:(e) => {
        this._utilidadeServico.mostrarAlerta("Erro de sistema ..!", 'Oops!');
      }
    })

  }


  guardarEditar_Operadora(){

    if (this.formularioOperadora.valid) {

      const newOperadora: OperadoraAdicionarAtualizar = {
        idTipoServico: this.formularioOperadora.value.idTipoServico,
        nomeOperadora: this.formularioOperadora.value.nomeOperadora,
        contatoSuporte: this.formularioOperadora.value.contatoSuporte
      }

      if(this.formularioOperadora.value.id == ""){

        this._operadoraServico.cadastrarOperadora(newOperadora).subscribe({
          next:(data) => {

            if(data.status){
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: data.msg,
                showConfirmButton: false,
                timer: 1500
              });
  
              this._router.navigate(['/listar-operadora']); 
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
            this._utilidadeServico.mostrarAlerta("Error de sistema ..!", 'Oops!');
          }
        })

      }
      else{

        this._operadoraServico.editarOperadora(this.formularioOperadora.value.id, newOperadora).subscribe({
          next:(data) => {

            if(data.status){

              Swal.fire({
                position: "top-end",
                icon: "success",
                title: data.msg,
                showConfirmButton: false,
                timer: 2500
              });
  
              this._router.navigate(['/listar-operadora']); 
            }
            else{
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: data.msg,
                showConfirmButton: false,
                timer: 2500
              });
            }

          },
          error:(e) => {
            this._utilidadeServico.mostrarAlerta("Error de sistema ..!", 'Oops!');
          }
        })

      }

    }

  }


}
