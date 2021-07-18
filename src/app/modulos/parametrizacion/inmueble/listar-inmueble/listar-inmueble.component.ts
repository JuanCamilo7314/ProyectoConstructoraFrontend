import { Component, OnInit } from '@angular/core';
import { BloqueModel } from 'src/app/modelos/bloque.model';
import { InmuebleModel } from 'src/app/modelos/inmueble.model';
import { InmuebleService } from 'src/app/services/inmueble.service';

@Component({
  selector: 'app-listar-inmueble',
  templateUrl: './listar-inmueble.component.html',
  styleUrls: ['./listar-inmueble.component.css']
})
export class ListarInmuebleComponent implements OnInit {

  listaRegistros: InmuebleModel[] = [];
  pagina: number = 1;

  constructor(private service: InmuebleService) { }

  ngOnInit(): void {
    this.CargarInmuebles();
  }

  CargarInmuebles(){
    this.service.ListarInmuebles().subscribe(
      (datos) => {
        this.listaRegistros = datos;
      },
      (error) => {
        alert("Error listando los registros Inmueble")
      });
  }

  VerificarEliminacion(id?:number, nombre?:string){
    if(window.confirm("Realmente desea eliminar el Registro: " +nombre)){
      let model = new InmuebleModel();
      model.CodigoIn = id;
      model.NombreIn = nombre;
      this.service.EliminarInmueble(model).subscribe(
        (datos)=>{
          alert("Registro " +nombre+ " Eliminado")
          this.listaRegistros = this.listaRegistros.filter(x =>x.CodigoIn != id);
        },
        (error)=>{
          alert("Error al Eliminar el Registro")
        }
      );
    }
  }


}
