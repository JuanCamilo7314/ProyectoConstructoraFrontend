import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BloqueModel } from '../modelos/bloque.model';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class BloqueService {
  bloqueData = new BehaviorSubject<BloqueModel>({} as any);
  token: string = "";

  constructor(private http: HttpClient, 
    private servicioSeguridad: SecurityService ) { 
      this.token = servicioSeguridad.obtenerToken();
    }

  
  CrearPais(model: BloqueModel): Observable<BloqueModel>{
    return this.http.post<BloqueModel>('http://localhost:3000/proyectos',model,{
      headers: new HttpHeaders({
        "Authorization":`Bearer ${this.token}`
      })
    })
  }

  ActualizarPais(model: BloqueModel): Observable<BloqueModel>{
    return this.http.put<BloqueModel>(`http://localhost:3000/proyectos/${model.CodigoB}`,model,{
      headers: new HttpHeaders({
        "Authorization":`Bearer ${this.token}`
      })
    })
  }

  EliminarPais(model: BloqueModel): Observable<any>{
    return this.http.delete<BloqueModel>(`http://localhost:3000/proyectos/${model.CodigoB}`,{
      headers: new HttpHeaders({
        "Authorization":`Bearer ${this.token}`
      })
    })
  }

  BuscarPais(id: number): Observable<BloqueModel>{
    return this.http.get<BloqueModel>(`http://localhost:3000/proyectos/${id}`,{
      headers: new HttpHeaders({
      })
    })
  }

  ListarProyectos(): Observable<BloqueModel[]>{
    return this.http.get<BloqueModel[]>("http://localhost:3000/proyectos/",{
      headers: new HttpHeaders({
      })
    })
  }
}