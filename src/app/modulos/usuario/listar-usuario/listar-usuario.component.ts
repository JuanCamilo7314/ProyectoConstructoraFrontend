import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../modelos/user.model';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {

  listaRegistros: UserModel[] = [];
  pagina: number = 1;

  constructor(private service: UsuarioService) { }

  ngOnInit(): void {
    this.service.ListarUsuarios().subscribe(
      (datos) => {
        this.listaRegistros = datos;
      },
      (error) => {
        alert("Error listando los registros Usuario")
      });
  }

  VerificarEliminacion(id?:string, nombre?:string){
    if(window.confirm("Realmente desea eliminar el Registro: " +nombre)){
      let model = new UserModel();
      model.IdUsuario = id;
      model.NombreU = nombre;
      this.service.EliminarUsuario(model).subscribe(
        (datos)=>{
          alert("Registro " +nombre+ " Eliminado")
          this.listaRegistros = this.listaRegistros.filter(x =>x.IdUsuario != id);
        },
        (error)=>{
          alert("Error al Eliminar el Registro")
        }
      );
    }
  }


}
