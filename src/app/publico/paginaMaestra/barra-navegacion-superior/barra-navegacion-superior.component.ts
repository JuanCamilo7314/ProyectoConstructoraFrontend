import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { datosUsuarioModel } from 'src/app/modelos/datosUsuario.model';
import { SecurityService } from 'src/app/services/security.service';
import {Keys} from '../../../../config/keys';

@Component({
  selector: 'app-barra-navegacion-superior',
  templateUrl: './barra-navegacion-superior.component.html',
  styleUrls: ['./barra-navegacion-superior.component.css']
})
export class BarraNavegacionSuperiorComponent implements OnInit {

  isVendedor: Boolean = false;
  isAdmin: Boolean = false;
  isLogged: Boolean = false;
  subscription: Subscription = new Subscription;
  FirstName: string = "";
  LastName: string = "";

  constructor(
    private service: SecurityService
  ) { }

  ngOnInit(): void {
    this.subscription = this.service.getUserData().subscribe(data => {
      this.isLogged = data.isLogged;
      if (this.isLogged == true) {
        let x: any = data;
        this.FirstName = x.user.NombreU;
        this.LastName = x.user.ApellidoU;
        if (x.user.rolId == Keys.VendedorId) {
          console.log("no soy admin :(");
          this.isAdmin = false;
          this.isVendedor = true;
        } else {
          this.isAdmin = true;
          this.isVendedor = false;
        }
      }

    });
  }

}
