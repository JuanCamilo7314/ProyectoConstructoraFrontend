import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CiudadModel } from '../modelos/ciudad.model';
import { PaisModel } from '../modelos/pais.model';
import { ProyectoModel } from '../modelos/proyecto.model';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  ciudadData = new BehaviorSubject<CiudadModel>({} as any);
  token: string = "";

  constructor(private http: HttpClient,
    private servicioSeguridad: SecurityService) {
    this.token = servicioSeguridad.obtenerToken();
  }

  CrearCiudad(model: CiudadModel): Observable<CiudadModel> {
    let idPais = 0;
    if (model.paisId) {
      idPais = parseInt(model.paisId.toString());
      console.log(model);
    }
    return this.http.post<CiudadModel>('http://localhost:3000/ciudades', {
      NombreC: model.NombreC,
      paisId: idPais
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  ActualizarCiudad(model: CiudadModel): Observable<CiudadModel> {
    let idPais = 0;
    if (model.paisId) {
      idPais = parseInt(model.paisId.toString());
      console.log(model);
    }
    return this.http.put<CiudadModel>(`http://localhost:3000/ciudades/${model.CodigoC}`, {
      NombreC: model.NombreC,
      paisId: idPais
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  EliminarCiudad(model: CiudadModel): Observable<any> {
    return this.http.delete<CiudadModel>(`http://localhost:3000/ciudades/${model.CodigoC}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  BuscarCiudad(id: number): Observable<CiudadModel> {
    return this.http.get<CiudadModel>(`http://localhost:3000/ciudades/${id}`, {
      headers: new HttpHeaders({
      })
    })
  }

  ListarCiudades(): Observable<CiudadModel[]> {
    return this.http.get<CiudadModel[]>('http://localhost:3000/ciudades/?filter={"include":["pais"]}', {
      headers: new HttpHeaders({
      })
    })
  }

  ListarPaisDeUnaCiudad(id: number): Observable<PaisModel> {
    return this.http.get<PaisModel>(`http://localhost:3000/ciudads/${id}/pais`, {
      headers: new HttpHeaders({
      })
    })
  }

  ListarProyectosPorCiudad(id: number): Observable<ProyectoModel[]> {
    return this.http.get<ProyectoModel[]>(`http://localhost:3000/ciudads/${id}/proyectos`, {
      headers: new HttpHeaders({
      })
    })
  }

}
