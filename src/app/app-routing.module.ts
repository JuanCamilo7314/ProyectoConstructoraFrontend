import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './publico/errores/error404/error404.component';
import { InicioProyectoComponent } from './publico/inicio-proyecto/inicio-proyecto.component';
import { InicioComponent } from './publico/inicio/inicio.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: '',
    component: InicioComponent
  },
  {
    path: 'inicio-proyecto/:id',
    component: InicioProyectoComponent
  },
  {
    path: 'seguridad',
    loadChildren: () => import('./modulos/seguridad/seguridad.module').then(m => m.SeguridadModule)
  },
  {
    path: 'parametrizacion',
    loadChildren: () => import('./modulos/parametrizacion/parametrizacion.module').then(m => m.ParametrizacionModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./modulos/usuario/usuario.module').then(m => m.UsuarioModule)
  },
  {
    path: 'venta',
    loadChildren: () => import('./modulos/venta/venta.module').then(m => m.VentaModule)
  },
  {
    path: 'informe',
    loadChildren: () => import('./modulos/informe/informe.module').then(m => m.InformeModule)
  },
  {
    path: 'error404',
    component: Error404Component
  },
  {
    path: '**',
    redirectTo: 'error404'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
