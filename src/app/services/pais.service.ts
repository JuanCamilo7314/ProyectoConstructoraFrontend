import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CiudadModel } from '../modelos/ciudad.model';
import { PaisModel } from '../modelos/pais.model';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  paisData = new BehaviorSubject<PaisModel>({} as any);
  token: string = "";

  constructor(private http: HttpClient, 
    private servicioSeguridad: SecurityService ) { 
      this.token = servicioSeguridad.obtenerToken();
    }

  
  CrearPais(model: PaisModel): Observable<PaisModel>{
    return this.http.post<PaisModel>('http://localhost:3000/paises',model,{
      headers: new HttpHeaders({
        "Authorization":`Bearer ${this.token}`
      })
    })
  }

  ActualizarPais(model: PaisModel): Observable<PaisModel>{
    return this.http.put<PaisModel>(`http://localhost:3000/paises/${model.CodigoP}`,model,{
      headers: new HttpHeaders({
        "Authorization":`Bearer ${this.token}`
      })
    })
  }

  EliminarPais(model: PaisModel): Observable<any>{
    return this.http.delete<PaisModel>(`http://localhost:3000/paises/${model.CodigoP}`,{
      headers: new HttpHeaders({
        "Authorization":`Bearer ${this.token}`
      })
    })
  }

  BuscarPais(id: number): Observable<PaisModel>{
    return this.http.get<PaisModel>(`http://localhost:3000/paises/${id}`,{
      headers: new HttpHeaders({
      })
    })
  }

  ListarPaises(): Observable<PaisModel[]>{
    return this.http.get<PaisModel[]>("http://localhost:3000/paises",{
      headers: new HttpHeaders({
      })
    })
  }

  ListarCiudades(): Observable<PaisModel[]>{
    return this.http.get<PaisModel[]>('http://localhost:3000/paises/?filter={"include":["ciudad"]}',{
      headers: new HttpHeaders({
      })
    })
  }
}
