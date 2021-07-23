import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoModel } from 'src/app/modelos/proyecto.model';
import { PaisModel } from 'src/app/modelos/pais.model';
import { BloqueModel } from 'src/app/modelos/bloque.model';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { CiudadService } from 'src/app/services/ciudad.service';
import { BloqueService } from 'src/app/services/bloque.service';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { InmuebleModel } from 'src/app/modelos/inmueble.model';

@Component({
  selector: 'app-inicio-proyecto',
  templateUrl: './inicio-proyecto.component.html',
  styleUrls: ['./inicio-proyecto.component.css']
})
export class InicioProyectoComponent implements OnInit {

  proyecto: ProyectoModel = new ProyectoModel();
  pais: PaisModel = new PaisModel();
  BloqueListado: BloqueModel[] = [];
  inmuebleListado: InmuebleModel[] = [];
  inmueblesProyecto: InmuebleModel[] = [];
  id: number = 0;
  CodigoProy: number = 0;
  NombreProy:string = "";
  DImagen: string = "";
  DescripcionProy: string = "";
  CodigoC: number = 0;
  NombreC: string = "";
  NombreP: string = "";
  NombreB: string = "";
  pagina: number = 1;

  constructor(
    private service: ProyectoService,
    private serviceCiudad: CiudadService,
    private serviceBloque: BloqueService,
    private serviceInmueble: InmuebleService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.BuscarRegistro();
  }

  BuscarRegistro(){
    this.id = this.route.snapshot.params["id"];
    this.service.BuscarProyecto(this.id).subscribe(
      (datos) => {
        this.proyecto = datos;
        this.LlenarVariablesProyecto();
        this.BuscarPaisdeCiudad();
      },
      (error) => {
        alert("No se encuentra el registro");
      }
    );
  }

  LlenarVariablesProyecto(){
    console.log(this.proyecto)
    let x:any = "";
    x=this.proyecto;
    this.NombreProy=x.NombreProy;
    this.DImagen=x.DImagen;
    this.DescripcionProy=x.DescripcionProy;
    this.CodigoC=x.ciudad.CodigoC;
    this.NombreC=x.ciudad.NombreC;
  }

  BuscarPaisdeCiudad(){
    this.serviceCiudad.ListarPaisDeUnaCiudad(this.CodigoC).subscribe(
      (datos) => {
        this.pais = datos;
        this.LlenarVariablePais();
        this.BuscarBloques();
      },
      (error) => {
        alert("No se encuentra el registro");
      }
    );
  }

  LlenarVariablePais(){
    let y:any = "";
    y=this.pais;
    this.NombreP=y.NombreP
  }

  BuscarBloques(){
    this.serviceBloque.Listarbloques().subscribe(
      (datos) => {
        this.BloqueListado = datos;
        this.BuscarInmueble();
      },
      (error) => {
      }
    );
  }

  BuscarInmueble(){
    this.serviceInmueble.ListarInmuebles().subscribe(
      (datos) => {
        this.inmuebleListado = datos;
        this.LlenarVariablesInmueble();
      },
      (error) => {
      }
    );
  }

  LlenarVariablesInmueble(){
    for (let index = 0; index < this.BloqueListado.length; index++) {
      if(this.BloqueListado[index].proyectoId == this.proyecto.CodigoProy){
        for (let x = 0; x < this.inmuebleListado.length; x++) {
          if(this.BloqueListado[index].CodigoB == this.inmuebleListado[x].bloqueId){
            this.inmueblesProyecto.push(this.inmuebleListado[x]);
          }
        }
      }
    }
  }



}
