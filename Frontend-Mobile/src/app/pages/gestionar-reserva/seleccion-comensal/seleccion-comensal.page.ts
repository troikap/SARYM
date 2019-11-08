import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../services/storage/storage.service';
import { ReservaService } from '../../../services/reserva/reserva.service';
import { Reserva, Comensal } from 'src/app/models/modelos';

@Component({
  selector: 'app-seleccion-comensal',
  templateUrl: './seleccion-comensal.page.html',
  styleUrls: ['./seleccion-comensal.page.scss'],
})
export class SeleccionComensalPage implements OnInit {

  idReserva;
  reserva: Reserva;
  comensales: Comensal[]

  constructor(
    private alertController: AlertController,
    private navController: NavController,
    public activatedRoute: ActivatedRoute,
    private storage: StorageService,
    private reservaservicio: ReservaService,
  ) { }

  ngOnInit() {
    console.log("PAGE SeleccionComensalPage")
    this.limpiarComensalStorage()
    this.activatedRoute.params
      .subscribe(params => {
        console.log("PARAMETROS ", params)
        this.idReserva = params.idReserva;
      })
      this.traerReserva();
  }

  limpiarComensalStorage(){
    this.storage.validarComensal().then((respuesta) => {
      console.log("Resepondiendo limpieza", respuesta)
    })
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
    console.log("ITEM ", item)
    this.confirmacionComensal( item );
  }

  async loadLog() {
    await this.storage.getCurrentUsuario()
      .then(logs => {
        // this.logueo = logs;
        // if (!logs) {
        //   console.log('ERRORR')
        // }
      })
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
            this.navController.navigateForward([`/seleccion-pedido/reserva/${this.idReserva}/comensal/${item.idComensal}`])
          }
        }
      ],
      cssClass: 'alert',
    });
    await alert.present();
  } 

}
