import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SolicitudModel } from 'src/app/modelos/solicitud.model';
import { SecurityService } from 'src/app/services/security.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-editar-solicitud',
  templateUrl: './editar-solicitud.component.html',
  styleUrls: ['./editar-solicitud.component.css']
})
export class EditarSolicitudComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});
  id: number =0;

  constructor(private fb: FormBuilder,
    private router: Router,
    private serviceSecurity: SecurityService,
    private service: SolicitudService,
    private route: ActivatedRoute) { }

    ConstruirFormulario() {
      this.fgValidacion = this.fb.group({
        id: ['', Validators.required],
        clienteId: ['', Validators.required],
        inmuebleId: ['', Validators.required],
        FechaSolicitud: ['', Validators.required],
        OfertaEconomica: ['', Validators.required],
        EstadoSolicitud: ['', Validators.required],
        usuarioId: ['', Validators.required]
      });
    }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.BuscarRegistro();
  }

  BuscarRegistro(){
    this.id = this.route.snapshot.params["id"];
    this.service.BuscarSolicitud(this.id).subscribe(
      (datos) => {
        this.obtenerFGV.id.setValue(datos.IdSolicitud);
        this.obtenerFGV.clienteId.setValue(datos.clienteId);
        this.obtenerFGV.inmuebleId.setValue(datos.inmuebleId);
        this.obtenerFGV.usuarioId.setValue(datos.usuarioId);
        this.obtenerFGV.FechaSolicitud.setValue(datos.FechaSolicitud);
        this.obtenerFGV.OfertaEconomica.setValue(datos.OfertaEconomica);
        this.obtenerFGV.EstadoSolicitud.setValue(datos.EstadoSolicitud);
      },
      (error) => {
        alert("No se encuentra el registro");
      }
    );
  }

  get obtenerFGV(){
    return this.fgValidacion.controls;
  }

  ActualizarRegistro() {
    if (this.fgValidacion.invalid) {
      alert("informacion invalida")
    } else {
      let cliente = parseInt(this.obtenerFGV.clienteId.value.toString());
      let inmueble = parseInt(this.obtenerFGV.inmuebleId.value.toString());
      let usuario = this.obtenerFGV.usuarioId.value;
      let fecha = this.obtenerFGV.FechaSolicitud.value;
      let oferta = parseInt(this.obtenerFGV.OfertaEconomica.value.toString());
      let estado = this.obtenerFGV.EstadoSolicitud.value;
      let id = this.obtenerFGV.id.value;
      let obj = new SolicitudModel();
      obj.IdSolicitud = id;
      obj.clienteId = cliente;
      obj.inmuebleId = inmueble;
      obj.OfertaEconomica = oferta;
      obj.FechaSolicitud = fecha;
      obj.EstadoSolicitud = estado;
      obj.usuarioId=usuario;
      console.log(obj)
      this.service.ActualizarSolicitud(obj).subscribe(
        (datos) => {
          alert("Registro guardado");
          this.router.navigate(["/venta/solicitud/listar-solicitud"]);
      },
        (error) => {
          alert("Error al guardar un registro");
        });
    }
  }

}
