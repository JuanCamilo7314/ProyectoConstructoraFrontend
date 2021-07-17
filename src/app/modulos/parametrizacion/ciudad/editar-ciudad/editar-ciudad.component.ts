import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CiudadModel } from 'src/app/modelos/ciudad.model';
import { PaisModel } from 'src/app/modelos/pais.model';
import { CiudadService } from 'src/app/services/ciudad.service';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-editar-ciudad',
  templateUrl: './editar-ciudad.component.html',
  styleUrls: ['./editar-ciudad.component.css']
})
export class EditarCiudadComponent implements OnInit {

  paisListado: PaisModel[] = [];
  fgValidacion: FormGroup = this.fb.group({});
  id: number =0;

  constructor(private fb: FormBuilder,
    private service: CiudadService,
    private router: Router,
    private servicePais: PaisService,
    private route: ActivatedRoute) { }

  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      id: ['',Validators.required],
      nombre: ['', Validators.required],
      paisId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.CargarPaises();
  }

  CargarPaises(){
    this.servicePais.ListarPaises().subscribe(
      (datos)=>{
        this.paisListado = datos;
        this.BuscarRegistro();
      },
      (error)=>{
        alert("Error Listando los Registros de Ciudad")
      }
    );
  }

  BuscarRegistro(){
    this.id = this.route.snapshot.params["id"];
    this.service.BuscarCiudad(this.id).subscribe(
      (datos) => {
        this.obtenerFGV.id.setValue(datos.CodigoC);
        this.obtenerFGV.nombre.setValue(datos.NombreC);
        this.obtenerFGV.paisId.setValue(datos.paisId);
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
      let nom = this.obtenerFGV.nombre.value;
      let paisId = this.obtenerFGV.paisId.value;
      let id = this.obtenerFGV.id.value;
      let obj = new CiudadModel();
      obj.CodigoC = id;
      obj.NombreC = nom;
      obj.paisId = paisId;
      console.log(obj);
      this.service.ActualizarCiudad(obj).subscribe(
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