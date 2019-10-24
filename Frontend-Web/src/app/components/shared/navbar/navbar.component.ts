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

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });

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
    
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/login']);
    }); 

    //this.router.navigate([`/login`]);



  }

}
