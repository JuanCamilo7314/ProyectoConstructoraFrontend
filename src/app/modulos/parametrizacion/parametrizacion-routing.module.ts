import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificadorSesionGuard } from 'src/app/guardianes/verificador-sesion.guard';
import { CrearCiudadComponent } from './ciudad/crear-ciudad/crear-ciudad.component';
import { EditarCiudadComponent } from './ciudad/editar-ciudad/editar-ciudad.component';
import { ListarCiudadComponent } from './ciudad/listar-ciudad/listar-ciudad.component';
import { CrearPaisComponent } from './pais/crear-pais/crear-pais.component';
import { EditarPaisComponent } from './pais/editar-pais/editar-pais.component';
import { EliminarPaisComponent } from './pais/eliminar-pais/eliminar-pais.component';
import { ListarPaisComponent } from './pais/listar-pais/listar-pais.component';
import { CrearProyectoComponent } from './proyecto/crear-proyecto/crear-proyecto.component';
import { EditarProyectoComponent } from './proyecto/editar-proyecto/editar-proyecto.component';
import { ListarProyectoComponent } from './proyecto/listar-proyecto/listar-proyecto.component';

const routes: Routes = [
  {
    path: 'pais/crear-pais',
    component: CrearPaisComponent,
    canActivate:[VerificadorSesionGuard]
  },
  
  {
    path: 'pais/listar-pais',
    component: ListarPaisComponent,
    canActivate:[VerificadorSesionGuard]
  },

  {
    path: 'pais/editar-pais/:id',
    component: EditarPaisComponent,
    canActivate:[VerificadorSesionGuard]
  },

  {
    path: 'pais/eliminar-pais/:id',
    component: EliminarPaisComponent,
    canActivate:[VerificadorSesionGuard]
  },

  {
    path: 'ciudad/crear-ciudad',
    component: CrearCiudadComponent,
    canActivate:[VerificadorSesionGuard]
  },

  {
    path: 'ciudad/listar-ciudad',
    component: ListarCiudadComponent
    ,
    canActivate:[VerificadorSesionGuard]
  },

  {
    path: 'ciudad/editar-ciudad/:id',
    component: EditarCiudadComponent,
    canActivate:[VerificadorSesionGuard]
  },
  {
    path: 'proyecto/crear-proyecto',
    component: CrearProyectoComponent,
    canActivate:[VerificadorSesionGuard]
  },

  {
    path: 'proyecto/listar-proyecto',
    component: ListarProyectoComponent,
    canActivate:[VerificadorSesionGuard]
  },

  {
    path: 'proyecto/editar-proyecto/:id',
    component: EditarProyectoComponent,
    canActivate:[VerificadorSesionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { }
