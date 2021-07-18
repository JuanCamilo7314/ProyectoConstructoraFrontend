import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../../../modelos/user.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Keys } from '../../../../config/keys';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({});
  id = '';

  constructor(private fb: FormBuilder,
    private service: UsuarioService,
    private router: Router,
    private route: ActivatedRoute) { }

  ConstruirFormulario() {
    this.fgValidacion = this.fb.group({
      id: ['', Validators.required],
      DocumentoU: ['', Validators.required],
      NombreU: ['', Validators.required],
      ApellidoU: ['', Validators.required],
      EmailU: ['', Validators.required],
      TelefonoU: ['', Validators.required],
      rolId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.BuscarRegistro();
  }

  get obtenerFGV() {
    return this.fgValidacion.controls;
  }

  BuscarRegistro() {
    this.id = this.route.snapshot.params["id"];
    this.service.BuscarUsuario(this.id).subscribe(
      (datos) => {
        let rol1 = "";
        if (datos.Rol = Keys.AdminId) {
          rol1 = "Admin"
        }
        if (datos.Rol = Keys.VendedorId) {
          rol1 = "Vendedor";
        }
        this.obtenerFGV.id.setValue(datos.IdUsuario);
        this.obtenerFGV.DocumentoU.setValue(datos.DocumentoU);
        this.obtenerFGV.NombreU.setValue(datos.NombreU);
        this.obtenerFGV.ApellidoU.setValue(datos.ApellidoU);
        this.obtenerFGV.EmailU.setValue(datos.EmailU);
        this.obtenerFGV.TelefonoU.setValue(datos.TelefonoU);
        this.obtenerFGV.rolId.setValue(rol1);
      },
      (error) => {
        alert("No se encuentra el registro");
      }
    );
  }

  ActualizarRegistro() {
    if (this.fgValidacion.invalid) {
      alert("informacion invalida")
    } else {
      let id = this.obtenerFGV.id.value;
      let doc = this.obtenerFGV.DocumentoU.value;
      let nom = this.obtenerFGV.NombreU.value;
      let apellido = this.obtenerFGV.ApellidoU.value;
      let email = this.obtenerFGV.EmailU.value;
      let telefono = this.obtenerFGV.TelefonoU.value;
      let roll = this.obtenerFGV.rolId.value;
      alert(roll);
      if (roll == "Admin") {
        roll = Keys.AdminId;
      }
      if (roll == "Vendedor") {
        roll = Keys.VendedorId;
      }
      let obj = new UserModel();
      obj.DocumentoU = doc;
      obj.NombreU = nom;
      obj.ApellidoU = apellido;
      obj.EmailU = email;
      obj.TelefonoU = telefono;
      obj.Rol = roll;
      obj.IdUsuario = id;
      console.log(obj);
      this.service.ActualizarUsuario(obj).subscribe(
        (datos) => {
          alert("Registro guardado");
          this.router.navigate(["/usuario/listar-usuario"]);
        },
        (error) => {
          alert("Error al guardar un registro");
        });
    }

  }
}