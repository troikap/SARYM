import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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
  private rol: string;
  private nombreUsuarioLog: string;
  private apellidoUsuarioLog: string;
  private idUsuario: string;

  private invalidotitle = "Datos Inválidos";
  private invalidomsj = "Combinación de Usuario y Contraseña incorrectos.";
  private susptitle = "Usuario Suspendido";
  private suspmsj = "El Usuario ingresado se encuentra Suspendido o dado de Baja.";
  private valtitle = "Bienvenido";
  private valmsj = "Le damos la bienvenida ";
  private algo = null;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioservicio: UsuarioService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      cuitUsuario: ["", Validators.required],
      contrasenaUsuario: ["", Validators.required],
      checkRecordar: false
    });
  }

  ngOnInit() { }

  loguear() {
    this.usuarioservicio
      .loguear(this.form.value.cuitUsuario, this.form.value.contrasenaUsuario)
      .then( algo => {
        if ( algo.tipo != null ) {
          if (algo.tipo == 2) {
            let titulo = `${this.invalidotitle}`;
            let mensaje = `${this.invalidomsj}`;
            ($ as any).confirm({
              title: titulo,
              content: mensaje,
              type: "red",
              typeAnimated: true,
              theme: "material",
              buttons: {
                aceptar: {
                  text: "Aceptar",
                  btnClass: "btn-red",
                }
              }
            });
          } else if (algo.tipo == 1) {
            this.logueo = {
              cuit: this.form.value.cuitUsuario,
              pass: this.form.value.contrasenaUsuario,
              id: algo.Usuario,
              date: null
            };
            localStorage.setItem("token", algo.token);
            this.nombreUsuarioLog = algo.UsuarioEstado.nombreUsuario;
            this.apellidoUsuarioLog = algo.UsuarioEstado.apellidoUsuario;
            this.rol = algo.rol.idRol;
            this.idUsuario = algo.UsuarioEstado.idUsuario;
            localStorage.setItem("rolUsuario", this.rol);
            localStorage.setItem("idUsuario", this.idUsuario);

            let _this = this;

            if (this.rol == "Administrador" || this.rol == "Encargado" || this.rol == "Cocinero") {
              let titulo = `${this.valtitle}`;
              let mensaje = `${this.valmsj} ${_this.nombreUsuarioLog} ${_this.apellidoUsuarioLog} `;
              ($ as any).confirm({
                title: titulo,
                content: mensaje,
                type: "blue",
                typeAnimated: true,
                theme: "material",
                buttons: {
                  aceptar: {
                    text: "Aceptar",
                    btnClass: "btn-blue",
                    action: function () {
                      _this.router.navigate([`/home`]);
                    }
                  }
                }
              });
            } else {
              //Error, se logeo con otro idRol distinto a los anteriores
              ($ as any).confirm({
                title: "Error",
                content: "Ud. no tiene acceso al sistema",
                type: "red",
                typeAnimated: true,
                theme: "material",
                buttons: {
                  aceptar: {
                    text: "Aceptar",
                    btnClass: "btn-red",
                  }
                }
              });
            }
          } else {
            //algo.tipo==3 usuario suspendido
            ($ as any).confirm({
              title: `${this.susptitle}`,
              content: `${this.suspmsj}`,
              type: "orange",
              typeAnimated: true,
              theme: "material",
              buttons: {
                aceptar: {
                  text: "Aceptar",
                  btnClass: "btn-orange",
                }
              }
            });
          }
        } else {
          //NO SE PUDO CONECTAR CON LA BASE DE DATOS
          ($ as any).confirm({
            title: "Error",
            content: "Error de base de datos.",
            type: 'red',
            typeAnimated: true,
            theme: 'material',
            buttons: {
              aceptar: {
                text: 'Aceptar',
                btnClass: 'btn-red',
              }
            }
          });
        }
      });
  }
}
