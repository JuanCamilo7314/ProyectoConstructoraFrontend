import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadModel } from 'src/app/modelos/ciudad.model';
import { PaisModel } from 'src/app/modelos/pais.model';
import { CiudadService } from 'src/app/services/ciudad.service';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-crear-ciudad',
  templateUrl: './crear-ciudad.component.html',
  styleUrls: ['./crear-ciudad.component.css']
})
export class CrearCiudadComponent implements OnInit {

  paisListado: PaisModel[] = [];
  fgValidacion: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder,
    private service: CiudadService,
    private router: Router,
    private servicePais: PaisService) { }

  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      nombre: ['', Validators.required],
      paisId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.servicePais.ListarPaises().subscribe(
      (datos)=>{
        this.paisListado = datos;
      },
      (error)=>{
        alert("Error Listando los Registros de Ciudad")
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
      let nom = this.obtenerFGV.nombre.value;
      let paisId = this.obtenerFGV.paisId.value;
      let obj = new CiudadModel();
      obj.NombreC = nom;
      obj.paisId = paisId;
      console.log(obj);
      this.service.CrearCiudad(obj).subscribe(
        (datos) => {
          alert("Registro guardado");
          this.router.navigate(["/parametrizacion/ciudad/listar-ciudad"]);
      },
        (error) => {
          alert("Error al guardar un registro");
        });
    }
  }

}
