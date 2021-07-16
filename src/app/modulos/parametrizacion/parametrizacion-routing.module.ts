import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearCiudadComponent } from './ciudad/crear-ciudad/crear-ciudad.component';
import { ListarCiudadComponent } from './ciudad/listar-ciudad/listar-ciudad.component';
import { CrearPaisComponent } from './pais/crear-pais/crear-pais.component';
import { EditarPaisComponent } from './pais/editar-pais/editar-pais.component';
import { EliminarPaisComponent } from './pais/eliminar-pais/eliminar-pais.component';
import { ListarPaisComponent } from './pais/listar-pais/listar-pais.component';

const routes: Routes = [
  {
    path: 'pais/crear-pais',
    component: CrearPaisComponent
  },
  
  {
    path: 'pais/listar-pais',
    component: ListarPaisComponent
  },

  {
    path: 'pais/editar-pais/:id',
    component: EditarPaisComponent
  },

  {
    path: 'pais/eliminar-pais/:id',
    component: EliminarPaisComponent
  },

  {
    path: 'ciudad/crear-ciudad',
    component: CrearCiudadComponent
  },

  {
    path: 'ciudad/listar-ciudad',
    component: ListarCiudadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { }
