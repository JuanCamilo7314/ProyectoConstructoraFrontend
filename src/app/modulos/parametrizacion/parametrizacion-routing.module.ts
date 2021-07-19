import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificadorSesionGuard } from 'src/app/guardianes/verificador-sesion.guard';
import { CrearBloqueComponent } from './bloque/crear-bloque/crear-bloque.component';
import { EditarBloqueComponent } from './bloque/editar-bloque/editar-bloque.component';
import { ListarBloqueComponent } from './bloque/listar-bloque/listar-bloque.component';
import { CrearCiudadComponent } from './ciudad/crear-ciudad/crear-ciudad.component';
import { EditarCiudadComponent } from './ciudad/editar-ciudad/editar-ciudad.component';
import { ListarCiudadComponent } from './ciudad/listar-ciudad/listar-ciudad.component';
import { CrearInmuebleComponent } from './inmueble/crear-inmueble/crear-inmueble.component';
import { EditarInmuebleComponent } from './inmueble/editar-inmueble/editar-inmueble.component';
import { ListarInmuebleComponent } from './inmueble/listar-inmueble/listar-inmueble.component';
import { CrearPaisComponent } from './pais/crear-pais/crear-pais.component';
import { EditarPaisComponent } from './pais/editar-pais/editar-pais.component';
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
  },

  {
    path: 'bloque/crear-bloque',
    component: CrearBloqueComponent,
    canActivate:[VerificadorSesionGuard]
  },

  {
    path: 'bloque/listar-bloque',
    component: ListarBloqueComponent,
    canActivate:[VerificadorSesionGuard]
  },

  {
    path: 'bloque/editar-bloque/:id',
    component: EditarBloqueComponent,
    canActivate:[VerificadorSesionGuard]
  },

  {
    path: 'inmueble/crear-inmueble',
    component: CrearInmuebleComponent,
    canActivate:[VerificadorSesionGuard]
  },

  {
    path: 'inmueble/listar-inmueble',
    component: ListarInmuebleComponent,
    canActivate:[VerificadorSesionGuard]
  },

  {
    path: 'inmueble/editar-inmueble/:id',
    component: EditarInmuebleComponent,
    canActivate:[VerificadorSesionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { }
