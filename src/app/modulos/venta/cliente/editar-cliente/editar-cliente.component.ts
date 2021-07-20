import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CiudadModel } from 'src/app/modelos/ciudad.model';
import { ClienteModel } from 'src/app/modelos/cliente.model';
import { PaisModel } from 'src/app/modelos/pais.model';
import { CiudadService } from 'src/app/services/ciudad.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  paisListado: PaisModel[] = [];
  ciudadListado: CiudadModel[] = [];
  fgValidacion: FormGroup = this.fb.group({});
  uploadForm: FormGroup = this.fb.group({});
  id: number = 0;

  constructor(private fb: FormBuilder,
    private service: ClienteService,
    private router: Router,
    private serviceCiudad: CiudadService,
    private servicePais: PaisService,
    private route: ActivatedRoute) { }

  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      id: ['', Validators.required],
      DocumentoCli: ['', Validators.required],
      NombreCli: ['', Validators.required],
      ApellidoCli: ['', Validators.required],
      FechaNaciCli: ['', Validators.required],
      DImagen: ['', Validators.required],
      TelefonoCli: ['', Validators.required],
      EmailCli: ['', Validators.required],
      DireccionCLi: ['', Validators.required],
      paisId: ['', Validators.required],
      ciudadId: ['', Validators.required],
      TotIngresosCli: ['', Validators.required],
      DatosTrabajo: ['', Validators.required],
      TiemTrabajoAcCli: ['', Validators.required],
      NombreRefFamCli: ['', Validators.required],
      ApellidoRefFamCli: ['', Validators.required],
      TelefonoRefFamCli: ['', Validators.required],
      NombreRefPerCli: ['', Validators.required],
      ApellidoRefPerCli: ['', Validators.required],
      TelefonoRefPerCli: ['', Validators.required]
    });
  }

  FormUploadBuilding() {
    this.uploadForm = this.fb.group({
      File: ['', Validators.required]
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
        console.log(datos);
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
    this.BuscarRegistro();
    this.FormUploadBuilding();
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
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
        console.log(this.ciudadListado);
      },
      (error) => {
      }
    );
  }

  BuscarRegistro() {
    this.id = this.route.snapshot.params["id"];
    this.service.BuscarCLiente(this.id).subscribe(
      (datos) => {
        this.obtenerFGV.id.setValue(datos.IdCliente);
        this.obtenerFGV.DocumentoCli.setValue(datos.DocumentoCli);
        this.obtenerFGV.NombreCli.setValue(datos.NombreCli)
        this.obtenerFGV.ApellidoCli.setValue(datos.ApellidoCli);
        this.obtenerFGV.FechaNaciCli.setValue(datos.FechaNaciCli);
        this.obtenerFGV.DImagen.setValue(datos.DImagenCli);
        this.obtenerFGV.TelefonoCli.setValue(datos.TelefonoCli);
        this.obtenerFGV.EmailCli.setValue(datos.EmailCli);
        this.obtenerFGV.DireccionCLi.setValue(datos.DImagenCli);
        this.obtenerFGV.ciudadId.setValue(datos.ciudadId);
        
        if (this.obtenerFGV.ciudadId.value) {
          this.serviceCiudad.BuscarCiudad(this.obtenerFGV.ciudadId.value).subscribe(
            (datos2) => {
              
              this.obtenerFGV.paisId.setValue(datos2.paisId)
              this.CargarPaises();
              this.CargarCiudades();
            }, (error) => {

            }
          )
        }
        this.obtenerFGV.TotIngresosCli.setValue(datos.TotIngresosCli);
        this.obtenerFGV.DatosTrabajo.setValue(datos.DatosTrabajo);
        this.obtenerFGV.TiemTrabajoAcCli.setValue(datos.TiemTrabajoAcCli);
        this.obtenerFGV.NombreRefFamCli.setValue(datos.NombreRefFamCli);
        this.obtenerFGV.ApellidoRefFamCli.setValue(datos.ApellidoRefFamCli);
        this.obtenerFGV.TelefonoRefFamCli.setValue(datos.TelefonoRefFamCli);
        this.obtenerFGV.NombreRefPerCli.setValue(datos.NombreRefPerCli);
        this.obtenerFGV.ApellidoRefPerCli.setValue(datos.ApellidoRefPerCli);
        this.obtenerFGV.TelefonoRefPerCli.setValue(datos.TelefonoRefPerCli);
        
      },
      (error) => {
        alert("No se encuentra el registro");
      }
    );

  }

  ActualizarRegistro() {
    if (this.fgValidacion.invalid) {
      alert("informacion invalida")
    } else {
      
      let doc = parseInt(this.obtenerFGV.DocumentoCli.value.toString());
      let nom = this.obtenerFGV.NombreCli.value;
      let ape = this.obtenerFGV.ApellidoCli.value;
      let fecha = this.obtenerFGV.FechaNaciCli.value;
      let DImagen = this.obtenerFGV.DImagen.value;
      let phone = this.obtenerFGV.TelefonoCli.value;
      let email = this.obtenerFGV.EmailCli.value;
      let direc = this.obtenerFGV.DireccionCLi.value;
      let ciudadId = parseInt(this.obtenerFGV.ciudadId.value.toString());
      let totingresos = parseInt(this.obtenerFGV.TotIngresosCli.value.toString());
      let datosT =  this.obtenerFGV.DatosTrabajo.value;
      let tiempoT = this.obtenerFGV.TiemTrabajoAcCli.value;
      let nomRefF = this.obtenerFGV.NombreRefFamCli.value;
      let apeRefF = this.obtenerFGV.ApellidoRefFamCli.value;
      let telRefF = this.obtenerFGV.TelefonoRefFamCli.value;
      let nomRefP = this.obtenerFGV.NombreRefPerCli.value;
      let apeRefP = this.obtenerFGV.ApellidoRefPerCli.value;
      let telRefP = this.obtenerFGV.TelefonoRefPerCli.value;
      
      let obj = new ClienteModel();
      obj.DocumentoCli = doc;
      obj.NombreCli = nom;
      obj.ApellidoCli = ape;
      obj.FechaNaciCli = fecha;
      obj.DImagenCli = DImagen;
      obj.TelefonoCli = phone;
      obj.EmailCli = email;
      obj.DireccionCLi = direc;
      obj.ciudadId = ciudadId;
      obj.TotIngresosCli = totingresos;
      obj.DatosTrabajo = datosT;
      obj.TiemTrabajoAcCli = tiempoT;
      obj.NombreRefFamCli = nomRefF;
      obj.ApellidoRefFamCli = apeRefF;
      obj.TelefonoRefFamCli = telRefF;
      obj.NombreRefPerCli = nomRefP;
      obj.ApellidoRefPerCli = apeRefP;
      obj.TelefonoRefPerCli = telRefP;
      console.log(obj);
      this.service.CrearCliente(obj).subscribe(
        (datos) => {
          alert("Registro guardado");
          this.router.navigate(["/venta/cliente/listar-cliente"]);
        },
        (error) => {
          alert("Error al guardar un registro");
        });
    }
  }


}
