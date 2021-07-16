import { Component, ModuleWithComponentFactories, OnInit } from '@angular/core';
import { PaisModel } from 'src/app/modelos/pais.model';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-listar-pais',
  templateUrl: './listar-pais.component.html',
  styleUrls: ['./listar-pais.component.css']
})
export class ListarPaisComponent implements OnInit {

  listaRegistros: PaisModel[] = [];
  pagina: number = 1;
  
  constructor(private service: PaisService) { }

  ngOnInit(): void {
    this.service.ListarPaises().subscribe(
      (datos) => {
        this.listaRegistros = datos;
      },
      (error) => {
        alert("Error listando los registros Pais")
      });
  }

  VerificarEliminacion(id?:number, nombre?:string){
    if(window.confirm("Realmente desea eliminar el Registro: " +nombre)){
      let model = new PaisModel();
      model.CodigoP = id;
      model.NombreP = nombre;
      this.service.EliminarPais(model).subscribe(
        (datos)=>{
          alert("Registro" +nombre+ "Eliminado")
          this.listaRegistros = this.listaRegistros.filter(x =>x.CodigoP != id);
        },
        (error)=>{
          alert("Error al Eliminar el Registro")
        }
      );
    }
  }

}
