import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    /* Hacer lógica que verifique si se encuentra logueado. En caso de no estar 
    logueado, redirige a pantalla de login */
    
  }

}
