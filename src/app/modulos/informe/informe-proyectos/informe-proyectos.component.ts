import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadModel } from 'src/app/modelos/ciudad.model';
import { PagoModel } from 'src/app/modelos/pago.model';
import { BloqueModel } from 'src/app/modelos/bloque.model';
import { SolicitudModel } from 'src/app/modelos/solicitud.model';
import { PaisModel } from 'src/app/modelos/pais.model';
import { ProyectoModel } from 'src/app/modelos/proyecto.model';
import { CiudadService } from 'src/app/services/ciudad.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { BloqueService } from 'src/app/services/bloque.service';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { InmuebleModel } from 'src/app/modelos/inmueble.model';
import { PagoService } from 'src/app/services/pago.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-informe-proyectos',
  templateUrl: './informe-proyectos.component.html',
  styleUrls: ['./informe-proyectos.component.css']
})
export class InformeProyectosComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});
  listaRegistros: ProyectoModel[] = [];
  ciudadListado: CiudadModel[] = [];
  paisListado: PaisModel[] = [];
  bloqueListado: BloqueModel[] = [];
  solicitudListado: SolicitudModel[] = [];
  inmuebleListado: InmuebleModel[] = [];
  inmueblesProyecto: InmuebleModel[] = [];
  inmueblesPagados: InmuebleModel[] = [];
  pagosListado: PagoModel[] = [];
  pagina: number = 1;
  barChart: Chart = new Chart("myChart", {
    type: 'bar',
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: []
        }]
    }
  });

  constructor(private servicePais: PaisService,
    private serviceCiudad: CiudadService,
    private fb: FormBuilder,
    private service: ProyectoService,
    private serviceBloque: BloqueService,
    private serviceInmueble: InmuebleService,
    private servicePago: PagoService,
    private serviceSolicitud: SolicitudService) { }

  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      paisId: ['', Validators.required],
      ciudadId: ['', Validators.required]

    });
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.CargarPaises();
    this.CargarPagos();
    this.CargarSolicitudes();
  }

  CargarPaises() {
    this.servicePais.ListarPaises().subscribe(
      (datos) => {
        this.paisListado = datos;
      },
      (error) => {
      }
    );
  }

  CargarCiudades() {
    this.servicePais.ListarCiudadesPorPais(this.obtenerFGV.paisId.value).subscribe(
      (datos) => {
        this.ciudadListado = datos;
      },
      (error) => {
      }
    );
  }

  CargarProyectos() {
    this.serviceCiudad.ListarProyectosPorCiudad(this.obtenerFGV.ciudadId.value).subscribe(
      (datos) => {
        this.listaRegistros = datos;
        this.CargarBloques();
      },
      (error) => {
        alert("Error listando los registros Proyecto")
      });
  }

  CargarBloques() {
    this.serviceBloque.Listarbloques().subscribe(
      (datos) => {
        this.bloqueListado = datos;
        this.CargarInmuebles();
      },
      (error) => {
        alert("Error listando los registros Bloque")
      });
  }

  CargarInmuebles() {
    this.serviceInmueble.ListarInmuebles().subscribe(
      (datos) => {
        this.inmuebleListado = datos;
        this.inmueblesPagados=[];
        this.inmueblesProyecto=[];
        this.CargarInmueblesProyecto();
      },
      (error) => {
      });
  }

  CargarSolicitudes() {
    this.serviceSolicitud.Listarsolicitud().subscribe(
      (datos) => {
        this.solicitudListado = datos;
      },
      (error) => {
      });
  }

  CargarPagos() {
    this.servicePago.ListarPagos().subscribe(
      (datos) => {
        this.pagosListado = datos;
      },
      (error) => {
      });
  }

  CargarInmueblesProyecto() {
    for (let index = 0; index < this.listaRegistros.length; index++) {
      for (let x = 0; x < this.bloqueListado.length; x++) {
        if (this.listaRegistros[index].CodigoProy == this.bloqueListado[x].proyectoId) {
          for (let p = 0; p < this.inmuebleListado.length; p++) {
            if (this.bloqueListado[x].CodigoB == this.inmuebleListado[p].bloqueId) {
              this.inmueblesProyecto.push(this.inmuebleListado[p]);
            }
          }
        }
      }
    }
    this.CargarInmueblesPagados();
  }

  CargarInmueblesPagados() {
    this.solicitudListado = this.solicitudListado.filter(x => x.EstadoSolicitud == "Aceptada");
    for (let index = 0; index < this.solicitudListado.length; index++) {
      for (let x = 0; x < this.inmueblesProyecto.length; x++) {
        if (this.solicitudListado[index].inmuebleId == this.inmueblesProyecto[x].CodigoIn) {
          for (let p = 0; p < this.pagosListado.length; p++) {
            if (this.solicitudListado[index].IdSolicitud == this.pagosListado[p].solicitudCliId) {
              this.inmueblesPagados.push(this.inmueblesProyecto[x])
            }
          }
        }
      }
    }
    this.CargarBarras();
  }

  CargarBarras() {
    let cantidad:number []=[];
    cantidad.push(this.inmueblesPagados.length);
    cantidad.push(this.inmueblesProyecto.length-this.inmueblesPagados.length);
    if (this.barChart) {
      this.barChart.destroy();
    }
    this.barChart = new Chart("myChart", {
      type: 'pie',
      data: {
        labels: ["Vendidos", "No Vendidos"],
        datasets: [{
          label: 'Inmuebles Vendidos y No Vendidos Por Ciudad',
          data: cantidad,
          backgroundColor: [
            'rgba(57, 255, 20, 0.6)',
            'rgba(255, 0, 0, 0.6)'
          ],
          borderColor: [
            'rgba(66,64,64, 1)',
            'rgba(66,64,64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });

  }

}
