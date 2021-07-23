import { Component, OnInit } from '@angular/core';
import { PagoModel } from 'src/app/modelos/pago.model';
import { PagoService } from 'src/app/services/pago.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { ClienteModel } from 'src/app/modelos/cliente.model';
import { InformePagoModel } from 'src/app/modelos/informepago.model';
import { SolicitudModel } from 'src/app/modelos/solicitud.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart, ChartData, ChartItem, registerables } from '../../../../../../node_modules/chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-listar-pago',
  templateUrl: './listar-pago.component.html',
  styleUrls: ['./listar-pago.component.css']
})
export class ListarPagoComponent implements OnInit {

  solicitudListado: SolicitudModel[] = [];
  listarClientes: ClienteModel[] = [];
  listaRegistros: InformePagoModel[] = [];
  listarPagos: PagoModel[] = [];
  cantidadPagada: number[] = [];
  nombresPagados: string[] = [];
  coloresTorta: string[] = [];
  pagina: number = 1;
  pieChart: Chart = new Chart("myChart", {
    type: 'pie',
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: []
        }]
    }
  });
  fgValidacion: FormGroup = this.fb.group({});

  constructor(private service: PagoService,
    private serviceCliente: ClienteService,
    private serviceSolicitud: SolicitudService,
    private fb: FormBuilder) { }

  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      clienteId: ['', Validators.required],

    });
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.listarCliente();
    this.CargarPagos();
  }

  listarCliente() {
    this.serviceCliente.Listarclientes().subscribe(
      (datos) => {
        this.listarClientes = datos;
      },
      (error) => {
        alert("Error listando los registros Cliente")
      });
  }

  CargarSolicitudes() {
    this.serviceSolicitud.Listarsolicitud().subscribe(
      (datos) => {
        this.listaRegistros = [];
        this.coloresTorta = [];
        this.nombresPagados = [];
        this.cantidadPagada = [];
        this.solicitudListado = datos;
        this.LlenarTabla();
      },
      (error) => {
      }
    );
  }

  CargarPagos() {
    this.service.ListarPagos().subscribe(
      (datos) => {
        this.listarPagos = datos;
      },
      (error) => {
      }
    );
  }

  LlenarValores() {
    for (let index = 0; index < this.listaRegistros.length; index++) {
      this.cantidadPagada.push(this.listaRegistros[index].valor);
      this.nombresPagados.push(this.listaRegistros[index].Inmueble);
      this.coloresTorta.push(this.ColorAleatorio());

    }
  }

  ColorAleatorio() {
    var coolor = "(" + this.generarNumero(255) + "," + this.generarNumero(255) + "," + this.generarNumero(255) + ")";
    return "rgb" + coolor;
  }
  generarNumero(numero: number) {
    return (Math.random() * numero).toFixed(0);
  }
  
  CargarGrafica() {
    if(this.pieChart){
      this.pieChart.destroy();
    }
    this.pieChart = new Chart("myChart", {
      type: 'pie',
      data: {
        labels: this.nombresPagados,
        datasets: [{
          label: 'Cantidad De Pagos Por Solicitudes',
          data: this.cantidadPagada,
          backgroundColor: this.coloresTorta,
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
      },
    });
    
  }

  LlenarTabla() {
    this.solicitudListado = this.solicitudListado.filter(x => x.EstadoSolicitud == "Aceptada");
    for (let i = 0; i < this.solicitudListado.length; i++) {
      let igual = false;
      if (this.solicitudListado[i].clienteId == this.obtenerFGV.clienteId.value) {
        for (let j = 0; j < this.listarPagos.length && !igual; j++) {
          if (this.solicitudListado[i].IdSolicitud == this.listarPagos[j].solicitudCliId) {
            let obj = new InformePagoModel();
            igual = true;
            obj.Inmueble = this.solicitudListado[i].inmueble.NombreIn;
            obj.imagen = this.listarPagos[j].imagenRecibo;
            obj.valor = this.solicitudListado[i].OfertaEconomica;
            console.log(obj)
            if (this.listaRegistros.length == 0) {
              this.listaRegistros.push(obj);
              console.log(this.listaRegistros.length)
            } else {
              for (let x = 0; x <= this.listaRegistros.length; x++) {
                console.log(this.listaRegistros)
                if (this.listaRegistros[x].imagen != obj.imagen) {
                  this.listaRegistros.push(obj);
                  break;
                }
              }
            }
          }
        }
      }
    }
    this.LlenarValores();
    this.CargarGrafica();
  }
}



