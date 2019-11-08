import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { UsuarioService } from "../services/usuario/usuario.service";
import decode from "jwt-decode";

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(public userService: UsuarioService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem("token");
    // decode the token to get its payload
    const tokenPayload = decode(token);

    const rolRecuperadoStorage = this.userService.getRolUsuarioLoggeado();

    if (
      !this.userService.isAuthenticated() || rolRecuperadoStorage !== expectedRole
    ) {
      console.log("AHAHA ENTRO POR FALSE", rolRecuperadoStorage)
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }
}
