import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { UsuarioService } from "../services/usuario/usuario.service";
import decode from "jwt-decode";
import { RolService } from './rol/rol.service';

@Injectable()
export class RoleGuardService implements CanActivate {

  aux = false;

  constructor(
    public userService: UsuarioService, 
    public router: Router,
    public rolService: RolService
    ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const nombreFuncionRuta = route.data.nombreFuncion;
    let _this = this;
    if (localStorage.getItem("token")) {

      const token = localStorage.getItem("token");
      const tokenPayload = decode(token);
      const rolFromToken = tokenPayload["RolUsuario"];

      if (!this.userService.isAuthenticated()) {
        ($ as any).confirm({
          title: "Error",
          content: "Su usuario no se encuentra autenticado. <br>No se encuentra una sesión activa o su sesión ha expirado.",
          type: "red",
          typeAnimated: true,
          theme: "material",
          buttons: {
            aceptar: {
              text: "Aceptar",
              btnClass: "btn-red",
              action: function () {
                localStorage.clear();
                _this.router.navigate(["/login"]);
              }
            }
          }
        });
      } else {
        if (localStorage.getItem("FuncionesRol")) {
          //hay datos en storage de funcionesRol
          let funcionesRol = localStorage.getItem("FuncionesRol");
          let varr = JSON.parse(funcionesRol);
          for (let item of varr) {
            if (item === nombreFuncionRuta[0]) {
              //accedemos a la url
              return true;
            }
          }
          // no retorno true en ninguna vuelta del for, por ende no encontró permisos y ejecuta el siguiente bloque de código,
          ($ as any).confirm({
            title: "Error",
            content: "Ud. no tiene permisos para acceder a esta funcionalidad del sistema.",
            type: "red",
            typeAnimated: true,
            theme: "material",
            buttons: {
              aceptar: {
                text: "Aceptar",
                btnClass: "btn-red",
                action: function () {
                  _this.router.navigate(["/home"]);
                }
              }
            }
          });
          return false;
        } else {
          //no se encontro el array, borramos el storage y que se vuelva a loguear.
          ($ as any).confirm({
            title: "Error",
            content: "Su usuario no se encuentra autenticado. <br>No se encuentra una sesión activa o su sesión ha expirado.",
            type: "red",
            typeAnimated: true,
            theme: "material",
            buttons: {
              aceptar: {
                text: "Aceptar",
                btnClass: "btn-red",
                action: function () {
                  localStorage.clear();
                  _this.router.navigate(["/login"]);
                }
              }
            }
          });
        }

      }
    }
  }
}
