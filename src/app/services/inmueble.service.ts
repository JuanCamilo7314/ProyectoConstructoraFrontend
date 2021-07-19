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

  
    CrearInmueble(model: InmuebleModel): Observable<InmuebleModel> {
      let idbloque = 0;
      let valor=0;
      if (model.bloqueId) {
        idbloque = parseInt(model.bloqueId.toString());
        console.log(model);
      }
      if(model.ValorIn){
        valor = parseInt(model.ValorIn.toString());
        console.log(model);
      }
      return this.http.post<InmuebleModel>('http://localhost:3000/inmuebles', {
        Identificador: model.Identificador,
        NombreIn: model.NombreIn,
        ValorIn: valor,
        bloqueId: idbloque
      }, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
  
    ActualizarInmueble(model: InmuebleModel): Observable<InmuebleModel> {
      let idbloque = 0;
      let valor=0;
      if (model.bloqueId) {
        idbloque = parseInt(model.bloqueId.toString());
      }
      if(model.ValorIn){
        valor = parseInt(model.ValorIn.toString());
        console.log(model);
      }
      return this.http.put<InmuebleModel>(`http://localhost:3000/Inmuebles/${model.CodigoIn}`,{
        Identificador: model.Identificador,
        NombreIn: model.NombreIn,
        ValorIn: valor,
        bloqueId: idbloque
      },{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
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
    return this.http.get<InmuebleModel[]>('http://localhost:3000/inmuebles/?filter={"include":["bloque"]}',{
      headers: new HttpHeaders({
      })
    })
  }
}
