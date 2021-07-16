import { Component, OnInit } from '@angular/core';
import { ProyectoModel } from 'src/app/modelos/proyecto.model';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-listar-proyecto',
  templateUrl: './listar-proyecto.component.html',
  styleUrls: ['./listar-proyecto.component.css']
})
export class ListarProyectoComponent implements OnInit {

  listaRegistros: ProyectoModel[] = [];
  pagina: number = 1;

  constructor(private service: ProyectoService) { }

  ngOnInit(): void {
    this.service.ListarProyectos().subscribe(
      (datos) => {
        this.listaRegistros = datos;
      },
      (error) => {
        alert("Error listando los registros Ciudad")
      });
  }

  VerificarEliminacion(id?: number, nombre?: string) {
    if (window.confirm("Realmente desea eliminar el Registro: " + nombre)) {
      let model = new ProyectoModel();
      model.CodigoProy = id;
      model.NombreProy = nombre;
      this.service.EliminarProyecto(model).subscribe(
        (datos) => {
          alert("Registro " + nombre + " Eliminado")
          this.listaRegistros = this.listaRegistros.filter(x => x.CodigoProy != id);
        },
        (error) => {
          alert("Error al Eliminar el Registro")
        }
      );
    }
  }

}
