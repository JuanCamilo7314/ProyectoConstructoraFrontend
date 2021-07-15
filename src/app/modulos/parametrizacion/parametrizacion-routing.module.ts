import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearCiudadComponent } from './ciudad/crear-ciudad/crear-ciudad.component';
import { ListarCiudadComponent } from './ciudad/listar-ciudad/listar-ciudad.component';
import { CrearPaisComponent } from './pais/crear-pais/crear-pais.component';

const routes: Routes = [
  {
    path: 'pais/crear-pais',
    component: CrearPaisComponent
  },
  
  {
    path: 'pais/listar-pais',
    component: ListarCiudadComponent
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
