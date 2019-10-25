import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  variableRol: string = "";
  variableLibre = false;  
  mySubscription: any;

  constructor(private router: Router) {
    this.variableRol = localStorage.getItem("rolUsuario");
    console.log("navbar: ", this.variableRol);

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  cerrarSesion() {
    /*localStorage.removeItem("rolUsuario");
    localStorage.removeItem("token");
    */
    localStorage.clear();
    this.variableRol = "";    

    this.router.navigate([`/login`]);
  }

}
