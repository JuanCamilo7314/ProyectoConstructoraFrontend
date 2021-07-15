import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mode } from 'crypto-js';
import { CambioClaveModel } from 'src/app/modelos/cambioClave.model';
import { datosUsuarioModel } from 'src/app/modelos/datosUsuario.model';
import { SecurityService } from 'src/app/services/security.service';
import { UsuarioModule } from '../../usuario/usuario.module';

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.component.html',
  styleUrls: ['./cambiar-clave.component.css']
})
export class CambiarClaveComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});
  
  constructor(private fb: FormBuilder,
    private service: SecurityService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      correo: ['', Validators.required, Validators.email],
      claveactual: ['', Validators.required],
      clavenueva: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  cambiarClave() {
    if (this.fgValidacion.invalid) {
      alert("informacion invalida")
    } else {
      let model = this.getcambioClaveModel();
      let usuariostorage:any= (this.service.getUserInfo().value);
      console.log(usuariostorage.token);
      if(usuariostorage.user.EmailU==model.EmailU){
        this.service.CambiarClave(model).subscribe(data => {
          console.log(data);
          this.router.navigate(["/inicio"]);
        }, err => {
          alert("informacion invalida");
        });
      }else{
        alert("Use el correo de su cuenta");
      }
      
    }
  }

  getcambioClaveModel(): CambioClaveModel {
    let model = {} as CambioClaveModel;
    model.EmailU = this.obtenerFGV.correo.value;
    model.ClaveActual = this.obtenerFGV.claveactual.value;
    model.ClaveNueva = this.obtenerFGV.clavenueva.value;

    return model;
  }
  get obtenerFGV() {
    return this.fgValidacion.controls;
  }

  resolved(token: any) {
    console.log(token);
  }
}
