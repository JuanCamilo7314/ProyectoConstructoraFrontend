import { Component, OnInit } from '@angular/core';
import { PagoModel } from 'src/app/modelos/pago.model';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-listar-pago',
  templateUrl: './listar-pago.component.html',
  styleUrls: ['./listar-pago.component.css']
})
export class ListarPagoComponent implements OnInit {

  listaRegistros: PagoModel[] = [];
  pagina: number = 1;

  constructor(private service: PagoService) { }

  ngOnInit(): void {
    this.service.ListarPagos().subscribe(
      (datos) => {
        this.listaRegistros = datos;
      },
      (error) => {
        alert("Error listando los registros Pagos")
      });
  }

  VerificarEliminacion(id?:number){
    if(window.confirm("Realmente desea eliminar el Registro: " +id)){
      let model = new PagoModel();
      model.id = id;
      this.service.EliminarPago(model).subscribe(
        (datos)=>{
          alert("Registro " +id+ " Eliminado")
          this.listaRegistros = this.listaRegistros.filter(x =>x.id != id);
        },
        (error)=>{
          alert("Error al Eliminar el Registro")
        }
      );
    }
  }
}
  


