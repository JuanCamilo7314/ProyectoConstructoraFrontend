import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { datosUsuarioModel } from 'src/app/modelos/datosUsuario.model';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-barra-navegacion-superior',
  templateUrl: './barra-navegacion-superior.component.html',
  styleUrls: ['./barra-navegacion-superior.component.css']
})
export class BarraNavegacionSuperiorComponent implements OnInit {

  isAdmin: Boolean = false;
  isLogged: Boolean = false;
  subscription: Subscription = new Subscription;

  constructor(
    private service: SecurityService
  ) { }

  ngOnInit(): void {
    this.subscription = this.service.getUserData().subscribe(data => {
      this.isLogged = data.isLogged;
      if (this.isLogged==true) {
        let x: any = data;
        if (x.user.rolId=="6079f12427f72e71196cee9e") {
          console.log("no soy admin :(");
          this.isAdmin=false;
        }else{
          this.isAdmin=true;
        }
      }


    });
  }

}
