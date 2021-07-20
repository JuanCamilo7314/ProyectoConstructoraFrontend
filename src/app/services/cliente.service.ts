import { Injectable } from '@angular/core';
import { ClienteModel } from '../modelos/cliente.model';
import { UploadModel } from '../modelos/upload.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SecurityService } from './security.service';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  ClienteData = new BehaviorSubject<ClienteModel>({} as any);
  token: string = "";

  constructor(private http: HttpClient,
    private servicioSeguridad: SecurityService) {
    this.token = servicioSeguridad.obtenerToken();
  }

  CrearCliente(model: ClienteModel): Observable<ClienteModel> {
   
    return this.http.post<ClienteModel>('http://localhost:3000/clientes', {
      DocumentoCli: model.DocumentoCli,
      NombreCli: model.NombreCli,
      ApellidoCli: model.ApellidoCli,
      FechaNaciCli: model.FechaNaciCli,
      DImagenCli: model.DImagenCli,
      TelefonoCli: model.TelefonoCli,
      EmailCli: model.EmailCli,
      DireccionCLi: model.DireccionCLi,
      ciudadId: model.ciudadId,
      TotIngresosCli: model.TotIngresosCli,
      DatosTrabajo: model.DatosTrabajo,
      TiemTrabajoAcCli: model.TiemTrabajoAcCli,
      NombreRefFamCli: model.NombreRefFamCli,
      ApellidoRefFamCli: model.ApellidoRefFamCli,
      TelefonoRefFamCli: model.TelefonoRefFamCli,
      NombreRefPerCli: model.NombreRefPerCli,
      ApellidoRefPerCli: model.ApellidoRefPerCli,
      TelefonoRefPerCli: model.TelefonoRefPerCli
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  ActualizarCliente(model: ClienteModel): Observable<ClienteModel> {
    return this.http.put<ClienteModel>(`http://localhost:3000/clientes/${model.IdCliente}`, {
      DocumentoCli: model.DocumentoCli,
      NombreCli: model.NombreCli,
      ApellidoCli: model.ApellidoCli,
      FechaNaciCli: model.FechaNaciCli,
      DImagenCli: model.DImagenCli,
      TelefonoCli: model.TelefonoCli,
      EmailCli: model.EmailCli,
      DireccionCLi: model.DireccionCLi,
      ciudadId: model.ciudadId,
      TotIngresosCli: model.TotIngresosCli,
      DatosTrabajo: model.DatosTrabajo,
      TiemTrabajoAcCli: model.TiemTrabajoAcCli,
      NombreRefFamCli: model.NombreRefFamCli,
      ApellidoRefFamCli: model.ApellidoRefFamCli,
      TelefonoRefFamCli: model.TelefonoRefFamCli,
      NombreRefPerCli: model.NombreRefPerCli,
      ApellidoRefPerCli: model.ApellidoRefPerCli,
      TelefonoRefPerCli: model.TelefonoRefPerCli
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  EliminarCliente(model: ClienteModel): Observable<any> {
    return this.http.delete<ClienteModel>(`http://localhost:3000/clientes/${model.IdCliente}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  BuscarCLiente(id: number): Observable<ClienteModel> {
    return this.http.get<ClienteModel>(`http://localhost:3000/clientes/${id}`, {
      headers: new HttpHeaders({
      })
    })
  }

  Listarclientes(): Observable<ClienteModel[]> {
    return this.http.get<ClienteModel[]>('http://localhost:3000/clientes/?filter={"include":["ciudad"]}', {
      headers: new HttpHeaders({
      })
    })
  }

  uploadImage(formData: any): Observable<UploadModel> {
    return this.http.post<UploadModel>('http://localhost:3000/CargarImagenCliente', formData, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

} 

