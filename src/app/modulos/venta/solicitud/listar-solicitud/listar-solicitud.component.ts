import { Component, OnInit } from '@angular/core';
import { SolicitudModel } from 'src/app/modelos/solicitud.model';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-listar-solicitud',
  templateUrl: './listar-solicitud.component.html',
  styleUrls: ['./listar-solicitud.component.css']
})
export class ListarSolicitudComponent implements OnInit {

  listaRegistros: SolicitudModel[] = [];
  pagina: number = 1;

  constructor(private service: SolicitudService) { }

  ngOnInit(): void {
    this.service.Listarsolicitud().subscribe(
      (datos) => {
        this.listaRegistros = datos;
      },
      (error) => {
        alert("Error listando los registros Ciudad")
      });
  }

  VerificarEliminacion(id?:number){
    if(window.confirm("Realmente desea eliminar el Registro: " +id)){
      let model = new SolicitudModel();
      model.IdSolicitud = id;
      this.service.EliminarSolicitud(model).subscribe(
        (datos)=>{
          alert("Registro " +id+ " Eliminado")
          this.listaRegistros = this.listaRegistros.filter(x =>x.IdSolicitud != id);
        },
        (error)=>{
          alert("Error al Eliminar el Registro")
        }
      );
    }
  }

}
