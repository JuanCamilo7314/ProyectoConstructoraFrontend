import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProyectoModel } from '../modelos/proyecto.model';
import { UploadModel } from '../modelos/upload.model';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  proyectoData = new BehaviorSubject<ProyectoModel>({} as any);
  token: string = "";

  constructor(private http: HttpClient,
    private servicioSeguridad: SecurityService) {
    this.token = servicioSeguridad.obtenerToken();
  }


  CrearProyecto(model: ProyectoModel): Observable<ProyectoModel> {
    let idCiudad = 0;
    if (model.ciudadId) {
      idCiudad = parseInt(model.ciudadId.toString());
      console.log(model);
    }
    return this.http.post<ProyectoModel>('http://localhost:3000/proyectos', {
      NombreProy: model.NombreProy,
      DescripcionProy: model.DescripcionProy,
      DImagen: model.DImagen,
      ciudadId: idCiudad
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  ActualizarProyecto(model: ProyectoModel): Observable<ProyectoModel> {
    let idCiudad = 0;
    if (model.ciudadId) {
      idCiudad = parseInt(model.ciudadId.toString());
      console.log(model);
    }
    return this.http.put<ProyectoModel>(`http://localhost:3000/proyectos/${model.CodigoProy}`, {
      NombreProy: model.NombreProy,
      DescripcionProy: model.DescripcionProy,
      DImagen: model.DImagen,
      ciudadId: model.ciudadId
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  EliminarProyecto(model: ProyectoModel): Observable<any> {
    return this.http.delete<ProyectoModel>(`http://localhost:3000/proyectos/${model.CodigoProy}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  BuscarProyecto(id: number): Observable<ProyectoModel> {
    return this.http.get<ProyectoModel>(`http://localhost:3000/proyectos/${id}`, {
      headers: new HttpHeaders({
      })
    })
  }

  ListarProyectos(): Observable<ProyectoModel[]> {
    return this.http.get<ProyectoModel[]>("http://localhost:3000/proyectos/", {
      headers: new HttpHeaders({
      })
    })
  }


  uploadImage(formData: any): Observable<UploadModel> {
    return this.http.post<UploadModel>('http://localhost:3000/CargarImagenProyecto', formData, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }
}