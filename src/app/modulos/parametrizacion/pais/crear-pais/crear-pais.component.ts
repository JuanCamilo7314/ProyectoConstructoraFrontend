import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-pais',
  templateUrl: './crear-pais.component.html',
  styleUrls: ['./crear-pais.component.css']
})
export class CrearPaisComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});
  constructor(private fb: FormBuilder) { }

  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      pais: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  get obtenerFGV(){
    return this.fgValidacion.controls;
  }
}
