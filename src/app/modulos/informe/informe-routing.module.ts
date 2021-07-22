import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificadorSesionGuard } from 'src/app/guardianes/verificador-sesion.guard';
import { InformeVentasComponent } from './informe-ventas/informe-ventas.component';

const routes: Routes = [
  {
    path: 'informe-ventas',
    component: InformeVentasComponent,
    canActivate:[VerificadorSesionGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformeRoutingModule { }
