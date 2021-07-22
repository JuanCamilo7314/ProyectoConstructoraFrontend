import { Component, OnInit } from '@angular/core';
import { SolicitudModel } from 'src/app/modelos/solicitud.model';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Chart, registerables } from '../../../../../node_modules/chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-informe-ventas',
  templateUrl: './informe-ventas.component.html',
  styleUrls: ['./informe-ventas.component.css']
})
export class InformeVentasComponent implements OnInit {

  listaRegistros: SolicitudModel[] = [];
  pagina: number = 1;
  espera: number = 0;
  cancelada: number = 0;
  aceptada: number = 0;

  constructor(private service: SolicitudService) { }

  ngOnInit(): void {
    this.service.Listarsolicitud().subscribe(
      (datos) => {
        this.listaRegistros = datos;
        this.Contador();
      },
      (error) => {
        alert("Error listando los registros Ciudad")
      }
    );
  }

  Contador(){
    for (let index = 0; index < this.listaRegistros.length; index++) {
      if(this.listaRegistros[index].EstadoSolicitud=="espera"){
        this.espera++;
      }
      if(this.listaRegistros[index].EstadoSolicitud=="Aceptada"){
        this.aceptada++;
      }
      if(this.listaRegistros[index].EstadoSolicitud=="Cancelada"){
        this.cancelada++;
      }
    }
    this.CargarGrafica();
  }

  CargarGrafica() {
    var myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Espera', 'Aceptado', 'Cancelado'],
        datasets: [{
          label: 'Cantidad De Solicitudes Por Estado',
          data: [this.espera, this.aceptada, this.cancelada],
          backgroundColor: [
            'rgba(255, 255, 0, 0.6)',
            'rgba(57, 255, 20, 0.6)',
            'rgba(255,0,0, 0.7)'
          ],
          borderColor: [
            'rgba(66,64,64, 1)',
            'rgba(66,64,64, 1)',
            'rgba(66,64,64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }

}


