import { Component, OnInit } from '@angular/core';
import { MesaService } from "src/app/services/mesa/mesa.service";
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-consultar-salon',
  templateUrl: './consultar-salon.page.html',
  styleUrls: ['./consultar-salon.page.scss'],
})
export class ConsultarSalonPage implements OnInit {

  constructor(
    private mesaService: MesaService,
    private navController: NavController
  ) {
    console.log("Constructor Consulta SAlon")
    this.traerMesas();
   }

  ngOnInit() {
  }

  traerMesas() {
    this.mesaService.getMesas().then( mesas => {
      console.log("MESAS TRAIDAS ", mesas)
    })
  }
}
