import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SecurityService } from './security.service';
import { PagoModel } from '../modelos/pago.model';
import { SolicitudModel } from '../modelos/solicitud.model';
import { UploadModel } from '../modelos/upload.model';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  PagoData = new BehaviorSubject<PagoModel>({} as any);
  token: string = "";

  constructor(private http: HttpClient,
    private servicioSeguridad: SecurityService) {
    this.token = servicioSeguridad.obtenerToken();
  }


  CrearPago(model: PagoModel): Observable<PagoModel> {
    return this.http.post<PagoModel>('http://localhost:3000/pagos', {
      imagenRecibo: model.imagenRecibo,
      solicitudCliId: model.solicitudCliId
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  EliminarPago(model: PagoModel): Observable<any> {
    return this.http.delete<PagoModel>(`http://localhost:3000/pagos/${model.id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  BuscarPago(id: number): Observable<PagoModel> {
    return this.http.get<PagoModel>(`http://localhost:3000/pagos/${id}`, {
      headers: new HttpHeaders({
      })
    })
  }

  ListarPagos(): Observable<PagoModel[]> {
    return this.http.get<PagoModel[]>('http://localhost:3000/pagos', {
      headers: new HttpHeaders({
      })
    })
  }


  uploadImage(formData: any): Observable<UploadModel> {
    return this.http.post<UploadModel>('http://localhost:3000/CargarImagenRecibo', formData, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

}
