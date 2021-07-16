import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaisModel } from 'src/app/modelos/pais.model';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-editar-pais',
  templateUrl: './editar-pais.component.html',
  styleUrls: ['./editar-pais.component.css']
})
export class EditarPaisComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});
  id: number = 0;

  constructor(private fb: FormBuilder,
    private service: PaisService,
    private router: Router, 
    private route: ActivatedRoute) { }

  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.id = this.route.snapshot.params["id"];
    this.service.BuscarPais(this.id).subscribe(
      (datos) => {
        this.obtenerFGV.id.setValue(datos.CodigoP);
        this.obtenerFGV.nombre.setValue(datos.NombreP)
      },
      (error) => {
        alert("No se encuentra el registro");
      }
    );
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
  }

  ActualizarRegistro() {
    if (this.fgValidacion.invalid) {
      alert("informacion invalida")
    } else {
      let nom = this.obtenerFGV.nombre.value;
      let id = this.obtenerFGV.id.value;
      let obj = new PaisModel();
      obj.NombreP = nom;
      obj.CodigoP = id;
      this.service.ActualizarPais(obj).subscribe(
        (datos) => {
          alert("Registro Actualizado");
          this.router.navigate(["/parametrizacion/pais/listar-pais"]);
        },
        (error) => {
          alert("Error al guardar un registro");
        });
    }

  }
}
