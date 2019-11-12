import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../services/storage/storage.service';
import { ReservaService } from '../../../services/reserva/reserva.service';
import { Reserva, Comensal } from 'src/app/models/modelos';
import { ToastService } from '../../../providers/toast.service';

@Component({
  selector: 'app-seleccion-comensal',
  templateUrl: './seleccion-comensal.page.html',
  styleUrls: ['./seleccion-comensal.page.scss'],
})
export class SeleccionComensalPage implements OnInit {

  idReserva;
  reserva: Reserva;
  comensales: Comensal[];
  modificarComensal = false;

  constructor(
    private alertController: AlertController,
    private navController: NavController,
    public activatedRoute: ActivatedRoute,
    private storage: StorageService,
    private reservaservicio: ReservaService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    console.log("PAGE SeleccionComensalPage")
    this.limpiarComensalStorage()
    if (!this.idReserva) {
      this.activatedRoute.params
        .subscribe(params => {
          this.idReserva = params.idReserva;
          this.traerComensalReservaStorage();
        }).unsubscribe();
        this.traerReserva();
    }
  }

  ionViewWillEnter(){
  }

  ionViewDidEnter(){
  }

  ionViewWillLeave(){
  }

  ionViewDidLeave(){
  }
  ngOnDestroy() {

  }

  limpiarComensalStorage(){
    this.storage.validarComensal().then((respuesta) => {
      console.log("Limpiando Comensales Reserva", respuesta)
      if(respuesta) {
        respuesta.forEach(element => {
          if(element.vencida) {
            let data: {} = {idReserva: element.idReserva,
              idEstadoReserva: 2,
              descripcionReservaEstado: `Por Vencimiento, eliminado desde Comensal ${element.idComensal}.`}
            this.reservaservicio.cambiarEstado(data)
            .then( resp => {
              if(resp.tipo == 1){
                this.toastService.toastError( `Reserva N° ${element.idReserva} Anulada por vencimiento.`,3000,'bottom')
              } else {
                this.toastService.toastWarning( `Reserva N° ${element.idReserva} Anulada por vencimiento.`,3000,'bottom')
              }
            })
          }
        });
      }
    })
  }

  traerComensalReservaStorage(){
    if(!this.modificarComensal){
      this.storage.getComensales().then((respuesta) => {
        console.log("Trayendo Comensales Reserva", respuesta)
        respuesta.forEach(element => {
          if(element.idReserva == this.idReserva){
            this.modificarComensal = true;
            this.navController.navigateForward([`/lista-pedido/reserva/${this.idReserva}/comensal/${element.idComensal}`])
          }
        });
      })
    }
  }

  traerReserva(){
    this.reservaservicio.getReserva( this.idReserva )
    .then( reserva => {
      console.log("RESERVA ", reserva)
      this.reserva = reserva;
      console.log("Comensales" ,reserva.comensals)
      this.comensales = reserva.comensals
    })
  }

  seleccionarComensal( item ) {
    this.confirmacionComensal( item );
  }

  async guardarComensal( item ) {
    let comensal = { 
      idComensal: item.idComensal, 
      idReserva: this.reserva.idReserva , 
      fechaReserva: this.reserva.fechaReserva, 
      horaEntradaReserva: this.reserva.horaEntradaReserva 
    }
    await this.storage.addComensal( comensal )
  }

  async confirmacionComensal( item ) {
    const alert = await this.alertController.create({
      header: 'Desea asociarse?',
      message: `Quiere realizar pedidos con este Comensal?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Asociarme',
          handler: () => {
            console.log('Asociando');
            this.guardarComensal(item);
            this.navController.navigateForward([`/lista-pedido/reserva/${this.idReserva}/comensal/${item.idComensal}`])
          }
        }
      ],
      cssClass: 'alert',
    });
    await alert.present();
  } 

  eliminarComensal() {
    console.log("ELIMINADN COMENSAL")
  }

  crearComensal() {
    console.log("CREANDO COMENSAL")
  }

}
