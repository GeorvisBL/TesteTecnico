import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

import { Plano } from '../../Interface/Plano/plano';

@Injectable({
  providedIn: 'root'
})
export class PlanoService {

  private urlApi:string = environment.endpoint;

  constructor(private http:HttpClient) { }


  obterPlanos(){
    return this.http.get<Plano[]>(`${this.urlApi}Planos/BuscarPlanos`);
  }

}
