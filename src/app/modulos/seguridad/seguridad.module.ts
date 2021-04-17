import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { CambiarClaveComponent } from './cambiar-clave/cambiar-clave.component';


@NgModule({
  declarations: [
    IniciarSesionComponent,
    CerrarSesionComponent,
    RecuperarClaveComponent,
    CambiarClaveComponent
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule
  ]
})
export class SeguridadModule { }
