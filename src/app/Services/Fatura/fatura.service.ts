
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment.development';

import { Fatura } from '../../Interface/Fatura/fatura';
import { FaturaAdicionarAtualizar } from '../../Interface/Fatura/fatura-adicionar-atualizar';
import { Indicadores } from '../../Interface/Indicadores/indicadores';
import { Retorno } from '../../Interface/retorno';
import { DistribuicaoFaturasPorStatus } from '../../Interface/Fatura/distribuicao-faturas-por-status';
import { EvolucaoMensal } from '../../Interface/Fatura/evolucao-mensal';


@Injectable({
  providedIn: 'root'
})
export class FaturaService {

  private urlApi:string = environment.endpoint;

  constructor(private http:HttpClient) { }



  obterFaturas(){
    return this.http.get<Fatura[]>(`${this.urlApi}Faturas/BuscarFaturas`);
  }

  obterFaturaPorId(idFatura: number){
    return this.http.get<Fatura>(`${this.urlApi}Faturas/BuscarFaturaPorId/${idFatura}`);
  }

  obterInidcadores_Faturas(){
    return this.http.get<Indicadores[]>(`${this.urlApi}Faturas/BuscarInidcadores`);
  }

  obterDistribuicoFaturasPorStatus(){
    return this.http.get<DistribuicaoFaturasPorStatus>(`${this.urlApi}Faturas/DistribuicoFaturasPorStatus`);
  }

  obterEvolucaoMensal(){
    return this.http.get<EvolucaoMensal>(`${this.urlApi}Faturas/ObterEvolucaoMensal`);
  }
  
    
  cadastrarFatura(request: FaturaAdicionarAtualizar){
    return this.http.post<Retorno>(`${this.urlApi}Faturas/FaturaAdicionar`, request);
  }
  
  editarEndereco(idFatura: number, request: FaturaAdicionarAtualizar){
    return this.http.put<Retorno>(`${this.urlApi}Faturas/FaturaAtualizar/${idFatura}`, request)
  }
  
  deletarEndereco(idFatura: number){
    return this.http.delete<Retorno>(`${this.urlApi}Faturas/FaturaEliminar/${idFatura}`)
  }

}
