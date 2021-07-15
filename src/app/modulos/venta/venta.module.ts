import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentaRoutingModule } from './venta-routing.module';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { ListarClienteComponent } from './listar-cliente/listar-cliente.component';
import { EliminarClienteComponent } from './eliminar-cliente/eliminar-cliente.component';
import { SolicitudEstudioComponent } from './solicitud-estudio/solicitud-estudio.component';
import { RespuestaSolicitudComponent } from './respuesta-solicitud/respuesta-solicitud.component';
import { RegistroPagosComponent } from './registro-pagos/registro-pagos.component';


@NgModule({
  declarations: [
    CrearClienteComponent,
    EditarClienteComponent,
    ListarClienteComponent,
    EliminarClienteComponent,
    SolicitudEstudioComponent,
    RespuestaSolicitudComponent,
    RegistroPagosComponent
  ],
  imports: [
    CommonModule,
    VentaRoutingModule
  ]
})
export class VentaModule { }
