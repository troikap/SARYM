import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../services/storage/storage.service';
import { ReservaService } from '../../../services/reserva/reserva.service';
import { Reserva, Comensal } from 'src/app/models/modelos';

@Component({
  selector: 'app-lista-pedido',
  templateUrl: './lista-pedido.page.html',
  styleUrls: ['./lista-pedido.page.scss'],
})
export class ListaPedidoPage implements OnInit {

  idReserva;
  idComensal;
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
        this.idReserva = params.idReserva;
      })
      // this.traerReserva();
  }
}
