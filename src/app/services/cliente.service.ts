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
    let idCiudad = 0;
    let doc = 0;
    if (model.CiudadId) {
      idCiudad = parseInt(model.CiudadId.toString());
      console.log(model);
    }
    if (model.DocumentoCli) {
      doc = parseInt(model.DocumentoCli.toString());
      console.log(model);
    }
    return this.http.post<ClienteModel>('http://localhost:3000/clientes', {
      DocumentoCli: doc,
      NombreCli: model.NombreCli,
      ApellidoCli: model.ApellidoCli,
      FechaNaciCli: model.FechaNaciCli,
      DImagenCli: model.DImagenCli,
      TelefonoCli: model.TelefonoCli,
      EmailCli: model.EmailCli,
      DireccionCli: model.DireccionCli,
      CiudadId: idCiudad
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  ActualizarCliente(model: ClienteModel): Observable<ClienteModel> {
    let idCiudad = 0;
    let valor = 0;
    if (model.CiudadId) {
      idCiudad = parseInt(model.CiudadId.toString());
      console.log(model);
    }
    if (model.TotIngresosCli) {
      valor = parseInt(model.TotIngresosCli.toString());
      console.log(model);
    }
    return this.http.put<ClienteModel>(`http://localhost:3000/clientes/${model.IdCliente}`, {
      DocumentoCli: model.DocumentoCli,
      NombreCli: model.NombreCli,
      ApellidoCli: model.ApellidoCli,
      FechaNaciCli: model.FechaNaciCli,
      DImagenCli: model.DImagenCli,
      TelefonoCli: model.TelefonoCli,
      EmailCli: model.EmailCli,
      DireccionCli: model.DireccionCli,
      CiudadId: idCiudad,
      TotIngresosCli: valor,
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

  EliminarCiudad(model: ClienteModel): Observable<any> {
    return this.http.delete<ClienteModel>(`http://localhost:3000/clientes/${model.IdCliente}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  BuscarCiudad(id: number): Observable<ClienteModel> {
    return this.http.get<ClienteModel>(`http://localhost:3000/clientes/${id}`, {
      headers: new HttpHeaders({
      })
    })
  }

  Listarclientes(): Observable<ClienteModel[]> {
    return this.http.get<ClienteModel[]>('http://localhost:3000/clientes', {
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

