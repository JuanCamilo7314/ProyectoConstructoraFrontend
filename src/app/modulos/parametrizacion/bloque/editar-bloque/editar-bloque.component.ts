import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BloqueModel } from 'src/app/modelos/bloque.model';
import { CiudadModel } from 'src/app/modelos/ciudad.model';
import { PaisModel } from 'src/app/modelos/pais.model';
import { ProyectoModel } from 'src/app/modelos/proyecto.model';
import { BloqueService } from 'src/app/services/bloque.service';
import { CiudadService } from 'src/app/services/ciudad.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-editar-bloque',
  templateUrl: './editar-bloque.component.html',
  styleUrls: ['./editar-bloque.component.css']
})
export class EditarBloqueComponent implements OnInit {

  paisListado: PaisModel[] = [];
  ciudadListado: CiudadModel[] = [];
  proyectoListado: ProyectoModel[] = [];
  fgValidacion: FormGroup = this.fb.group({});
  id: number =0;

  constructor(private fb: FormBuilder,
    private service: BloqueService,
    private router: Router,
    private servicePais: PaisService,
    private serviceCiudad: CiudadService,
    private serviceProyecto: ProyectoService,
    private route: ActivatedRoute) { }

  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      NombreB: ['', Validators.required],
      paisId: ['', Validators.required],
      ciudadId: ['', Validators.required],
      proyectoId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.CargarPaises();
    this.CargarCiudades();
    this.CargarProyectos();
  }

  CargarPaises(){
    this.servicePais.ListarPaises().subscribe(
      (datos)=>{
        this.paisListado = datos;
      },
      (error)=>{
        alert("Error Listando los Registros de Ciudad")
      }
    );
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

  CargarProyectos(){
    this.serviceProyecto.ListarProyectos().subscribe(
      (datos)=>{
        this.proyectoListado = datos;
      },
      (error)=>{
        alert("Error Listando los Registros de Ciudad")
      }
    );
  }

  BuscarRegistro(){
    this.id = this.route.snapshot.params["id"];
    this.service.BuscarBloque(this.id).subscribe(
      (datos) => {
        this.obtenerFGV.id.setValue(datos.CodigoB);
        this.obtenerFGV.nombre.setValue(datos.NombreB);
        this.obtenerFGV.paisId.setValue(datos.proyectoId);
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
      let nom = this.obtenerFGV.NombreB.value;
      let proyectoId = this.obtenerFGV.proyectoId.value;
      let id = this.obtenerFGV.id.value;
      let obj = new BloqueModel();
      obj.CodigoB = id;
      obj.NombreB = nom;
      obj.proyectoId = proyectoId;
      console.log(obj);
      this.service.ActualizarBloque(obj).subscribe(
        (datos) => {
          alert("Registro guardado");
          this.router.navigate(["/parametrizacion/bloque/listar-bloque"]);
      },
        (error) => {
          alert("Error al guardar un registro");
        });
    }
  }

}
