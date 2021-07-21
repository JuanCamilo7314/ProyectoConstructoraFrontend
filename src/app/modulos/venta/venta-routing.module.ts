import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component';
import { ListarSolicitudComponent } from './solicitud/listar-solicitud/listar-solicitud.component';
import { CrearSolicitudComponent } from './solicitud/crear-solicitud/crear-solicitud.component';
import { EditarSolicitudComponent } from './solicitud/editar-solicitud/editar-solicitud.component';
import { VerificadorSesionGuard } from 'src/app/guardianes/verificador-sesion.guard';
import { CrearPagoComponent } from './pago/crear-pago/crear-pago.component';
import { ListarPagoComponent } from './pago/listar-pago/listar-pago.component';

const routes: Routes = [
  {
    path: 'cliente/crear-cliente',
    component: CrearClienteComponent,
    canActivate:[VerificadorSesionGuard]
  },
  
  {
    path: 'cliente/listar-cliente',
    component: ListarClienteComponent,
    canActivate:[VerificadorSesionGuard]
  },

  {
    path: 'cliente/editar-cliente/:id',
    component: EditarClienteComponent,
    canActivate:[VerificadorSesionGuard]
  },
  
  {
    path: 'solicitud/listar-solicitud',
    component: ListarSolicitudComponent,
    canActivate:[VerificadorSesionGuard]
  },
  
  {
    path: 'solicitud/crear-solicitud',
    component: CrearSolicitudComponent,
    canActivate:[VerificadorSesionGuard]
  },

  {
    path: 'solicitud/editar-solicitud/:id',
    component: EditarSolicitudComponent,
    canActivate:[VerificadorSesionGuard]
  },

  {
    path: 'pago/listar-pago',
    component: ListarPagoComponent,
    canActivate:[VerificadorSesionGuard]
  },
  
  {
    path: 'pago/crear-pago',
    component: CrearPagoComponent,
    canActivate:[VerificadorSesionGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentaRoutingModule { }
