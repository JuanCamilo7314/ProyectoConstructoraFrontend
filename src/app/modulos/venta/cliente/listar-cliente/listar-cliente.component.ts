import { Component, OnInit } from '@angular/core';
import { ClienteModel } from 'src/app/modelos/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {

  listaRegistros: ClienteModel[] = [];
  pagina: number = 1;

  constructor(private service: ClienteService) { }

  ngOnInit(): void {
    this.service.Listarclientes().subscribe(
      (datos) => {
        this.listaRegistros = datos;
      },
      (error) => {
        alert("Error listando los registros Ciudad")
      });
  }

  VerificarEliminacion(id?:number, nombre?:string){
    if(window.confirm("Realmente desea eliminar el Registro: " +nombre)){
      let model = new ClienteModel();
      model.IdCliente = id;
      model.NombreCli = nombre;
      this.service.EliminarCliente(model).subscribe(
        (datos)=>{
          alert("Registro " +nombre+ " Eliminado")
          this.listaRegistros = this.listaRegistros.filter(x =>x.IdCliente != id);
        },
        (error)=>{
          alert("Error al Eliminar el Registro")
        }
      );
    }
  }

}
