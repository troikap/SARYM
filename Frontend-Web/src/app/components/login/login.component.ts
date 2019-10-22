import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { UsuarioService } from "../../services/usuario/usuario.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  private form: FormGroup;
  private logueo: any;
  private invalidotitle = "Datos Inválidos";
  private invalidomsj = "Combinación de Usuario y Contraseña incorrectos.";
  private susptitle = "Usuario Suspendido";
  private suspmsj =
    "El Usuario ingresado se encuentra Suspendido o dado de Baja.";
  private valtitle = "Bienvenido";
  private valmsj = "Le damos la bienvenida ";
  private algo = null;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioservicio: UsuarioService,
    private router: Router,
    private rout: RouterModule
  ) {
    this.form = this.formBuilder.group({
      cuitUsuario: ["", Validators.required],
      contrasenaUsuario: ["", Validators.required],
      checkRecordar: false
    });
  }

  ngOnInit() {}

  loguear() {
    console.log("FORMULARIO , ", this.form);
    this.usuarioservicio
      .loguear(this.form.value.cuitUsuario, this.form.value.contrasenaUsuario)
      .then(algo => {
        if (algo.tipo == 2) {
          console.log("MENSAJE ", algo.title);
        } else if (algo.tipo == 1) {
          console.log(algo.title);
          this.logueo = {
            cuit: this.form.value.cuitUsuario,
            pass: this.form.value.contrasenaUsuario,
            id: algo.Usuario,
            date: null
          };
          localStorage.setItem("token", algo.token);
          //localStorage.setOneObject("token", algo.token);
          if (this.form.value.checkRecordar) {
            this.actualizarLog(this.logueo);
          }
          localStorage.setItem("currentUsuario", this.logueo);
          console.log("roooooooool", algo.rol.idRol);

          if (algo.rol.idRol == "Administrador") {
            this.router.navigate(["/home"]);
          } else if (algo.rol.idRol == "Encargado") {
            this.router.navigate(["/home"]);
          } else if (algo.rol.idRol == "Cocina") {
            this.router.navigate(["/home"]);
          } else {
            //mostrar mensaje de error, se logeo con otro idRol distinto a los anteriores
          }
        } else {
          if (algo.tipo == 2) {
            console.log("INVALIDOS");
          } else {
            console.log("SUSPENDIDO INHAVILITAD");
          }
        }
      });
  }

  /*
  async alert() {
    if (this.algo.tipo == 1) {
      const alert = await this.alertController.create({
        header: this.valtitle,
        message: `${this.valmsj} ${this.algo.UsuarioEstado.nombreUsuario} ${this.algo.UsuarioEstado.apellidoUsuario}`,
        buttons: ['OK'],
        cssClass: 'alert',
      });
      await alert.present();
    }
*/
  actualizarLog(log: any) {
    log.date = new Date();
    localStorage.actualizarLog(log).then(res => {
      if (!res) {
        console.log("No Actualizo Log");
      } else {
        console.log("Actualizo Log");
      }
    });
  }

  next() {
    console.log("SIGUIENTE");
    this.router.navigate(["/usuario"]);
  }
  next2() {
    console.log("SIGUIENTE2");
  }
}
