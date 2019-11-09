// import * as $ from 'jquery'
import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../../services/reserva/reserva.service';
import { StorageService } from '../../../services/storage/storage.service';
import { NavController,  AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-search-gestionar-reserva',
  templateUrl: './search-gestionar-reserva.page.html',
  styleUrls: ['./search-gestionar-reserva.page.scss'],
})
export class SearchGestionarReservaPage implements OnInit {
  
  public listaReservas: any [] = [];
  private currentUsuario;
  private idUsuarioLogueado: number;

  constructor(
    private reservaService: ReservaService,
    private storage: StorageService,
    private navController: NavController,
    private alertController: AlertController,
    public toastController: ToastController
  ) { 
    this.loadCurrentUsuario();
  }

  ngOnInit() {
    //this.getAllElements();
    // this.cargarOnFocus();
  }

  // cargarOnFocus() {
  //   $("#botonBuscar").focus();
  // }

  loadCurrentUsuario() {
    this.storage.getCurrentUsuario().then((data) => {
      this.currentUsuario = data;
      console.log("USUARIO ", this.currentUsuario);
      this.idUsuarioLogueado =  this.currentUsuario.id;
      this.getReservasUsrLogueado();
    });
  }

  getReservasUsrLogueado() {
    this.reservaService.getReservasPorUsuario(this.idUsuarioLogueado)
      .then((res: any) => {
        console.log("getReservasUsrLogueado", res);
        this.listaReservas =  res;
      })
  }

  crearReserva() {
    console.log("crearReserva");
    this.navController.navigateRoot(['/crud-gestionar-reserva', 0, 'crear' ]);
  }

  consultarReserva(pIdReserva: number) {
    console.log("Consultar Reserva", pIdReserva);
    this.navController.navigateRoot(['/consulta-gestionar-reserva', pIdReserva ]);

  }

  editarReserva(pIdReserva: number) {
    console.log("Editar Reserva", pIdReserva);
    this.navController.navigateRoot(['/crud-gestionar-reserva', pIdReserva, 'editar' ]);
  }

  anularReserva(pIdReserva: number) {
    console.log("Anular Reserva", pIdReserva);

    let pTituloConfirm = "Anular Reserva";
    let pMensajeConfirm = "¿Desea anular la reserva seleccionada?<br>Si continúa no podrá revertir los cambios.";
    this.Confirm(pTituloConfirm, pMensajeConfirm, pIdReserva);
  }

  verQrReserva(pIdReserva: number) {
    console.log("Ver QR Reserva", pIdReserva);
    this.navController.navigateRoot(['/ver-qr-reserva', pIdReserva ]);
  }

  getDTOCambioEstadoEliminarReserva(idReservaParam: number) {
    console.log("Funcion 'getDTOCambioEstadoEliminarReserva()', ejecutada");

    let dtoAnularReserva: any = {
      idReserva: idReservaParam,
      idEstadoReserva: "2", //ANULAR
      descripcionReservaEstado:  "Anulada por el Cliente",
    }
    return dtoAnularReserva;
  }

  async Confirm(pTitulo: string, pMensaje: string, pIdReserva: number) {
    const alert = await this.alertController.create({
      header: pTitulo,
      message: pMensaje,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelado');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            console.log('Anular Reserva');
            let dtoAnularReserva = this.getDTOCambioEstadoEliminarReserva(pIdReserva);
            this.reservaService.cambiarEstado(dtoAnularReserva)
            .then( resp => {
              console.log("Respuesta Anular Reserva: ",resp)

              if (resp.tipo != 2) {
                this.toastSuccess("Se ha anulado correctamente la reserva seleccionada");
                this.getReservasUsrLogueado();
                // setTimeout(()=>{
                //   location.reload();
                //  }, 3000);
              }
              else {
                this.toastError(resp.title);
              }
            })
          }
        }
      ]
    });

    await alert.present();
  }

  async toastSuccess(pMensaje: string) {
    const toast = await this.toastController.create({
      message: pMensaje,
      duration: 3000,
      color: 'success',
      position: 'middle',
      translucent: true
    });
    toast.present();
  }

  async toastError(pMensaje: string) {
    const toast = await this.toastController.create({
      message: pMensaje,
      duration: 3000,
      color: 'danger',
      position: 'middle',
      translucent: true
    });
    toast.present();
  }

  // botonBuscar(termino: any) {
  //   console.log("botonBuscar: ", termino);
  //   if (termino.trim() !== "") {
  //     this.reservaService.getProductosByAll(termino)
  //     .subscribe((data: any) => { // Llamo a un Observer
  //       console.log(data);
  //       if (data != null) {
  //         console.log("RESULT ----------------->", data);
  //         this.listaReservas = data;
  //       }
  //       else {
  //         this.listaReservas = [];
  //       }
  //     });
  //   }
  //   else {
  //     this.getReservasUsrLogueado();
  //   }
  // }

}
