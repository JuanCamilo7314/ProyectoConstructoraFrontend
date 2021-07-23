import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformeRoutingModule } from './informe-routing.module';
import { InformeVentasComponent } from './informe-ventas/informe-ventas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { InformeProyectosComponent } from './informe-proyectos/informe-proyectos.component';


@NgModule({
  declarations: [
    InformeVentasComponent,
    InformeProyectosComponent
  ],
  imports: [
    CommonModule,
    InformeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class InformeModule { }
