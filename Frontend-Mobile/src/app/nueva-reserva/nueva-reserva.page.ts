import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { EnvioReservaService } from '../services/envio-reserva/envio-reserva.service'
import { UsuarioService } from '../services/usuario/usuario.service';


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
  private mensajeExistenciaUsuario: string = null;
  private existenciaUsuario: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private navController: NavController,
    private envioReservaService: EnvioReservaService,
    private usuarioservicio: UsuarioService,
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
    this.setValidatorsHours();
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
  }

  validarExistenciaUsuario(){
    console.log("Validar Existencia")
    const cuit = this.form2.value.idUsuario;
    if (cuit != null) {
      this.usuarioservicio.validarExistenciaUsuario( cuit )
      .then( (res) => {
        if (res.tipo == 2) {
          this.existenciaUsuario = true;
          this.comensal = {
            aliasComensal: this.form2.value.aliasComensal,
            edadComensal: this.form2.value.edadComensal,
            idUsuario: this.form2.value.idUsuario
          }
          this.comensales.push(this.comensal);
          this.resetComensal();
        } else {
          this.existenciaUsuario = false;
          this.mensajeExistenciaUsuario = res.descripcion;
          this.form2.controls.idUsuario.setErrors({pattern: true});
          this.form2.markAsTouched();
        }
      });
    } else {
      this.comensal = {
        aliasComensal: this.form2.value.aliasComensal,
        edadComensal: this.form2.value.edadComensal,
        idUsuario: this.form2.value.idUsuario
      }
      this.comensales.push(this.comensal);
      this.resetComensal();
    }
  }

  nuevoComensal() {
    this.validarExistenciaUsuario();
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

  setValidatorsHours() {
    this.form.get('horaEntrada').valueChanges
      .subscribe( respuesta => {
        const horaSalida = this.form.get('horaSalida').value || 0;
        const nuevaHoraEntrada = respuesta;
        if (  horaSalida < ( this.addTimes(nuevaHoraEntrada , '00:15') )) {
          this.form.controls.horaEntrada.setErrors({pattern: true});
        } else {
          this.form.controls.horaEntrada.setErrors(null);
          this.form.controls.horaSalida.setErrors(null);
        }
    });
    this.form.get('horaSalida').valueChanges
    .subscribe( respuesta => {
      const horaEntrada = this.form.get('horaEntrada').value || 0;
      const nuevaHoraSalida = respuesta;
      if ( this.addTimes(horaEntrada , '00:15') > nuevaHoraSalida ) {
        this.form.controls.horaSalida.setErrors({pattern: true});
      } else {
        this.form.controls.horaSalida.setErrors(null);
        this.form.controls.horaEntrada.setErrors(null);
      }
    });
  }


  addTimes(startTime, endTime) {
    var times = [ 0, 0, 0 ]
    var max = times.length
    var a = (startTime || '').split(':')
    var b = (endTime || '').split(':')
    // normalize time values
    for (var i = 0; i < max; i++) {
      a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
      b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
    }
    // store time values
    for (var i = 0; i < max; i++) {
      times[i] = a[i] + b[i]
    }
    var hours = times[0]
    var minutes = times[1]
    var seconds = times[2]
    if (seconds >= 60) {
      var m = (seconds / 60) << 0
      minutes += m
      seconds -= 60 * m
    }
    if (minutes >= 60) {
      var h = (minutes / 60) << 0
      hours += h
      minutes -= 60 * h
    }
    // return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2)
    return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) 
  }
}

export interface Comensal {
  aliasComensal: string;
  edadComensal: number;
  idUsuario: number
}