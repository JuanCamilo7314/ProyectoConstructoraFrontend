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

    CrearBloque(model: BloqueModel): Observable<BloqueModel> {
      let idProyecto = 0;
      if (model.proyectoId) {
        idProyecto = parseInt(model.proyectoId.toString());
        console.log(model);
      }
      return this.http.post<BloqueModel>('http://localhost:3000/bloques', {
        NombreB: model.NombreB,
        proyectoId: idProyecto
      }, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
  
    ActualizarBloque(model: BloqueModel): Observable<BloqueModel> {
      let idProyecto = 0;
      if (model.proyectoId) {
        idProyecto = parseInt(model.proyectoId.toString());
        console.log(model);
      }
      return this.http.put<BloqueModel>(`http://localhost:3000/bloques/${model.CodigoB}`, {
        NombreB: model.NombreB,
        proyectoId: idProyecto
      }, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

  EliminarBloque(model: BloqueModel): Observable<any>{
    return this.http.delete<BloqueModel>(`http://localhost:3000/bloques/${model.CodigoB}`,{
      headers: new HttpHeaders({
        "Authorization":`Bearer ${this.token}`
      })
    })
  }

  BuscarBloque(id: number): Observable<BloqueModel>{
    return this.http.get<BloqueModel>(`http://localhost:3000/bloques/${id}`,{
      headers: new HttpHeaders({
      })
    })
  }

  Listarbloques(): Observable<BloqueModel[]>{
    return this.http.get<BloqueModel[]>('http://localhost:3000/bloques/?filter={"include":["proyecto"]}',{
      headers: new HttpHeaders({
      })
    })
  }
}