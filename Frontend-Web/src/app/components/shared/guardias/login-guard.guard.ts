import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UsuarioService } from "../../../services/usuario/usuario.service";

@Injectable({
  providedIn: "root"
})
export class LoginGuardGuard implements CanActivate {
  constructor(public usuarioService: UsuarioService, public router: Router) { }

  canActivate() {
    let res = this.usuarioService.estaLogueado().then(res => {
      if (res['tipo'] == 1) {
        //Tiene token activo y coincide con Rol
        return true;
      } else if (res['tipo'] == 2){
        //Rol NO coincide con Token
        let _this = this;
        console.log("Bloqueado por el Guard");
        ($ as any).confirm({
          title: "Error",
          content: "Ud no tiene permisos para ingresar a esta página.",
          type: 'red',
          typeAnimated: true,
          theme: 'material',
          buttons: {
            aceptar: {
              text: 'Aceptar',
              btnClass: 'btn-red',
              action: function () {
                _this.router.navigate(['/home']);
              }
            }
          }
        });
      } else {
        //Token expirado o inválido.
        let _this = this;
        console.log("Bloqueado por el Guard");
        ($ as any).confirm({
          title: "Error",
          content: "No se encuentra una sesión activa. Por favor iniciar sesión.",
          type: 'red',
          typeAnimated: true,
          theme: 'material',
          buttons: {
            aceptar: {
              text: 'Ir a Login',
              btnClass: 'btn-red',
              action: function () {
                _this.router.navigate(['/login']);
              }
            }
          }
        });
      }
    });
    return res;
  }
}

