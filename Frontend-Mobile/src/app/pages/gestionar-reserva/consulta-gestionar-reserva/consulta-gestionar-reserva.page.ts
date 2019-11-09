import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, AlertController } from '@ionic/angular';
import { ReservaService } from 'src/app/services/reserva/reserva.service';
import { MesaService } from 'src/app/services/mesa/mesa.service';
import { ActivatedRoute } from '@angular/router';
import { Reserva, Comensal, Mesa } from 'src/app/models/modelos';


@Component({
  selector: 'app-consulta-gestionar-reserva',
  templateUrl: './consulta-gestionar-reserva.page.html',
  styleUrls: ['./consulta-gestionar-reserva.page.scss'],
})
export class ConsultaGestionarReservaPage implements OnInit {
  
  public reserva: Reserva;
  public idReserva = 0;
  
  public comensales: Comensal[] = [];
  public mesas: Mesa[];

  constructor(
    private toastController: ToastController,
    private navController: NavController,
    private reservaservicio: ReservaService,
    private mesaservicio: MesaService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) {
    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);
      this.idReserva = params.id;
    });

   }

  ngOnInit() {
    this.traerMesas();
  }
  
  async traerMesas(){
    await this.mesaservicio.getMesas()
    .then(  resp => {
      this.mesas =  resp['data'];
      
      console.log("traerMesas: ", this.mesas );

      this.traerReserva();
    })
  }

  async traerReserva() {
    console.log("Funcion 'traerReserva()', ejecutada");
    if (this.idReserva !== 0) {
      await this.reservaservicio.getReserva(this.idReserva)
      .then( res => {
        console.log("Reserva obtenida: ", res)
        if ( res['tipo'] == 2) {
          console.log("No se pudo obtener Reserva con id Nro ", this.idReserva);
        } else {
          // Reserva
          this.reserva = res;
          console.log("TrearReserva: ", this.reserva);

          let comensal;
          for (let i = 0; i < res.comensals.length; i++) {
            comensal = {};
            comensal = res.comensals[i];
            if (res.comensals[i].usuario) {
              comensal['cuitUsuario'] = res.comensals[i].usuario.cuitUsuario;
            }
            this.comensales.push(comensal);
          }

          console.log("Comensales de la reserva: ", this.comensales);

        }
      });
    }
  }

  editarReserva() {
    console.log("Editar Reserva");
    this.navController.navigateRoot(['/crud-gestionar-reserva', this.idReserva, 'editar' ]);
  }

  anularReserva() {
    console.log("Anular Reserva");

    let pTituloConfirm = "Anular Reserva";
    let pMensajeConfirm = "¿Desea anular la reserva seleccionada?<br>Si continúa no podrá revertir los cambios.";
    this.Confirm(pTituloConfirm, pMensajeConfirm);
  }

  verQrReserva() {
    console.log("Ver QR Reserva");
    this.navController.navigateRoot(['/ver-qr-reserva', this.idReserva ]);
  }

  getDTOCambioEstadoEliminarReserva() {
    console.log("Funcion 'getDTOCambioEstadoEliminarReserva()', ejecutada");

    let dtoAnularReserva: any = {
      idReserva: this.idReserva,
      idEstadoReserva: "2", //ANULAR
      descripcionReservaEstado:  "Anulada por el Cliente",
    }
    return dtoAnularReserva;
  }

  async Confirm(pTitulo: string, pMensaje: string) {
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
            let dtoAnularReserva = this.getDTOCambioEstadoEliminarReserva();
            this.reservaservicio.cambiarEstado(dtoAnularReserva)
            .then( resp => {
              console.log("Respuesta Anular Reserva: ",resp)

              if (resp.tipo != 2) {
                this.toastSuccess("Se ha anulado correctamente la reserva seleccionada");
                setTimeout(()=>{
                  this.navController.navigateRoot(['/search-gestionar-reserva']);
                 }, 3000);
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
