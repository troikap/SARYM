// import * as $ from 'jquery'
import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../../services/reserva/reserva.service';
import { StorageService } from '../../../services/storage/storage.service';
import { NavController,  AlertController, ToastController } from '@ionic/angular';
import { ToastService } from 'src/app/providers/toast.service';
import { MesaService } from 'src/app/services/mesa/mesa.service';

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
  private mesasReserva = [];

  constructor(
    private reservaService: ReservaService,
    private storage: StorageService,
    private navController: NavController,
    private alertController: AlertController,
    public toastController: ToastController,
    private toastService: ToastService,
    private mesaservicio: MesaService
  ) { 
    this.loadCurrentUsuario();
  }

  ngOnInit() {
  }

  goBack() {
    this.navController.navigateRoot('/home');
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

  async loadCurrentUsuario() {
    await this.storage.getCurrentUsuario()
    .then(async (data) => {
      this.currentUsuario = data;
      this.nombreUsuario = this.currentUsuario.rolUsuario;
      this.idUsuarioLogueado =  this.currentUsuario.id; //Si this.idUsuarioLogueado == -1, es usuario invitado
      await this.getReservasStorage(false);
      await this.getReservasUsrLogueado();
      console.log("this.listaReservas: ", this.listaReservas);
    });
  }

  async getReservasUsrLogueado() {
    if (this.idUsuarioLogueado !== -1) { // Si NO es Usuario Invitado
      await this.reservaService.getReservasPorUsuario(this.idUsuarioLogueado)
      .then(async (res: any) => {
        console.log("res: ", res);
        for (let item of res.detalles) {
          console.log("item: ", item);
          if(item.tipo != 2) {
            let elementosReserva = {};
            elementosReserva['idReserva'] = item.data.idReserva;
            elementosReserva['cantPersonas'] = item.cantPersonas;
            elementosReserva['fechaReserva'] = item.data.fechaReserva;
            elementosReserva['horaEntradaReserva'] = item.data.horaEntradaReserva;
            elementosReserva['horaSalidaReserva'] = item.data.horaSalidaReserva;
            elementosReserva['idEstadoReserva'] = item.data.reservaestados[0].estadoreserva.idEstadoReserva;
            elementosReserva['propietario'] = "1";
            this.listaReservas.push(elementosReserva);
          }
        } 
      })
    }
    else {
      await this.getReservasStorage(true);
    }
  }
  
  async getReservasStorage(esUsrInvitado) {
    let idReserva = null;
    await this.storage.getOneObject("reserva")
    .then(async (res: any) => {
      if (res != null && res != "") {
        idReserva = res.idReservaEstadia;
        await this.reservaService.getReserva(idReserva)
        .then((res: any) => {
          if (esUsrInvitado) {
            this.reservaInvitado =  res;
            this.traeReservasInvitado = true;
          }
          else {
            console.log("paso-------------");
            let elementosReserva = {};
            elementosReserva['idReserva'] = res.idReserva;
            elementosReserva['cantPersonas'] = res.cantPersonas;
            elementosReserva['fechaReserva'] = res.fechaReserva;
            elementosReserva['horaEntradaReserva'] = res.horaEntradaReserva;
            elementosReserva['horaSalidaReserva'] = res.horaSalidaReserva;
            elementosReserva['idEstadoReserva'] = res.reservaestados[0].estadoreserva.idEstadoReserva;
            elementosReserva['propietario'] = "0";
            this.listaReservas.push(elementosReserva);
          }
        })
      }
      else {
        console.log("sin reserva Invitado");
      }
    });
  }

  realizarPedido(idReserva) {
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

  unirseReserva() {
    console.log("unirseReserva");
    this.navController.navigateForward(['/unirse-reserva-estadia' ]);
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
            .then(async resp => {
              if ( resp && resp.tipo != 2) {

                await this.cambiarEstadoMesas(pIdReserva);

                this.toastSuccess("Se ha anulado correctamente la reserva seleccionada");
                this.getReservasUsrLogueado();
              }
              else {
                this.toastError(resp.title);
              }
            })
          }
        }
      ],
      cssClass: 'alertPrimary'
    });

    await alert.present();
  }

  async cambiarEstadoMesas(idReserva){
    await this.reservaService.getReserva(idReserva)
    .then(async res => {
      for (let item of res.detallereservamesas) {
        let pathMesa = {}
        pathMesa['idMesa'] = item['mesa'].idMesa;
        pathMesa['idEstadoMesa'] = 2;
        await this.mesaservicio.cambiarEstado(pathMesa)
        .then(respo2 => {});
      }
    })
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
