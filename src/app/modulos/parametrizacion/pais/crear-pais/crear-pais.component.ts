import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaisModel } from 'src/app/modelos/pais.model';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-crear-pais',
  templateUrl: './crear-pais.component.html',
  styleUrls: ['./crear-pais.component.css']
})
export class CrearPaisComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});
  constructor(private fb: FormBuilder,
    private service: PaisService,
    private router: Router) { }

  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
  }

  GuardarRegistro() {
    if (this.fgValidacion.invalid) {
      alert("informacion invalida")
    } else {
      let nom = this.obtenerFGV.nombre.value;
      let obj = new PaisModel();
      obj.NombreP = nom;
      this.service.CrearPais(obj).subscribe(
        (datos) => {
          alert("Registro guardado");
          this.router.navigate(["/parametrizacion/pais/listar-pais"]);
      },
        (error) => {
          alert("Error al guardar un registro");
        });
    }
  }
}
