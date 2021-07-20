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

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent implements OnInit {

  clienteListado: ClienteModel[] = [];
  inmuebleListado: InmuebleModel[] = [];
  solicitudesListado: SolicitudModel[] = [];
  fgValidacion: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder,
    private serviceCliente: ClienteService,
    private router: Router,
    private serviceInmueble: InmuebleService,
    private serviceUsuario: UsuarioService,
    private serviceSecurity: SecurityService,
    private service: SolicitudService,
    private serviceSolicitud: SolicitudService) { }

  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      clienteId: ['', Validators.required],
      inmuebleId: ['', Validators.required],
      FechaSolicitud: ['', Validators.required],
      OfertaEconomica: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.CargarClientes();
    this.CargarImuebles();
    this.CargarSolicitudes();
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

  CargarImuebles() {
    this.serviceInmueble.ListarInmuebles().subscribe(
      (datos) => {
        this.inmuebleListado = datos;
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
      
    }
  }
}
