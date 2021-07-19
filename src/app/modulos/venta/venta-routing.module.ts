import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component';
import { VerificadorSesionGuard } from 'src/app/guardianes/verificador-sesion.guard';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentaRoutingModule { }
