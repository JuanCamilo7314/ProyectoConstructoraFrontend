import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../../../modelos/user.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import {Keys} from '../../../../config/keys';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder,
    private service: UsuarioService,
    private router: Router) { }

  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      DocumentoU: ['', Validators.required],
      NombreU: ['', Validators.required],
      ApellidoU: ['', Validators.required],
      EmailU: ['', Validators.required],
      TelefonoU: ['', Validators.required] 
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  get obtenerFGV(){
    return this.fgValidacion.controls;
  }

  GuardarRegistro() {
    if (this.fgValidacion.invalid) {
      alert("informacion invalida")
    } else {
      let doc = this.obtenerFGV.DocumentoU.value;
      let nom = this.obtenerFGV.NombreU.value;
      let apellido = this.obtenerFGV.ApellidoU.value;
      let email = this.obtenerFGV.EmailU.value;
      let telefono = this.obtenerFGV.TelefonoU.value;
      let roll = this.obtenerFGV.rolId.value;
      if (roll = "Admin"){
        roll = Keys.AdminId;
      }
      if (roll = "Vendedor"){
        roll = Keys.VendedorId;
      }
      let obj = new UserModel();
      obj.DocumentoU = doc;
      obj.NombreU = nom;
      obj.ApellidoU = apellido;
      obj.EmailU = email;
      obj.TelefonoU = telefono;
      obj.Rol = roll;
      console.log(obj);
      this.service.CrearUsuario(obj).subscribe(
        (datos) => {
          alert("Registro guardado");
          this.router.navigate(["/usuaio/listar-usuario"]);
      },
        (error) => {
          alert("Error al guardar un registro");
        });
    }
  }

}
