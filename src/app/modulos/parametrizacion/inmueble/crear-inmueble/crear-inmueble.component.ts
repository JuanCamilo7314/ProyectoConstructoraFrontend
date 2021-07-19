import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BloqueModel } from 'src/app/modelos/bloque.model';
import { CiudadModel } from 'src/app/modelos/ciudad.model';
import { InmuebleModel } from 'src/app/modelos/inmueble.model';
import { PaisModel } from 'src/app/modelos/pais.model';
import { ProyectoModel } from 'src/app/modelos/proyecto.model';
import { BloqueService } from 'src/app/services/bloque.service';
import { CiudadService } from 'src/app/services/ciudad.service';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-crear-inmueble',
  templateUrl: './crear-inmueble.component.html',
  styleUrls: ['./crear-inmueble.component.css']
})
export class CrearInmuebleComponent implements OnInit {

  bloqueListado: BloqueModel[] = [];
  paisListado: PaisModel[] = [];
  ciudadListado: CiudadModel[] = [];
  proyectoListado: ProyectoModel[] = [];
  fgValidacion: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder,
    private service: InmuebleService,
    private router: Router,
    private servicePais: PaisService,
    private serviceCiudad: CiudadService,
    private serviceProyecto: ProyectoService,
    private serviceBloque: BloqueService) { }

  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      Identificador: ['', Validators.required],
      NombreIn: ['', Validators.required],
      ValorIn: ['', Validators.required],
      paisId: ['', Validators.required],
      ciudadId: ['', Validators.required],
      proyectoId: ['', Validators.required],
      bloqueId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.CargarPaises();
    this.CargarCiudades();
    this.CargarProyectos();
    this.CargarBloques();
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

get obtenerFGV(){
  return this.fgValidacion.controls;
}

GuardarRegistro() {
  if (this.fgValidacion.invalid) {
    alert("informacion invalida")
  } else {
    let nom = this.obtenerFGV.NombreIn.value;
    let identificador = this.obtenerFGV.Identificador.value;
    let valor = this.obtenerFGV.ValorIn.value;
    let bloqueId = this.obtenerFGV.bloqueId.value;
    let obj = new InmuebleModel();
    obj.NombreIn = nom;
    obj.Identificador = identificador;
    obj.ValorIn = valor;
    obj.bloqueId = bloqueId;
    console.log(obj);
    this.service.CrearInmueble(obj).subscribe(
      (datos) => {
        alert("Registro guardado");
        this.router.navigate(["/parametrizacion/inmueble/listar-inmueble"]);
      },
      (error) => {
        alert("Error al guardar un registro");
      });
  }
}
}
