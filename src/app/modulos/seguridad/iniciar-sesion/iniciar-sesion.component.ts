import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { SecurityService } from 'src/app/services/security.service';
import {Keys as llaves} from '../../../../config/keys';
@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});
  constructor(private fb: FormBuilder, 
    private service: SecurityService, 
    private route: ActivatedRoute, 
    private router:Router) {
   }

  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      correo: ['', Validators.required,Validators.email],
      clave: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  IniciarSesion(){
    if(this.fgValidacion.invalid){
      alert("informacion invalida")
    }else{
      let model=this.getLoginModel();
      this.service.IniciarSesion(model).subscribe(data=>{
        console.log(data);
        let res = this.service.GuardarInicioSesion(data);
        this.router.navigate(["/inicio"]);
      },err=>{
        alert("informacion invalida");
      });
    }
  }

  getLoginModel(): UsuarioModel{
    let model= {} as UsuarioModel;
    model.EmailU= this.obtenerFGV.correo.value;
    
   
    model.ClaveU= this.obtenerFGV.clave.value;

    return model;
  }
  get obtenerFGV(){
    return this.fgValidacion.controls;
  }

  resolved(token: any){
    console.log(token);
  }
}
