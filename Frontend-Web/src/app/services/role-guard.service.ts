import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { UsuarioService } from "../services/usuario/usuario.service";
import decode from "jwt-decode";


@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public userService: UsuarioService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    console.log("expectedrole traido", expectedRole);

    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      //Recuperamos el rol del token.
      const tokenPayload = decode(token);
      const rolFromToken = tokenPayload["RolUsuario"];

      console.log("ROL ESPERADO", expectedRole);
      console.log("ROL RECUPERADO DEL TOKEN", rolFromToken);

      for (let item of expectedRole) {
        if (item == rolFromToken) {
          console.log("LO CONTIENE!!!!!!!");
          if (!this.userService.isAuthenticated()) {
            this.router.navigate(["/login"]);
            return false;
          } else {
            return true;
          }
        }
        this.router.navigate(["/login"]);
        return false;
      }
    } else {
      //MOSTRAR MENSAJE DE QUE NO TIENE TOKEN....POPUP
      this.router.navigate(["/login"]);
    }
  }
}
