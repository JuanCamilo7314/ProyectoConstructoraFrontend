import { Component, OnInit } from '@angular/core';
import { BloqueModel } from 'src/app/modelos/bloque.model';
import { BloqueService } from 'src/app/services/bloque.service';

@Component({
  selector: 'app-listar-bloque',
  templateUrl: './listar-bloque.component.html',
  styleUrls: ['./listar-bloque.component.css']
})
export class ListarBloqueComponent implements OnInit {

  listaRegistros: BloqueModel[] = [];
  pagina: number = 1;

  constructor(private service: BloqueService) { }

  ngOnInit(): void {
    this.service.Listarbloques().subscribe(
      (datos) => {
        this.listaRegistros = datos;
      },
      (error) => {
        alert("Error listando los registros Ciudad")
      });
  }

  VerificarEliminacion(id?:number, nombre?:string){
    if(window.confirm("Realmente desea eliminar el Registro: " +nombre)){
      let model = new BloqueModel();
      model.CodigoB = id;
      model.NombreB = nombre;
      this.service.EliminarBloque(model).subscribe(
        (datos)=>{
          alert("Registro " +nombre+ " Eliminado")
          this.listaRegistros = this.listaRegistros.filter(x =>x.CodigoB != id);
        },
        (error)=>{
          alert("Error al Eliminar el Registro")
        }
      );
    }
  }

}
