import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { StorageService, Log } from '../services/storage/storage.service';
import { NavController, AlertController } from '@ionic/angular';
import { EstadiaService } from '../services/estadia/estadia.service';
import { ToastService } from '../providers/toast.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public logueo: Log;
  public currentUsuario: string;
  selectOption;
  public idCurrentUsuario;
  public idEstadia;

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
    private estadiaService: EstadiaService,
    private toastService: ToastService
  ) {
    this.loadLog()
  }
  openFirst() {
    this.menu.toggle();
  }

  ngOnInit() {
  }

  getEstadiaUsrLogueado() {
    this.estadiaService.getEstadiasPorUsuario(this.idCurrentUsuario)
      .then((res: any) => {
        console.log("getEstadiaUsrLogueado", res);
        this.idEstadia =  res.data.idEstadia;
      })
  }

  verListaPago() {
    this.navController.navigateForward([`/seleccion-comensal/estadia/${this.idEstadia}/edicion`])
  }

  realizarPedido() {
    if (this.idEstadia != null) {
      this.goTo('realizar-pedido');
    } else {
      this.toastService.toastWarning('Usted no se encuentra en una Estadía actualmente', 2500)
    }
  }

  async goTo(key: string) {
    // await this.loadLog()
    let id = this.logueo.id;

    if (id == -1) { //Invitado
      id = 0;
    }

    let page;
    switch (key) {
      case "registro-usuario":
        page = `/registro-usuario/${id}`;
        break;
      case "nueva-reserva":
        page = `/crud-gestionar-reserva/0/crear`;
        break;
      case "unirse-reserva":
        // page = `/unirse-gestionar-reserva`;
        page = `/unirse-reserva-estadia`;
        break;
      // case "realizar-pedido":
      //   page = `/ver-qr-reserva/1`;
      //   break;
      case "realizar-pedido":
        page = `/seleccion-comensal/estadia/${this.idEstadia}/home`;
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
        page = `/confirmar-reserva`;
        break;
    }
    this.navController.navigateForward(page);
  }

  async loadLog() {
    await this.storage.getCurrentUsuario()
      .then(async logs => {
        console.log("LOG:-----------", logs);
        this.logueo = logs;
        this.currentUsuario = await logs['rolUsuario'];
        this.idCurrentUsuario = await logs.id;
        if (!logs) {
          console.log('ERRORR')
        }
        this.getEstadiaUsrLogueado();
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
