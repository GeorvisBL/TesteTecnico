import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

import { TipoServico } from '../../Interface/TipoServico/tipo-servico';

@Injectable({
  providedIn: 'root'
})
export class TipoServicoService {

  private urlApi:string = environment.endpoint;

  constructor(private http:HttpClient) { }


  obterTipoServicos(){
    return this.http.get<TipoServico[]>(`${this.urlApi}TipoServicos/BuscarTipoServicos`);
  }

}
