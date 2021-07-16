import { Component, OnInit } from '@angular/core';
import { CiudadModel } from 'src/app/modelos/ciudad.model';
import { CiudadService } from 'src/app/services/ciudad.service';

@Component({
  selector: 'app-listar-ciudad',
  templateUrl: './listar-ciudad.component.html',
  styleUrls: ['./listar-ciudad.component.css']
})
export class ListarCiudadComponent implements OnInit {

  listaRegistros: CiudadModel[] = [];
  pagina: number = 1;

  constructor(private service: CiudadService) { }

  ngOnInit(): void {
    this.service.ListarCiudades().subscribe(
      (datos) => {
        this.listaRegistros = datos;
      },
      (error) => {
        alert("Error listando los registros Ciudad")
      });
  }

  VerificarEliminacion(id?:number, nombre?:string){
    if(window.confirm("Realmente desea eliminar el Registro: " +nombre)){
      let model = new CiudadModel();
      model.CodigoC = id;
      model.NombreC = nombre;
      this.service.EliminarCiudad(model).subscribe(
        (datos)=>{
          alert("Registro " +nombre+ " Eliminado")
          this.listaRegistros = this.listaRegistros.filter(x =>x.CodigoC != id);
        },
        (error)=>{
          alert("Error al Eliminar el Registro")
        }
      );
    }
  }

}
