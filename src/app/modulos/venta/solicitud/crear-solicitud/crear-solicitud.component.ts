import { Component, OnInit } from '@angular/core';
import { ClienteModel } from 'src/app/modelos/cliente.model';
import { UserModel } from 'src/app/modelos/user.model';
import { SolicitudModel } from 'src/app/modelos/solicitud.model';
import { InmuebleModel } from 'src/app/modelos/inmueble.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Router } from '@angular/router';
import { PaisService } from 'src/app/services/pais.service';
import { CiudadService } from 'src/app/services/ciudad.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { BloqueService } from 'src/app/services/bloque.service';
import { BloqueModel } from 'src/app/modelos/bloque.model';
import { PaisModel } from 'src/app/modelos/pais.model';
import { CiudadModel } from 'src/app/modelos/ciudad.model';
import { ProyectoModel } from 'src/app/modelos/proyecto.model';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent implements OnInit {

  clienteListado: ClienteModel[] = [];
  inmuebleListado: InmuebleModel[] = [];
  solicitudesListado: SolicitudModel[] = [];
  bloqueListado: BloqueModel[] = [];
  paisListado: PaisModel[] = [];
  ciudadListado: CiudadModel[] = [];
  proyectoListado: ProyectoModel[] = [];
  fgValidacion: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder,
    private serviceCliente: ClienteService,
    private router: Router,
    private serviceInmueble: InmuebleService,
    private serviceUsuario: UsuarioService,
    private serviceSecurity: SecurityService,
    private service: SolicitudService,
    private serviceSolicitud: SolicitudService,
    private servicePais: PaisService,
    private serviceCiudad: CiudadService,
    private serviceProyecto: ProyectoService,
    private serviceBloque: BloqueService) { }

  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      clienteId: ['', Validators.required],
      paisId: ['', Validators.required],
      ciudadId: ['', Validators.required],
      proyectoId: ['', Validators.required],
      bloqueId: ['', Validators.required],
      inmuebleId: ['', Validators.required],
      FechaSolicitud: ['', Validators.required],
      OfertaEconomica: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.CargarPaises();
    this.CargarClientes();
    this.CargarSolicitudes();
  }

  CargarPaises() {
    this.servicePais.ListarPaises().subscribe(
      (datos) => {
        this.paisListado = datos;
      },
      (error) => {
        alert("Error Listando los Registros de Ciudad")
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
        this.proyectoListado = datos;
      },
      (error) => {
      }
    );
  }

  CargarBloques() {
    this.serviceProyecto.ListarBloquePorProyecto(this.obtenerFGV.proyectoId.value).subscribe(
      (datos) => {
        this.bloqueListado = datos;
      },
      (error) => {
      }
    );
  }

  CargarInmuebles() {
    this.serviceBloque.ListarInmueblePorBloque(this.obtenerFGV.bloqueId.value).subscribe(
      (datos) => {
        this.inmuebleListado = datos;
      },
      (error) => {
        alert("Error Listando los Registros de Ciudad")
      }
    );
  }

  CargarSolicitudes() {
    this.serviceSolicitud.Listarsolicitud().subscribe(
      (datos) => {
        this.solicitudesListado = datos;
      },
      (error) => {
        alert("Error al obtener listado de solicitudes")
      }
    );
  }

  CargarClientes() {
    this.serviceCliente.Listarclientes().subscribe(
      (datos) => {
        this.clienteListado = datos;
        console.log(this.solicitudesListado)
      },
      (error) => {
        alert("Error Listando los Registros de Ciudad")
      }
    );
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
  }

  GuardarRegistro() {
    if (this.fgValidacion.invalid) {
      alert("informacion invalida")
    } else {
      let cliente = parseInt(this.obtenerFGV.clienteId.value.toString());
      let inmueble = parseInt(this.obtenerFGV.inmuebleId.value.toString());
      let fecha = this.obtenerFGV.FechaSolicitud.value;
      let oferta = parseInt(this.obtenerFGV.OfertaEconomica.value.toString());
      let estado = "espera";
      let obj = new SolicitudModel();
      obj.clienteId = cliente;
      obj.inmuebleId = inmueble;
      obj.OfertaEconomica = oferta;
      obj.FechaSolicitud = fecha;
      obj.EstadoSolicitud = estado;
      let usuariostorage: any = (this.serviceSecurity.getUserInfo().value);
      console.log(usuariostorage);
      obj.usuarioId = usuariostorage.user.IdUsuario
      console.log(obj);
      let estadosEspera = 0;

      for (let index = 0; index < this.solicitudesListado.length; index++) {
        if (this.solicitudesListado[index].inmuebleId == obj.inmuebleId) {
          if (this.solicitudesListado[index].EstadoSolicitud == "espera") {
            estadosEspera++;
          }
        }
      }
      if(estadosEspera == 0){
        this.service.CrearSolicitud(obj).subscribe(
          (datos) => {
            alert("Registro guardado");
            this.router.navigate(["/venta/solicitud/listar-solicitud"]);
          },
          (error) => {
            alert("Error al guardar un registro");
          });
      }else{
        alert("Ese inmueble ya tiene una solicitud y se encuentra en estado de ESPERA")
              this.router.navigate(["/venta/solicitud/listar-solicitud"]);
      }
    }
  }
}