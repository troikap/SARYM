import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { StorageService, Log } from '../services/storage/storage.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private logueo: Log;
  private currentUsuario: string;
  selectOption;

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
    private navController: NavController,
    private alertController: AlertController,
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
        page = `/seleccion-comensal/reserva/1`;
        break;
      case "search-gestionar-reserva":
        // page = `/search-gestionar-reserva`;
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
        page = `/generar-estadia`;
        break;
        case "finalizar-estadia":
          page = `/`;
          break;
      case "pedidos a enviar":
        page = `/pedidos-a-enviar`;
        break;
      case "confirmar-reserva":
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

  seleccionarMis(){
    this.ConfirmMisEstadiaReserva();
  }

  async ConfirmMisEstadiaReserva() {
    const alert = await this.alertController.create({
      header: 'Seleccione una Respuesta',
      buttons: [
        {
          text: 'Volver',
          role: 'cancel',
          cssClass: 'secondary',
        }, 
        {
          text: 'Ver mis Reservas',
          handler: () => {
            this.navController.navigateForward('/search-gestionar-reserva');
          }
        },
        {
          text: 'Ver mi Estadia Actual',
          handler: () => {
            this.navController.navigateForward('/search-gestionar-estadia');
          }
        }
      ],
      cssClass: 'alertPrimaryModificado'
    });
    await alert.present();
    return 'hola'
  }
}
