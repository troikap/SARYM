import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import decode from "jwt-decode";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  variableRol: string = "";
  variableLibre = false;  
  mySubscription: any;

  nombreUsuario: string;
  apellidoUsuario: string;
  stringLabel: string;

  constructor(private router: Router) {
    this.mySubscription = setInterval( () => { 
      this.variableRol = localStorage.getItem("rolUsuario");


      if ( localStorage.getItem("token") ) {
        const token = localStorage.getItem("token");
        const tokenPayload = decode(token);
        this.nombreUsuario = tokenPayload.nombreUsuario;
        this.apellidoUsuario = tokenPayload.apellidoUsuario;
        this.stringLabel = `${this.nombreUsuario} ${this.apellidoUsuario} - ${this.variableRol}`;
      }


   }, 500);

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  cerrarSesion() {
    localStorage.clear();
    this.variableRol = "";    

    this.router.navigate([`/login`]);
  }
}
