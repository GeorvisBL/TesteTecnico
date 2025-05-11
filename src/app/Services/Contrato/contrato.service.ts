import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

import { Contrato } from '../../Interface/Contrato/contrato';
import { ContratoAdicionarAtualizar } from '../../Interface/Contrato/contrato-adicionar-atualizar';
import { Retorno } from '../../Interface/retorno';



@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  private urlApi:string = environment.endpoint;

  constructor(private http:HttpClient) { }


  obterContratos(){
    return this.http.get<Contrato[]>(`${this.urlApi}Contratos/BuscarContratos`);
  }

  obterContratoPorId(idContrato: number){
    return this.http.get<Contrato>(`${this.urlApi}Contratos/BuscarContratosPorId/${idContrato}`);
  }
  
  cadastrarContrato(request: ContratoAdicionarAtualizar){
    return this.http.post<Retorno>(`${this.urlApi}Contratos/ContratoAdicionar`, request);
  }

  editarContrato(idContrato: number, request: ContratoAdicionarAtualizar){
    return this.http.put<Retorno>(`${this.urlApi}Contratos/ContratoAtualizar/${idContrato}`, request)
  }

  deletarContrato(idContrato: number){
    return this.http.delete<Retorno>(`${this.urlApi}Contratos/ContratoEliminar/${idContrato}`)
  }

}
