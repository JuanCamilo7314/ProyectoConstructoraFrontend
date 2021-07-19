import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-editar-inmueble',
  templateUrl: './editar-inmueble.component.html',
  styleUrls: ['./editar-inmueble.component.css']
})
export class EditarInmuebleComponent implements OnInit {
  
  paisListado: PaisModel[] = [];
  ciudadListado: CiudadModel[] = [];
  proyectoListado: ProyectoModel[] = [];
  bloqueListado: BloqueModel[] = [];
  fgValidacion: FormGroup = this.fb.group({});
  id: number = 0;

  constructor(private fb: FormBuilder,
    private service: InmuebleService,
    private router: Router,
    private servicePais: PaisService,
    private serviceCiudad: CiudadService,
    private serviceProyecto: ProyectoService,
    private serviceBloque: BloqueService,
    private route: ActivatedRoute) { }

  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      id: ['', Validators.required],
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
    this.BuscarRegistro();
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

  BuscarRegistro() {
    this.id = this.route.snapshot.params["id"];
    this.service.BuscarInmueble(this.id).subscribe(
      (datos) => {
        console.log(datos);
        this.obtenerFGV.id.setValue(datos.CodigoIn);
        this.obtenerFGV.Identificador.setValue(datos.Identificador);
        this.obtenerFGV.NombreIn.setValue(datos.NombreIn);
        this.obtenerFGV.ValorIn.setValue(datos.ValorIn);
        this.obtenerFGV.bloqueId.setValue(datos.bloqueId);
        
        if (datos.bloqueId) {
          this.serviceBloque.BuscarBloque(datos.bloqueId).subscribe(
            (datos2) => {
              this.obtenerFGV.proyectoId.setValue(datos2.proyectoId)
              if (this.obtenerFGV.proyectoId.value) {
                this.serviceProyecto.BuscarProyecto(parseInt(this.obtenerFGV.proyectoId.value)).subscribe(
                  (datos2) => {
                    this.obtenerFGV.ciudadId.setValue(datos2.ciudadId)
                    if (this.obtenerFGV.ciudadId.value) {
                      this.serviceCiudad.BuscarCiudad(parseInt(this.obtenerFGV.ciudadId.value)).subscribe(
                        (datos2) => {
                          this.obtenerFGV.paisId.setValue(datos2.paisId)
                          this.CargarPaises();
                          this.CargarCiudades();
                          this.CargarProyectos();
                          this.CargarBloques();
                        }, (error) => {
            
                        }
                      )
                    }
                  }, (error) => {
      
                  }
                )
              }
            }, (error) => {

            }
          )
        }
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
