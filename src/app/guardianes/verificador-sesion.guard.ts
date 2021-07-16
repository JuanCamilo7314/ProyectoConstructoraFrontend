import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class VerificadorSesionGuard implements CanActivate {

  constructor(private servicioSeguridad: SecurityService,
    private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let tieneSesionActiva = this.servicioSeguridad.mirarToken() != "";
    if (tieneSesionActiva) {
      return true;
    } else {
      this.router.navigate(["/inicio"]);
      return false;
    }
  }

}
