import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BloqueModel } from 'src/app/modelos/bloque.model';
import { InmuebleModel } from 'src/app/modelos/inmueble.model';
import { BloqueService } from 'src/app/services/bloque.service';
import { InmuebleService } from 'src/app/services/inmueble.service';

@Component({
  selector: 'app-editar-inmueble',
  templateUrl: './editar-inmueble.component.html',
  styleUrls: ['./editar-inmueble.component.css']
})
export class EditarInmuebleComponent implements OnInit {

  bloqueListado: BloqueModel[] = [];
  fgValidacion: FormGroup = this.fb.group({});
  id: number = 0;

  constructor(private fb: FormBuilder,
    private service: InmuebleService,
    private router: Router,
    private serviceBloque: BloqueService,
    private route: ActivatedRoute) { }

  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      id: ['', Validators.required],
      Identificador: ['', Validators.required],
      NombreIn: ['', Validators.required],
      ValorIn: ['', Validators.required],
      bloqueId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.CargarBloques();
    this.BuscarRegistro();
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

  BuscarRegistro() {
    this.id = this.route.snapshot.params["id"];
    this.service.BuscarInmueble(this.id).subscribe(
      (datos) => {
        this.obtenerFGV.id.setValue(datos.CodigoIn);
        this.obtenerFGV.Identificador.setValue(datos.Identificador);
        this.obtenerFGV.NombreIn.setValue(datos.NombreIn);
        this.obtenerFGV.ValorIn.setValue(datos.ValorIn);
        this.obtenerFGV.bloqueId.setValue(datos.bloqueId);
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
      let id = this.obtenerFGV.id.value;
      let nom = this.obtenerFGV.NombreIn.value;
      let identificador = this.obtenerFGV.Identificador.value;
      let valor = this.obtenerFGV.ValorIn.value;
      let bloqueId = this.obtenerFGV.bloqueId.value;
      let obj = new InmuebleModel();
      obj.CodigoIn = id;
      obj.NombreIn = nom;
      obj.Identificador = identificador;
      obj.ValorIn = valor;
      obj.bloqueId = bloqueId;
      console.log(obj);
      this.service.ActualizarInmueble(obj).subscribe(
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
