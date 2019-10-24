import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
<<<<<<< HEAD
  variableRol: string;
=======
  variableRol = "Administrador";
>>>>>>> Emilio
  variableLibre = false;
  constructor() {
    this.variableRol = localStorage.getItem("rolUsuario");
    console.log("navbar: ", this.variableRol);
   }

  ngOnInit() {
  }

}
