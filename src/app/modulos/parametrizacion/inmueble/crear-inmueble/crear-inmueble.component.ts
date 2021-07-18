import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BloqueModel } from 'src/app/modelos/bloque.model';
import { InmuebleModel } from 'src/app/modelos/inmueble.model';
import { BloqueService } from 'src/app/services/bloque.service';
import { InmuebleService } from 'src/app/services/inmueble.service';

@Component({
  selector: 'app-crear-inmueble',
  templateUrl: './crear-inmueble.component.html',
  styleUrls: ['./crear-inmueble.component.css']
})
export class CrearInmuebleComponent implements OnInit {

  bloqueListado: BloqueModel[] = [];
  fgValidacion: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder,
    private service: InmuebleService,
    private router: Router,
    private serviceBloque: BloqueService) { }

  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      Identificador: ['', Validators.required],
      NombreIn: ['', Validators.required],
      ValorIn: ['', Validators.required],
      bloqueId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.CargarBloques();
  }

  CargarBloques() {
    this.serviceBloque.Listarbloques().subscribe(
      (datos) => {
        this.bloqueListado = datos;
      },
      (error) => {
        alert("Error Listando los Registros de Bloque")
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
