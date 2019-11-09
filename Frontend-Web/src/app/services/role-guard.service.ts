import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { UsuarioService } from "../services/usuario/usuario.service";
import decode from "jwt-decode";


@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public userService: UsuarioService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    console.log("expectedrole traido", expectedRole);
    let _this = this;
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      //Recuperamos el rol del token.
      const tokenPayload = decode(token);
      const rolFromToken = tokenPayload["RolUsuario"];


      if (!this.userService.isAuthenticated()) {
        ($ as any).confirm({
          title: "Error",
          content: "Su usuario no se encuentra autenticado. <br>No se encuentra una sesión activa o su sesión ha expirado.",
          type: 'red',
          typeAnimated: true,
          theme: 'material',
          buttons: {
            aceptar: {
              text: 'Aceptar',
              btnClass: 'btn-red',
              action: function () {
                localStorage.clear();
                _this.router.navigate(["/login"]);
                //si retornamos falso, el popup queda pegado....
                //return false;
              }
            }
          }
        });
      } else {
        for (let item of expectedRole) {
          if (item == rolFromToken) {
            return true;
          } else {
            ($ as any).confirm({
              title: "Error",
              content: "Ud. no tiene permisos para acceder a esta URL.",
              type: 'red',
              typeAnimated: true,
              theme: 'material',
              buttons: {
                aceptar: {
                  text: 'Aceptar',
                  btnClass: 'btn-red',
                  action: function () {
                    _this.router.navigate(["/home"]);
                    //return false;
                  }
                }
              }
            });
            return false;
          }
        }
      }
    } else {
      ($ as any).confirm({
        title: "Error",
        content: "Su usuario no se encuentra autenticado. <br>No se encuentra una sesión activa o su sesión ha expirado.",
        type: 'red',
        typeAnimated: true,
        theme: 'material',
        buttons: {
          aceptar: {
            text: 'Aceptar',
            btnClass: 'btn-red',
            action: function () {
              localStorage.clear();
              _this.router.navigate(["/login"]);
              //return false;
              //si retornamos falso, el popup queda pegado....
            }
          }
        }
      });
    }
  }
}