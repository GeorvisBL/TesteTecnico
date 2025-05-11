import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

import { FaturaStatus } from '../../Interface/FaturaStatus/fatura-status';


@Injectable({
  providedIn: 'root'
})
export class FaturaStatusService {

  private urlApi:string = environment.endpoint;

  constructor(private http:HttpClient) { }


  obterFaturas(){
    return this.http.get<FaturaStatus[]>(`${this.urlApi}FaturaStatus/BuscarFaturaStatus`);
  }

}
