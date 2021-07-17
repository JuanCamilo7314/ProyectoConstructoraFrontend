import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CiudadModel } from 'src/app/modelos/ciudad.model';
import { ProyectoModel } from 'src/app/modelos/proyecto.model';
import { CiudadService } from 'src/app/services/ciudad.service';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css']
})
export class EditarProyectoComponent implements OnInit {

  ciudadListado: CiudadModel[] = [];
  fgValidacion: FormGroup = this.fb.group({});
  uploadForm: FormGroup = this.fb.group({});
  id: number =0;

  constructor(private fb: FormBuilder,
    private service: ProyectoService,
    private router: Router,
    private serviceCiudad: CiudadService,
    private route: ActivatedRoute) { }

    ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      id: ['',Validators.required],
      NombreProy: ['', Validators.required],
      DescripcionProy: ['', Validators.required],
      DImagen: ['', Validators.required],
      ciudadId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.FormUploadBuilding()
    this.CargarCiudades();
  }

  FormUploadBuilding(){
    this.uploadForm = this.fb.group({
      File:['',[Validators.required]]
    });
  }

  get obtenerFGV(){
    return this.fgValidacion.controls;
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

  CargarCiudades(){
    this.serviceCiudad.ListarCiudades().subscribe(
      (datos)=>{
        this.ciudadListado = datos;
        this.BuscarRegistro();
      },
      (error)=>{
        alert("Error Listando los Registros de Ciudad")
      }
    );
  }

  BuscarRegistro(){
    this.id = this.route.snapshot.params["id"];
    this.service.BuscarProyecto(this.id).subscribe(
      (datos) => {
        this.obtenerFGV.id.setValue(datos.CodigoProy);
        this.obtenerFGV.NombreProy.setValue(datos.NombreProy);
        this.obtenerFGV.DescripcionProy.setValue(datos.DescripcionProy);
        this.obtenerFGV.DImagen.setValue(datos.DImagen);
        this.obtenerFGV.ciudadId.setValue(datos.ciudadId);
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
      let id = this.obtenerFGV.id.value;
      let NombreProy = this.obtenerFGV.NombreProy.value;
      let DescripcionProy =this.obtenerFGV.DescripcionProy.value;
      let DImagen = this.obtenerFGV.DImagen.value;
      let ciudadId = this.obtenerFGV.ciudadId.value;
      let obj = new ProyectoModel();
      obj.CodigoProy = id;
      obj.NombreProy = NombreProy;
      obj.DescripcionProy = DescripcionProy;
      obj.DImagen = DImagen;
      obj.ciudadId = ciudadId;
      console.log(obj);
      this.service.ActualizarProyecto(obj).subscribe(
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
