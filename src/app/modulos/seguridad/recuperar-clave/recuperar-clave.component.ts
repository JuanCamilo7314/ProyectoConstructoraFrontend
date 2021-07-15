import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecuperarClaveModel } from 'src/app/modelos/recuperarClave.model';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css']
})
export class RecuperarClaveComponent implements OnInit {

  
  fgValidacion: FormGroup = this.fb.group({});
  constructor(private fb: FormBuilder, 
    private service: SecurityService, 
    private route: ActivatedRoute, 
    private router:Router) {
   }

  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      correo: ['', Validators.required,Validators.email]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  RecuperarClave(){
    let model=this.getRecuperarClaveModel();
      this.service.RecuperarClave(model).subscribe(data=>{
        console.log(data);
        this.router.navigate(["/inicio"]);
      },err=>{
        alert("informacion invalida");
      });
  }

  getRecuperarClaveModel(): RecuperarClaveModel{
    let model= {} as RecuperarClaveModel;
    model.EmailU= this.obtenerFGV.correo.value;
    return model;
  }

  get obtenerFGV(){
    return this.fgValidacion.controls;
  }

}
