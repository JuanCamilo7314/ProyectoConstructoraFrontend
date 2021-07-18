import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../modelos/user.model';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  userData = new BehaviorSubject<UserModel>({} as any);
  token: string = "";

  constructor(private http: HttpClient,
    private servicioSeguridad: SecurityService) {
    this.token = servicioSeguridad.obtenerToken();
  }

  CrearUsuario(model: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>('http://localhost:3000/usuarios', model, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  ActualizarUsuario(model: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`http://localhost:3000/usuarios/${model.IdUsuario}`, model, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  EliminarUsuario(model: UserModel): Observable<any> {
    return this.http.delete<UserModel>(`http://localhost:3000/usuarios/${model.IdUsuario}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  BuscarUsuario(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`http://localhost:3000/usuarios/${id}`, {
      headers: new HttpHeaders({
      })
    })
  }

  ListarUsuarios(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>("http://localhost:3000/usuarios", {
      headers: new HttpHeaders({
      })
    })
  }
}
