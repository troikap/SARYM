import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsuarioService } from '../services/usuario/usuario.service';
//https://github.com/auth0/angular2-jwt/


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public userService: UsuarioService, public router: Router) {}
  canActivate(): boolean {
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
