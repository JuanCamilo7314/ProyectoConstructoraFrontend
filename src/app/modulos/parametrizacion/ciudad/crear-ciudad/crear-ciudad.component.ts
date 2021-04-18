import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-ciudad',
  templateUrl: './crear-ciudad.component.html',
  styleUrls: ['./crear-ciudad.component.css']
})
export class CrearCiudadComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});
  constructor(private fb: FormBuilder) { }

  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      ciudad: ['', Validators.required],
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
