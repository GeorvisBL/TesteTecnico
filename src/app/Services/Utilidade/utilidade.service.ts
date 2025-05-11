import { Injectable } from '@angular/core';
import{ MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilidadeService {

  constructor(private _snackBar:MatSnackBar) { }

  mostrarAlerta(mensagem: string, tipo: string){
    this._snackBar.open(mensagem, tipo,{
      horizontalPosition:"end",
      verticalPosition:"bottom",
      duration: 3000
    })
  }
}
