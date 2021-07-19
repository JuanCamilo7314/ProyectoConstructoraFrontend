import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BloqueModel } from 'src/app/modelos/bloque.model';
import { CiudadModel } from 'src/app/modelos/ciudad.model';
import { PaisModel } from 'src/app/modelos/pais.model';
import { ProyectoModel } from 'src/app/modelos/proyecto.model';
import { BloqueService } from 'src/app/services/bloque.service';
import { CiudadService } from 'src/app/services/ciudad.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-crear-bloque',
  templateUrl: './crear-bloque.component.html',
  styleUrls: ['./crear-bloque.component.css']
})
export class CrearBloqueComponent implements OnInit {

  paisListado: PaisModel[] = [];
  ciudadListado: CiudadModel[] = [];
  proyectoListado: ProyectoModel[] = [];
  fgValidacion: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder,
    private service: BloqueService,
    private router: Router,
    private servicePais: PaisService,
    private serviceCiudad: CiudadService,
    private serviceProyecto: ProyectoService) { }

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

  handlePaisChange(pais: any) {
    console.log(pais.target.data);
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
    this.serviceProyecto.ListarProyectos().subscribe(
      (datos) => {
        this.proyectoListado = datos;
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
      let nom = this.obtenerFGV.NombreB.value;
      let proyectoId = this.obtenerFGV.proyectoId.value;
      let obj = new BloqueModel();
      obj.NombreB = nom;
      obj.proyectoId = proyectoId;
      console.log(obj);
      this.service.CrearBloque(obj).subscribe(
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
