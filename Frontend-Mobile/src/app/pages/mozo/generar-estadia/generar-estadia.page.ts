import { Component, OnInit } from '@angular/core';
import { MesaService } from '../../../services/mesa/mesa.service';
import { Mesa } from '../../../services/mesa/mesa.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-generar-estadia',
  templateUrl: './generar-estadia.page.html',
  styleUrls: ['./generar-estadia.page.scss'],
})
export class GenerarEstadiaPage implements OnInit {


  public accionGet;
  private mesas: Mesa[];
  checkBoxList = [];

  constructor(    
    private mesaservicio: MesaService,
    public navController: NavController
    ) { }

  ngOnInit() {
  }

  mostrarMesas() {
    this.navController.navigateForward('mostrar-mesas');
  }

  traerMesas(){ 
    this.mesaservicio.getMesas()
    .then(  resp => {
      console.log("respuestaaa", resp)
      this.mesas =  resp['data'];
      for (let mesa of  resp['data']) {
        this.checkBoxList.push({ 
          'value': mesa.idMesa,
          'descripcion': `Mesa: N° ${mesa.nroMesa} - Cap: ${mesa.capacidadMesa}p - Sec: ${mesa.sector.nombreSector}`,
          'isChecked': false
        })
        console.log("MESASASADASDAS", this.checkBoxList)
      }
      /*
      console.log("traerMesas: ", this.checkBoxList);
      if (this.accionGet == "crear") {
        console.log("CREANDO")
        this.resetComensal();
        this.setValidatorsHours();
      }
      else if (this.accionGet == "editar") {
        console.log("EDITANDO")
        this.traerReserva();
        this.resetComensal();
      }
      */
    })
    
  }
}
