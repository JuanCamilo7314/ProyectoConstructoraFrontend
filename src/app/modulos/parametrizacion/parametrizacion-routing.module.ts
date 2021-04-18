import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearCiudadComponent } from './ciudad/crear-ciudad/crear-ciudad.component';
import { CrearPaisComponent } from './pais/crear-pais/crear-pais.component';

const routes: Routes = [
  {
    path: 'pais/crear-pais',
    component: CrearPaisComponent
  },
  {
    path: 'ciudad/crear-ciudad',
    component: CrearCiudadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { }
