import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  variableRol: string = "";
  variableLibre = false;  
  mySubscription: any;

  constructor(private router: Router) {
    this.mySubscription = setInterval( () => { 
      this.variableRol = localStorage.getItem("rolUsuario");
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
