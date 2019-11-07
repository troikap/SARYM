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

  parametro;
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
    this.activatedRoute.params
      .subscribe(params => {
        console.log("PARAMETROS ", params)
        this.parametro = params.idReserva;
      })
      this.traerReserva();
  }

  traerReserva(){
    this.reservaservicio.getReserva( this.parametro )
    .then( reserva => {
      console.log("RESERVA ", reserva)
      this.reserva = reserva;
      console.log("Comensales" ,reserva.comensals)
      this.comensales = reserva.comensals
    })

  }

}
