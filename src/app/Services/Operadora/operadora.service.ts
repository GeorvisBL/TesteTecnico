import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

import { Operadora } from '../../Interface/Operadora/operadora';
import { OperadoraAdicionarAtualizar } from '../../Interface/Operadora/operadora-adicionar-atualizar';
import { Retorno } from '../../Interface/retorno';


@Injectable({
  providedIn: 'root'
})
export class OperadoraService {

  private urlApi:string = environment.endpoint;

  constructor(private http:HttpClient) { }


  obterOperadoras(){
    return this.http.get<Operadora[]>(`${this.urlApi}Operadoras/BuscarOperadoras`);
  }

  obterOperadoraPorId(idOperadora: number){
    return this.http.get<Operadora>(`${this.urlApi}Operadoras/BuscarOperadoraPorId/${idOperadora}`);
  }
  
  cadastrarOperadora(request: OperadoraAdicionarAtualizar){
    return this.http.post<Retorno>(`${this.urlApi}Operadoras/OperadoraAdicionar`, request);
  }

  editarOperadora(idOperadora: number, request: OperadoraAdicionarAtualizar){
    return this.http.put<Retorno>(`${this.urlApi}Operadoras/OperadoraAtualizar/${idOperadora}`, request)
  }

  deletarOperadora(idOperadora: number){
    return this.http.delete<Retorno>(`${this.urlApi}Operadoras/OperadoraEliminar/${idOperadora}`)
  }

}
