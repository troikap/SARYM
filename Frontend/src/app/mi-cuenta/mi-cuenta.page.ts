import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.page.html',
  styleUrls: ['./mi-cuenta.page.scss'],
})
export class MiCuentaPage implements OnInit {
  count = '266 puntos';
 
  acount = [
    {
      id: '1',
      img: 'alert',
      date: '15/05/19',
      name: 'Carga GNC',
      valor: '$325,10'
    },
    {
      id: '2',
      img: 'cash',
      date: '15/05/19',
      name: 'Puntos',
      valor: '+16ptos'
    },
    {
      id: '1',
      img: 'alert',
      date: '10/05/19',
      name: 'Carga GNC',
      valor: '$125,20'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
