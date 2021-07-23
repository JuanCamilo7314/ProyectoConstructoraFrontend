import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProyectoModel } from 'src/app/modelos/proyecto.model';
import { ImagenService } from 'src/app/services/imagen.service';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  listaRegistros: ProyectoModel[] = [];
  pagina: number = 1;

  constructor(private service: ProyectoService,
    private serviceImangen: ImagenService) { }

  ngOnInit(): void {
    this.service.ListarProyectos().subscribe(
      (datos) => {
        this.listaRegistros = datos;
      },
      (error) => {
        alert("Error listando los registros Ciudad")
      });
  }
}
