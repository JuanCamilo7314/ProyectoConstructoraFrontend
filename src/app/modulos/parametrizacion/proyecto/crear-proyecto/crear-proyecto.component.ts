import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { CiudadModel } from 'src/app/modelos/ciudad.model';
import { ProyectoModel } from 'src/app/modelos/proyecto.model';
import { CiudadService } from 'src/app/services/ciudad.service';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit {

  ciudadListado: CiudadModel[] = [];
  fgValidacion: FormGroup = this.fb.group({});
  uploadForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder,
    private service: ProyectoService,
    private router: Router,
    private serviceCiudad: CiudadService) { }

  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      NombreProy: ['', Validators.required],
      DescripcionProy: ['', Validators.required],
      DImagen: ['', Validators.required],
      ciudadId: ['', Validators.required]
    });
  }

  FormUploadBuilding(){
    this.uploadForm = this.fb.group({
      File:['',[Validators.required]]
    });
  }

  get fgUpload(){
    return this.uploadForm.controls;
  }

  OnFileSelect(event:any){
    if(event.target.files.length>0){
      const f = event.target.files[0];
      this.fgUpload.File.setValue(f);
    }
  }
  UploadImage(){
    const formData = new FormData();
    formData.append('file', this.fgUpload.File.value);
    this.service.uploadImage(formData).subscribe(
      (datos)=>{
        this.obtenerFGV.DImagen.setValue(datos.filename);
        alert("Cargada Correctamente");
      },
      (error)=>{
        alert("Error al Cargar Imagen");
      }
    );
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.FormUploadBuilding()
    this.CargarCiudades();
  }

  get obtenerFGV(){
    return this.fgValidacion.controls;
  }

CargarCiudades(){
  this.serviceCiudad.ListarCiudades().subscribe(
    (datos)=>{
      this.ciudadListado = datos;
    },
    (error)=>{
      alert("Error Listando los Registros de Ciudad")
    }
  );
}

  GuardarRegistro() {
    if (this.fgValidacion.invalid) {
      alert("informacion invalida")
    } else {
      let NombreProy = this.obtenerFGV.NombreProy.value;
      let DescripcionProy =this.obtenerFGV.DescripcionProy.value;
      let DImagen = this.obtenerFGV.DImagen.value;
      let ciudadId = this.obtenerFGV.ciudadId.value;
      let obj = new ProyectoModel();
      obj.NombreProy = NombreProy;
      obj.DescripcionProy = DescripcionProy;
      obj.DImagen = DImagen;
      obj.ciudadId = ciudadId;
      console.log(obj);
      this.service.CrearProyecto(obj).subscribe(
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
