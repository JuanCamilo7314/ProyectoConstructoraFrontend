import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InmuebleModel } from '../modelos/inmueble.model';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {
  inmuebleData = new BehaviorSubject<InmuebleModel>({} as any);
  token: string = "";

  constructor(private http: HttpClient, 
    private servicioSeguridad: SecurityService ) { 
      this.token = servicioSeguridad.obtenerToken();
    }

  
  CrearInmueble(model: InmuebleModel): Observable<InmuebleModel>{
    return this.http.post<InmuebleModel>('http://localhost:3000/inmuebles',model,{
      headers: new HttpHeaders({
        "Authorization":`Bearer ${this.token}`
      })
    })
  }

  ActualizarInmueble(model: InmuebleModel): Observable<InmuebleModel>{
    return this.http.put<InmuebleModel>(`http://localhost:3000/inmuebles/${model.CodigoIn}`,model,{
      headers: new HttpHeaders({
        "Authorization":`Bearer ${this.token}`
      })
    })
  }

  EliminarInmueble(model: InmuebleModel): Observable<any>{
    return this.http.delete<InmuebleModel>(`http://localhost:3000/inmuebles/${model.CodigoIn}`,{
      headers: new HttpHeaders({
        "Authorization":`Bearer ${this.token}`
      })
    })
  }

  BuscarInmueble(id: number): Observable<InmuebleModel>{
    return this.http.get<InmuebleModel>(`http://localhost:3000/inmuebles/${id}`,{
      headers: new HttpHeaders({
      })
    })
  }

  ListarInmuebles(): Observable<InmuebleModel[]>{
    return this.http.get<InmuebleModel[]>("http://localhost:3000/inmuebles/",{
      headers: new HttpHeaders({
      })
    })
  }
}
