import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SecurityService } from './security.service';
import { SolicitudModel } from '../modelos/solicitud.model';
import { PagoModel } from '../modelos/pago.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  solicitudData = new BehaviorSubject<SolicitudModel>({} as any);
  token: string = "";

  constructor(private http: HttpClient,
    private servicioSeguridad: SecurityService) {
    this.token = servicioSeguridad.obtenerToken();
  }

  CrearSolicitud(model: SolicitudModel): Observable<SolicitudModel> {
    return this.http.post<SolicitudModel>('http://localhost:3000/solicitud', {
      clienteId: model.clienteId,
      inmuebleId: model.inmuebleId,
      usuarioId: model.usuarioId,
      FechaSolicitud: model.FechaSolicitud,
      OfertaEconomica: model.OfertaEconomica,
      EstadoSolicitud: model.EstadoSolicitud
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  ActualizarSolicitud(model: SolicitudModel): Observable<SolicitudModel> {
    return this.http.put<SolicitudModel>(`http://localhost:3000/solicitud/${model.IdSolicitud}`, {
      clienteId: model.clienteId,
      inmuebleId: model.inmuebleId,
      usuarioId: model.usuarioId,
      FechaSolicitud: model.FechaSolicitud,
      OfertaEconomica: model.OfertaEconomica,
      EstadoSolicitud: model.EstadoSolicitud
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  EliminarSolicitud(model: SolicitudModel): Observable<any> {
    return this.http.delete<SolicitudModel>(`http://localhost:3000/solicitud/${model.IdSolicitud}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  BuscarSolicitud(id: number): Observable<SolicitudModel> {
    return this.http.get<SolicitudModel>(`http://localhost:3000/solicitud/${id}`, {
      headers: new HttpHeaders({
      })
    })
  }

  Listarsolicitud(): Observable<SolicitudModel[]> {
    return this.http.get<SolicitudModel[]>('http://localhost:3000/solicitud/?filter={"include":["cliente","inmueble"]}', {
      headers: new HttpHeaders({
      })
    })
  }

  ListarPagodeSolicitud(id: any): Observable<PagoModel> {
    return this.http.get<PagoModel>(`http://localhost:3000/solicitud-clis/${id}/pagos`, {
      headers: new HttpHeaders({
      })
    })
  }

}
