import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { ReservaService } from '../../../services/reserva/reserva.service';
import { MesaService } from '../../../services/mesa/mesa.service';
import { StorageService, Log } from '../../../services/storage/storage.service';
import { Mesa } from '../../../services/mesa/mesa.model';
import { ActivatedRoute } from '@angular/router';
import { Reserva, Comensal, Estadia } from 'src/app/models/modelos';
import { TratarFechaProvider } from '../../../providers/tratarFecha.provider';
import { AlertService } from '../../../providers/alert.service';
import { ToastService } from '../../../providers/toast.service';
import { LoaderService } from '../../../providers/loader.service';

@Component({
  selector: 'app-crud-generar-estadia',
  templateUrl: './crud-generar-estadia.page.html',
  styleUrls: ['./crud-generar-estadia.page.scss'],
})
export class CrudGenerarEstadiaPage implements OnInit {
  
  private form: FormGroup;
  private form2: FormGroup;
  private comensal: Comensal;
  private comensales: Comensal[] = [];
  private mensajeExistenciaUsuario: string = null;
  private existenciaUsuario: boolean = false;
  private currentUsuario;
  private mesas: Mesa[];
  checkBoxList = [];
  private fechaDesde;
  private fechaHasta;
  public accionGet;
  private idReserva = 0;
  private idEstadia = 0;
  private reserva: Reserva;
  private estadia: Estadia;
  private newForm = {};
  private origenDatos;

  constructor(
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private navController: NavController,
    private usuarioservicio: UsuarioService,
    private storage: StorageService,
    private reservaservicio: ReservaService,
    private mesaservicio: MesaService,
    private activatedRoute: ActivatedRoute,
    private tratarFechaProvider: TratarFechaProvider,
    private alertService: AlertService,
    private toastService: ToastService,
    private loaderService: LoaderService
  ) { 
    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);
      this.accionGet  = params.accion;
      this.origenDatos = params.tipo;
      if (this.origenDatos == "confReserva") { //Confirmar Reserva
        this.idReserva = params.id;
      }
      else if (this.origenDatos == "estadia") {
        this.idEstadia = params.id;
      }
      
      this.traerMesas();
    });
  }

  ngOnInit() {
    this.tratarFecha();
  }

  traerMesas(){
    this.mesaservicio.getMesas()
    .then(  resp => {
      this.mesas =  resp['data'];
      for (let mesa of  resp['data']) {
        this.checkBoxList.push({ 
          'value': mesa.idMesa,
          'descripcion': `Mesa: N° ${mesa.nroMesa} - Cap: ${mesa.capacidadMesa}p - Sec: ${mesa.sector.nombreSector}`,
          'isChecked': false
        })
      }
      if (this.accionGet == "crear") {
        console.log("CREANDO")
        this.resetComensal();
        this.setValidatorsHours();
      }
      else if (this.accionGet == "editar") {
        console.log("EDITANDO");
        if (this.origenDatos == "confReserva") {
          this.traerReserva();
        }
        else {
          this.traerEstadia();
        }
        this.resetComensal();
      }
    })
  }

  traerReserva() {
    console.log("Funcion 'traerReserva()', ejecutada");
    if (this.idReserva !== 0) {
      this.reservaservicio.getReserva(this.idReserva)
      .then( res => {
        console.log("Reserva obtenida: ", res)
        if ( res['tipo'] == 2) {
          console.log("No se pudo obtener Reserva con id Nro ", this.idReserva);
        } else {
          // Reserva
          this.reserva = res;
          console.log("TrearReserva: ", this.reserva);
          let edadUsrLogueado;

          // Comensales
          let comensal;
          console.log("COMENSALES" , res.comensals)
          for (let i = 0; i < res.comensals.length; i++) {
            if (i == 0) {
              edadUsrLogueado = res.comensals[i].edadComensal;
            }
            comensal = {};
            comensal = res.comensals[i];
            if (res.comensals[i].usuario) {
              comensal['cuitUsuario'] = res.comensals[i].usuario.cuitUsuario;
            }
            this.comensales.push(comensal);
          }
          // Fechas
          let horaEntradaReserva = this.reserva.horaEntradaReserva;
          let horaSalidaReserva = this.reserva.horaSalidaReserva;
          let horaEntradaCortada =  String(horaEntradaReserva).slice(0,5);
          let horaSalidaCortada =  String(horaSalidaReserva).slice(0,5);
          this.newForm = {
            edadComensal: edadUsrLogueado,
            fechaReserva: this.reserva.fechaReserva, 
            horaEntrada: String(horaEntradaCortada),
            horaSalida: String(horaSalidaCortada),
            cantidadComensal: this.reserva.cantPersonas,
            idMesa: null     
          }
          this.form.setValue(this.newForm)
          // Mesas
          let cuenta = 0;
          let valid = false;
          for (let element of this.checkBoxList ) {
            for (let item of res.detallereservamesas) {
              if ( item.idMesa == element.value ) {
                this.checkBoxList[cuenta].isChecked = true;
                this.checkBoxList[cuenta].idDetalleReservaMesa = item.idDetalleReservaMesa;
                valid = true;
              }
            }
            cuenta += 1;
          }
          if (valid) {
            this.form.controls.idMesa.setValue(true)
          } else {
            this.form.controls.idMesa.setValue(null)
          }
        }
        this.setValidatorsHours();
      });
    }
  }

  traerEstadia() {
    console.log("Funcion 'traerEstadia()', ejecutada");
    if (this. idEstadia !== 0) {
      console.log("Tengo Estadia id: ", this. idEstadia);
      
    }
  }

  resetComensal() {
    this.form2 = this.formBuilder.group({
      aliasComensal: ['', Validators.required],
      edadComensal: [null, Validators.required],
      cuitUsuario: [null]
    });
    this.comensal = {
      aliasComensal: '',
      edadComensal: null,
      cuitUsuario: null,
      idUsuario: null
    }
  }

  setValidatorsHours() {
    this.form.get('horaEntrada').valueChanges
      .subscribe( respuesta => {
        const horaSalida = this.form.get('horaSalida').value || 0;
        const nuevaHoraEntrada = respuesta;
        let horaSalidaTratado = this.tratarFechaProvider.traerTime(horaSalida)
        let horaEntradaTratado = this.tratarFechaProvider.traerTime(nuevaHoraEntrada)
        if (  horaSalidaTratado < ( this.addTimes(horaEntradaTratado , '00:30') )) {
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
      let horaSalidaTratado = this.tratarFechaProvider.traerTime(nuevaHoraSalida)
      let horaEntradaTratado = this.tratarFechaProvider.traerTime(horaEntrada)
      if ( this.addTimes(horaEntradaTratado , '00:30') > horaSalidaTratado ) {
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
    var a = ( startTime || '').split(':')
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
    return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) 
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

}
