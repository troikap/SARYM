import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UsuarioService } from "../../../services/usuario/usuario.service";

@Injectable({
  providedIn: "root"
})
export class LoginGuardGuard implements CanActivate {
  constructor(public usuarioService: UsuarioService, public router: Router) {}

  canActivate() {
    if (this.usuarioService.estaLogueado()) {
      console.log("Paso por el Guard");
      return true;
    } else {
      console.log("Bloqueado por el Guard");
      this.router.navigate(['/login']);
      return false;
    }
  }
}
