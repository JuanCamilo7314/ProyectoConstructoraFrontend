import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PagoModel } from 'src/app/modelos/pago.model';
import { SolicitudModel } from 'src/app/modelos/solicitud.model';
import { PagoService } from 'src/app/services/pago.service';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-crear-pago',
  templateUrl: './crear-pago.component.html',
  styleUrls: ['./crear-pago.component.css']
})
export class CrearPagoComponent implements OnInit {

  solicitudListado: SolicitudModel[] = [];
  pagosListado: PagoModel[] = [];
  valor: any = 0;
  fgValidacion: FormGroup = this.fb.group({});
  uploadForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder,
    private service: PagoService,
    private router: Router,
    private serviceSolicitud: SolicitudService) { }

  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      DImagen: ['', Validators.required],
      solicitudId: ['', Validators.required],
      OfertaEconomica: ['', Validators.required]
    });
  }

  FormUploadBuilding() {
    this.uploadForm = this.fb.group({
      File: ['', [Validators.required]]
    });
  }

  get fgUpload() {
    return this.uploadForm.controls;
  }

  OnFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const f = event.target.files[0];
      this.fgUpload.File.setValue(f);
    }
  }
  UploadImage() {
    const formData = new FormData();
    formData.append('file', this.fgUpload.File.value);
    this.service.uploadImage(formData).subscribe(
      (datos) => {
        this.obtenerFGV.DImagen.setValue(datos.filename);
        alert("Cargada Correctamente");
      },
      (error) => {
        alert("Error al Cargar Imagen");
      }
    );
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.CargarPagos();
    this.CargarValor();
    this.FormUploadBuilding();
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
  }

  CargarPagos() {
    this.service.ListarPagos().subscribe(
      (datos) => {
        this.pagosListado = datos;
        this.CargarSolicitudes();
      },
      (error) => {
      }
    );
  }

  CargarSolicitudes() {
    this.serviceSolicitud.Listarsolicitud().subscribe(
      (datos) => {
        let xxxx: SolicitudModel[] = [];
        this.solicitudListado = datos.filter(x => x.EstadoSolicitud == "Aceptada");
        for (let index = 0; index < this.solicitudListado.length; index++) {
          for (let x = 0; x < this.pagosListado.length; x++) {
            if (this.solicitudListado[index].IdSolicitud == this.pagosListado[x].solicitudCliId) {
              alert("eliminada")
            }else{
              xxxx.push(this.solicitudListado[index]); 
            }
          }
        }
        console.log(xxxx)
        this.solicitudListado=xxxx;
      },
      (error) => {
        alert("Error al obtener listado de solicitudes")
      }
    );
  }

  CargarValor() {
    this.serviceSolicitud.BuscarSolicitud(this.obtenerFGV.solicitudId.value).subscribe(
      (datos) => {
        this.valor = datos.OfertaEconomica;
        this.obtenerFGV.OfertaEconomica.setValue(datos.OfertaEconomica);
      },
      (error) => {
      }
    );
  }

  GuardarRegistro() {
    if (this.fgValidacion.invalid) {
      alert("informacion invalida")
    } else {
      let DImagen = this.obtenerFGV.DImagen.value;
      let solicitudId = parseInt(this.obtenerFGV.solicitudId.value.toString());
      let obj = new PagoModel();
      obj.imagenRecibo = DImagen;
      obj.solicitudCliId = solicitudId;
      console.log(obj);
      this.service.CrearPago(obj).subscribe(
        (datos) => {
          alert("Registro guardado");
          this.router.navigate(["/parametrizacion/proyecto/listar-proyecto"]);
        },
        (error) => {
          alert("Error al guardar un registro");
        });
    }
  }

}
