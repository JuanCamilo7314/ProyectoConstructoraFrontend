import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { UsuarioModel } from '../modelos/usuario.model';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { datosUsuarioModel } from '../modelos/datosUsuario.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CambioClaveModel } from '../modelos/cambioClave.model';
import { RecuperarClaveModel } from '../modelos/recuperarClave.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  userData = new BehaviorSubject<datosUsuarioModel>({} as any);

  constructor(
    private http: HttpClient
  ) { 
    this.VerificarSesion();
  }

  VerificarSesion(){
    let sesionActual= this.obtenerInicioSesion();
    if(sesionActual){
      let userData = JSON.parse(sesionActual);
      this.setUserData(userData);
    }
  }

  setUserData(value: datosUsuarioModel){
    this.userData.next(value);
  }

  getUserData(){
    return this.userData.asObservable();
  }

  getUserInfo(){
    return this.userData;
  }

  IniciarSesion(model: UsuarioModel): Observable<datosUsuarioModel>{
    return this.http.post<datosUsuarioModel>('http://localhost:3000/login',model,{
      headers: new HttpHeaders({
        
      })
    })
  }

  RecuperarClave(model: RecuperarClaveModel): Observable<RecuperarClaveModel>{
    return this.http.post<RecuperarClaveModel>('http://localhost:3000/reset-password',model,{
      headers: new HttpHeaders({
        
      })
    })
  }

  CambiarClave(model: CambioClaveModel): Observable<CambioClaveModel>{
    return this.http.put<CambioClaveModel>('http://localhost:3000/cambio-clave',model,{
      headers: new HttpHeaders({
        
      })
    })
  }

  GuardarInicioSesion(UserData: datosUsuarioModel): Boolean {
    let sesionActual = localStorage.getItem('sesion');
    if (sesionActual) {
      return false;
    }else{
      UserData.isLogged=true;
      localStorage.setItem('sesion',JSON.stringify(UserData));
      this.setUserData(UserData);
      return true;
    }
  }

  obtenerToken(){
    let usuariostorage:any= (this.getUserInfo().value);
    return usuariostorage.token;
  }

  mirarToken(){
    let datos= this.obtenerInicioSesion();
    if(datos){
      let objetoDatos: datosUsuarioModel = JSON.parse(datos);
      return objetoDatos.token;
    }
    return "";
  }

  obtenerInicioSesion(){
    let sesionActual = localStorage.getItem('sesion');
    return sesionActual; 
  }

  cerrarSesion(){
    localStorage.removeItem('sesion');
    this.setUserData({} as datosUsuarioModel);
  }
}
