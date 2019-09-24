import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { EnvioReservaService } from '../services/envio-reserva/envio-reserva.service'

@Component({
  selector: 'app-nueva-reserva',
  templateUrl: './nueva-reserva.page.html',
  styleUrls: ['./nueva-reserva.page.scss'],
})
export class NuevaReservaPage implements OnInit {

  private form: FormGroup;
  private form2: FormGroup;
  private fechaDesde;
  private fechaHasta;
  private comensal: Comensal;
  private comensales: Comensal[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private navController: NavController,
    private envioReservaService: EnvioReservaService
  ) {
    this.form = this.formBuilder.group({
      fechaReserva: ['2019-09-23', Validators.required],
      horaEntrada: ['22:50', Validators.required],
      horaSalida: ['23:30', Validators.required],
      cantidadComensal: ['12', Validators.required],
      sector: ['3', Validators.required],
      nroMesa: ['2', Validators.required]
    });
    this.resetComensal();
   }

  ngOnInit() {
    this.tratarFecha();
  }

  tratarFecha(){
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let mm2 = date.getMonth() + 1 + 5;
    let yy = date.getFullYear();
    let dia;
    let mes;
    let mes2;
    let año;
    if (mm2 > 12) {
      mm2 = mm2 - 12;
      año = yy + 1;
    }
    if ((dd >= 0) && (dd < 10)) {  
      dia = "0" + String(dd);
    } else {
      dia = dd;
    }
    if ((mm >= 0) && (mm < 10)) {  
      mes = "0" + String(mm);
    } else {
      mes = mm;
    }
    if ((mm2 >= 0) && (mm2 < 10)) {  
      mes2 = "0" + String(mm2);
    } else {
      mes2 = mm2;
    }
    this.fechaDesde = `${yy}-${mes}-${dia}`;
    this.fechaHasta = `${año}-${mes2}-${dia}`;
    console.log( `Desde ${this.fechaDesde} hasta ${this.fechaHasta}`)
  }

  nuevoComensal() {
    this.comensal = {
      aliasComensal: this.form2.value.aliasComensal,
      edadComensal: this.form2.value.edadComensal,
      idUsuario: this.form2.value.idUsuario
    }
    this.comensales.push(this.comensal);
    this.resetComensal();
  }

  resetComensal() {
    this.form2 = this.formBuilder.group({
      aliasComensal: ['', Validators.required],
      edadComensal: [null, Validators.required],
      idUsuario: [null]
    });
    this.comensal = {
      aliasComensal: '',
      edadComensal: null,
      idUsuario: null
    }
  }

  eliminarComensal( num: number){
    console.log("numero : ", num)
    this.comensales.splice(num,1);
  }

  crearReserva() {
    const reserva = {
      fechaReserva: this.form.value['fechaReserva'],
      horaEntrada: this.form.value['horaEntrada'],
      horaSalida: this.form.value['horaSalida'],
      cantidadComensal: this.form.value['cantidadComensal'],
      sector: this.form.value['sector'],
      nroMesa: this.form.value['nroMesa'],
      comensales: this.comensales,
      idTraidoBackEnd: 23231
    }
    console.log('Reserva', reserva)
    this.presentToast(reserva);
    this.envioReservaService.sendObjectSource(reserva);
    this.navController.navigateForward('/reserva' );
  }

  async presentToast( reserva ) {
      const toast = await this.toastController.create({
        message: `Reserva Creada Satisfactoriamente. N° ${reserva.idTraidoBackEnd}`,
        duration: 3000,
        color: 'success',
        position: 'middle',
        translucent: true
      });
      toast.present();
  }

}

export interface Comensal {
  aliasComensal: string;
  edadComensal: number;
  idUsuario: number
}