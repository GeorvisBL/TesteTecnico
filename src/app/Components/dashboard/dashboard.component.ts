import { Component } from '@angular/core';

import { IndicadoresNumericosCardsComponent } from '../indicadores-numericos-cards/indicadores-numericos-cards.component';

import { GraficoPizzaComponent } from "../grafico-pizza/grafico-pizza.component";
import { GraficoBarraComponent } from "../grafico-barra/grafico-barra.component";

@Component({
  selector: 'app-dashboard',
  imports: [IndicadoresNumericosCardsComponent, GraficoPizzaComponent, GraficoBarraComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {


}
