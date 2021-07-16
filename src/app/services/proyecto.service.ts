import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProyectoModel } from '../modelos/proyecto.model';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  proyectoData = new BehaviorSubject<ProyectoModel>({} as any);
  token: string = "";

  constructor(private http: HttpClient, 
    private servicioSeguridad: SecurityService ) { 
      this.token = servicioSeguridad.obtenerToken();
    }

  
  CrearPais(model: ProyectoModel): Observable<ProyectoModel>{
    return this.http.post<ProyectoModel>('http://localhost:3000/proyectos',model,{
      headers: new HttpHeaders({
        "Authorization":`Bearer ${this.token}`
      })
    })
  }

  ActualizarPais(model: ProyectoModel): Observable<ProyectoModel>{
    return this.http.put<ProyectoModel>(`http://localhost:3000/proyectos/${model.CodigoProy}`,model,{
      headers: new HttpHeaders({
        "Authorization":`Bearer ${this.token}`
      })
    })
  }

  EliminarPais(model: ProyectoModel): Observable<any>{
    return this.http.delete<ProyectoModel>(`http://localhost:3000/proyectos/${model.CodigoProy}`,{
      headers: new HttpHeaders({
        "Authorization":`Bearer ${this.token}`
      })
    })
  }

  BuscarPais(id: number): Observable<ProyectoModel>{
    return this.http.get<ProyectoModel>(`http://localhost:3000/proyectos/${id}`,{
      headers: new HttpHeaders({
      })
    })
  }

  ListarProyectos(): Observable<ProyectoModel[]>{
    return this.http.get<ProyectoModel[]>("http://localhost:3000/proyectos/",{
      headers: new HttpHeaders({
      })
    })
  }
}