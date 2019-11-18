import { Component, OnInit } from '@angular/core';
import { EstadiaService } from '../../../services/estadia/estadia.service';
import { StorageService } from '../../../services/storage/storage.service';
import { NavController,  AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-search-gestionar-estadia',
  templateUrl: './search-gestionar-estadia.page.html',
  styleUrls: ['./search-gestionar-estadia.page.scss'],
})
export class SearchGestionarEstadiaPage implements OnInit {

  public estadia;
  private currentUsuario;
  private idUsuarioLogueado: number;
  private createdCode;

  constructor(
    private estadiaService: EstadiaService,
    private storage: StorageService,
    private navController: NavController,
    private alertController: AlertController,
    public toastController: ToastController
  ) { 
    this.loadCurrentUsuario();
  }

  ngOnInit() {
  }

  loadCurrentUsuario() {
    this.storage.getCurrentUsuario().then((data) => {
      if ( data ) {
        this.currentUsuario = data;
        this.idUsuarioLogueado =  this.currentUsuario.id;
        this.getEstadiaUsrLogueado();
      } else {
        console.log("NO ES USUARIO")
      }
    });
  }

  createCode() {
    console.log('Creando QR');
    this.createdCode = btoa( this.estadia.tokenEstadia );
  }

  getEstadiaUsrLogueado() {
    this.estadiaService.getEstadiasPorUsuario(this.idUsuarioLogueado)
      .then((res: any) => {
        console.log("getEstadiaUsrLogueado", res);
        this.estadia =  res.data;
        this.createCode();
      })
  }

  realizarPedido(item) {
    let idReserva = item.data.idReserva;
    this.navController.navigateForward([`/seleccion-comensal/reserva/${idReserva}`])
  }

  unirseEstadia() {
    console.log("crearReserva");
    this.navController.navigateForward(['/unirse-gestionar-reserva' ]);
  }

  consultaEstadia( idEstadia: number) {
    console.log("Consultar Estadia", idEstadia);
    this.navController.navigateForward(['/consulta-gestionar-estadia', idEstadia ]);
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
            // let dtoAnularReserva = this.getDTOCambioEstadoEliminarReserva(pIdReserva);
            // this.reservaService.cambiarEstado(dtoAnularReserva)
            // .then( resp => {
            //   console.log("Respuesta Anular Reserva: ",resp)

            //   if (resp.tipo != 2) {
            //     this.toastSuccess("Se ha anulado correctamente la reserva seleccionada");
            //     this.getEstadiaUsrLogueado();
            //   }
            //   else {
            //     this.toastError(resp.title);
            //   }
            // })
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
