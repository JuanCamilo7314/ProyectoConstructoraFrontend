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
  FirstName: string = "";
  LastName: string = "";

  constructor(
    private service: SecurityService
  ) { }

  ngOnInit(): void {
    this.subscription = this.service.getUserData().subscribe(data => {
      this.isLogged = data.isLogged;
      if (this.isLogged==true) {
        let x: any = data;
        this.FirstName = x.user.NombreU;
        this.LastName = x.user.ApellidoU;
        if (x.user.rolId=="608325b4855f1d6c1048f7bf") {
          console.log("no soy admin :(");
          this.isAdmin=false;
        }else{
          this.isAdmin=true;
        }
      }


    });
  }

}
