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
  public reservaInvitado: any = null;
  private currentUsuario = null;
  private idUsuarioLogueado: number = 0;
  public nombreUsuario = null;
  public traeReservasInvitado = false;

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
  }

  doRefresh(event) {
    
    this.resetDatos();
    this.loadCurrentUsuario();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  resetDatos() {
    this.listaReservas = [];
    this.reservaInvitado = null;
    this.currentUsuario = null;
    this.idUsuarioLogueado = 0;
    this.nombreUsuario = null;
    this.traeReservasInvitado = false;
  }

  loadCurrentUsuario() {
    this.storage.getCurrentUsuario().then((data) => {
      this.currentUsuario = data;
      this.nombreUsuario = this.currentUsuario.rolUsuario;
      this.idUsuarioLogueado =  this.currentUsuario.id; //Si this.idUsuarioLogueado == -1, es usuario invitado
      this.getReservasUsrLogueado();
    });
  }

  getReservasUsrLogueado() {
    if (this.idUsuarioLogueado !== -1) { // Si NO es Usuario Invitado
      this.reservaService.getReservasPorUsuario(this.idUsuarioLogueado)
      .then((res: any) => {
        if(res.tipo != 2) {
          this.listaReservas =  res;
        }        
      })
    }
    else {
      let idReserva = null;
      this.storage.getOneObject("reserva").then((res: any) => {
        if (res != null && res != "") {
          this.traeReservasInvitado = true;
          idReserva = res.idReservaEstadia;
          this.reservaService.getReserva(idReserva)
          .then((res: any) => {
            if(res.tipo != 2) {
              this.reservaInvitado =  res;
            }
            else {
              console.log("ERROR: ", res);
            }
          })
        }
        else {
          console.log("sin reserva Invitado");
        }
      });
    }
  }

  realizarPedido(item) {
    let idReserva = item.data.idReserva;
    this.navController.navigateForward([`/seleccion-comensal/reserva/${idReserva}/edicion`])
  }

  realizarPedidoInvitado(item) {
    let idReserva = item.idReserva;
    this.navController.navigateForward([`/seleccion-comensal/reserva/${idReserva}/edicion`])
  }

  crearReserva() {
    console.log("crearReserva");
    this.navController.navigateForward(['/crud-gestionar-reserva', 0, 'crear' ]);
  }

  consultarReserva(pIdReserva: number) {
    console.log("Consultar Reserva", pIdReserva);
    this.navController.navigateForward(['/consulta-gestionar-reserva', pIdReserva ]);

  }

  editarReserva(pIdReserva: number) {
    console.log("Editar Reserva", pIdReserva);
    this.navController.navigateForward(['/crud-gestionar-reserva', pIdReserva, 'editar' ]);
  }

  anularReserva(pIdReserva: number) {
    console.log("Anular Reserva", pIdReserva);

    let pTituloConfirm = "Anular Reserva";
    let pMensajeConfirm = "¿Desea anular la reserva seleccionada?<br>Si continúa no podrá revertir los cambios.";
    this.Confirm(pTituloConfirm, pMensajeConfirm, pIdReserva);
  }

  verQrReserva(pIdReserva: number) {
    console.log("Ver QR Reserva", pIdReserva);
    this.navController.navigateForward(['/ver-qr-reserva', pIdReserva ]);
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
              if (resp.tipo != 2) {
                this.toastSuccess("Se ha anulado correctamente la reserva seleccionada");
                this.getReservasUsrLogueado();
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
}
