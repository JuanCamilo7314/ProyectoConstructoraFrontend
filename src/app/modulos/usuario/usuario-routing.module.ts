import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificadorSesionGuard } from 'src/app/guardianes/verificador-sesion.guard';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';

const routes: Routes = [

  {
    path: 'crear-usuario',
    component: CrearUsuarioComponent,
    canActivate:[VerificadorSesionGuard]
  },
  
  {
    path: 'listar-usuario',
    component: ListarUsuarioComponent,
    canActivate:[VerificadorSesionGuard]
  },

  {
    path: 'editar-usuario/:id',
    component: EditarUsuarioComponent,
    canActivate:[VerificadorSesionGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
