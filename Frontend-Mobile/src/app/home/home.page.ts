import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { StorageService, Log } from '../services/storage/storage.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private logueo: Log;
  private currentUsuario: string;

  slidesCliente = [
    {
      url: '../../assets/icon/Presentacion/logo-sarym.png'
    },
    {
      url: '../../assets/icon/Presentacion/Desayunos.jpg'
    },
    {
      url: '../../assets/icon/Presentacion/Hamburguesa.jpg'
    },
    {
      url: '../../assets/icon/Presentacion/Pastas.jpg'
    },
    {
      url: '../../assets/icon/Presentacion/Variedades.jpg'
    }
  ];

  slidesMozo = [
    {
      url: '../../assets/icon/Presentacion/mozo.jpg'
    }
  ];

  constructor(
    private menu: MenuController,
    private storage: StorageService,
    private navController: NavController
  ) {
    this.loadLog()
  }
  openFirst() {
    this.menu.toggle();
  }

  ngOnInit() {
  }

  async goTo(key: string) {
    await this.loadLog()
    let id = this.logueo.id;
    let page;
    switch (key) {
      case "registro-usuario":
        page = `/registro-usuario/${id}`;
        break;
      case "nueva-reserva":
        page = `/crud-gestionar-reserva/0/crear`;
        break;
      case "unirse-reserva":
        page = `/unirse-gestionar-reserva`;
        break;
      // case "realizar-pedido":
      //   page = `/ver-qr-reserva/1`;
      //   break;
      case "realizar-pedido":
        page = `/seleccion-comensal/1`;
        break;
      case "search-gestionar-reserva":
        page = `/search-gestionar-reserva`;
        break;
      // case 'realizar-pedido':
      //   page = `/realizar-pedido`;
      //   break;
      
      case "catalogo":
        page = `/catalogo`;
        break;
      //MOZO
      case "consultar-salon":
        page = `/consultar-salon`;
        break;
      case "generar-estadia":
        page = `/`;
        break;
      case "pedidos a enviar":
        page = `/pedidos-a-enviar`;
        break;
      case "confirmar-reserva":
        page = `/`;
        break;
      case "entregar-pedido":
        page = `/`;
        break;
    }
    this.navController.navigateForward(page);
  }

  async loadLog() {
    await this.storage.getCurrentUsuario()
      .then(async logs => {
        this.logueo = logs;
        this.currentUsuario = await logs['rolUsuario'];
        if (!logs) {
          console.log('ERRORR')
        }
      })
  }
}
