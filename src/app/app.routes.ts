import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ListarOperadoraComponent } from './Components/Operadora/listar-operadora/listar-operadora.component';
import { OperadoraComponent } from './Components/Operadora/operadora/operadora.component';
import { ContratoComponent } from './Components/Contrato/contrato/contrato.component';
import { AddContratoComponent } from './Components/Contrato/add-contrato/add-contrato.component';
import { AddFaturaComponent } from './Components/add-fatura/add-faturas.component';

export const routes: Routes = [
    {path:'', component:DashboardComponent, pathMatch:"full"},
    {path:'home', component:DashboardComponent, pathMatch:"full"},
    {path:'listar-operadora', component:ListarOperadoraComponent, pathMatch:"full"},
    {path:'operadora/:cod', component:OperadoraComponent, pathMatch:"full"},
    {path:'contrato', component:ContratoComponent, pathMatch:"full"},
    {path:'add-contrato', component:AddContratoComponent, pathMatch:"full"},
    {path:'add-fatura/:cod1/:cod2', component:AddFaturaComponent, pathMatch:"full"},
];

export const appRouter = provideRouter(routes);