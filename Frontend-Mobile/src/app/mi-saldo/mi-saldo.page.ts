import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mi-saldo',
  templateUrl: './mi-saldo.page.html',
  styleUrls: ['./mi-saldo.page.scss'],
})
export class MiSaldoPage implements OnInit {
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
    },
    {
      id: '2',
      img: 'cash',
      date: '10/05/19',
      name: 'Puntos',
      valor: '+6ptos'
    },
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
    }
  ];

  constructor() { }

  ngOnInit() {
  }


}
