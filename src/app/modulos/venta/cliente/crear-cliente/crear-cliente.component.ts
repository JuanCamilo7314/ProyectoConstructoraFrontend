import { Component, OnInit } from '@angular/core';
import { CiudadModel } from 'src/app/modelos/ciudad.model';
import { PaisModel } from 'src/app/modelos/pais.model';
import { ClienteModel } from 'src/app/modelos/cliente.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';
import { CiudadService } from 'src/app/services/ciudad.service';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  paisListado: PaisModel[] = [];
  ciudadListado: CiudadModel[] = [];
  fgValidacion: FormGroup = this.fb.group({});
  uploadForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder,
    private service: ClienteService,
    private router: Router,
    private serviceCiudad: CiudadService,
    private servicePais: PaisService) { }

  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      DocumentoCli: ['', Validators.required],
      NombreCli: ['', Validators.required],
      ApellidoCli: ['', Validators.required],
      FechaNaciCli: ['', Validators.required],
      DImagen: ['', Validators.required],
      TelefonoCli: ['', Validators.required],
      EmailCli: ['', Validators.required],
      DireccionCLi: ['', Validators.required],
      ciudadId: ['', Validators.required],
      paisId: ['', Validators.required]
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
    this.CargarPaises();
    this.CargarCiudades();
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

  GuardarRegistro() {
    if (this.fgValidacion.invalid) {
      alert("informacion invalida")
    } else {
      let doc = this.obtenerFGV.DocumentoCli.value;
      let nom = this.obtenerFGV.NombreCli.value;
      let ape = this.obtenerFGV.ApellidoCli.value;
      let fecha = this.obtenerFGV.FechaNaciCli.value;
      let DImagen = this.obtenerFGV.DImagen.value;
      let phone = this.obtenerFGV.TelefonoCli.value;
      let email = this.obtenerFGV.EmailCli.value;
      let direc = this.obtenerFGV.DireccionCli.value;
      console.log("hola")
      console.log(this.obtenerFGV.DireccionCli.value);
      console.log("end")
      let ciudadId = parseInt(this.obtenerFGV.ciudadId.value.toString());
      let obj = new ClienteModel();
      obj.DocumentoCli = doc;
      obj.NombreCli = nom;
      obj.ApellidoCli = ape;
      obj.FechaNaciCli = fecha;
      obj.DImagenCli = DImagen;
      obj.TelefonoCli = phone;
      obj.EmailCli = email;
      obj.DireccionCli = direc;
      obj.ciudadId = ciudadId;
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
