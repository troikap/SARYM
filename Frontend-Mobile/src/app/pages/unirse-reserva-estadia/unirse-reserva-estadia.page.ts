  import { Component, OnInit } from '@angular/core';
  import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
  import { AlertController } from '@ionic/angular';
  import { NavController } from '@ionic/angular';
  import { Router, ActivatedRoute } from '@angular/router';
  import { Comensal, Reserva } from 'src/app/models/modelos';
  import { ReservaService } from 'src/app/services/reserva/reserva.service';
  import { UsuarioService } from 'src/app/services/usuario/usuario.service';
  import { ToastService } from '../../providers/toast.service'
import { StorageService } from 'src/app/services/storage/storage.service';
import { EstadiaService } from 'src/app/services/estadia/estadia.service';
import { TratarFechaProvider } from 'src/app/providers/tratarFecha.provider';

@Component({
  selector: 'app-unirse-reserva-estadia',
  templateUrl: './unirse-reserva-estadia.page.html',
  styleUrls: ['./unirse-reserva-estadia.page.scss'],
})
export class UnirseReservaEstadiaPage implements OnInit {
  
    private datos;
    private valor;
    private qrDataCodify;
    public createdCode;
    private secretCode;
    private nameArray;
    private name;
    public mostrar: boolean = false;
    public variable: boolean = false;
    public scannedCode;
    public idReserva;
    private comensal: Comensal;
    private comensales: Comensal[] = [];
    private tokenReserva;
    private usuario;

    private rutaTipo;
    private idReservaEstadia;
    private idUsuario;
    private nombreUsuario;
    private idUsrStorage;
    private idReservaEstadiaStorage = 0;
  
    private errorRangoUsr;
    private horaActual;
    private fechaActual;

    constructor(
      private barcodeScanner: BarcodeScanner,
      private alertController: AlertController,
      private navController: NavController,
      public activatedRoute: ActivatedRoute,
      private usuarioServicio: UsuarioService,
      private toastService: ToastService,
      private storage: StorageService,
      private reservaServicio: ReservaService,
      private estadiaServicio: EstadiaService,
      private tratarFechaProvider: TratarFechaProvider
    ) { }
  
    ngOnInit() {
      this.tratarFecha();
      this.traerHoraActual();
      this.scanCode();
    }
  
    scanCode() {
      this.barcodeScanner
      .scan()
      .then(barcodeData => {
        console.log("BARCODEDATA 0" , barcodeData)
        this.qrDataCodify = barcodeData.text;
        this.presentAlert();
      })
      .catch(err => {
        console.log('Error', err);
        this.qrDataCodify = 'RVNUQURJQS0zLTE3'; // RVNUQURJQS01LTEx - RVNUQURJQS00LTEx
        this.presentAlert()
      });
    }
  
    async presentAlert() {
      console.log("this ", this.qrDataCodify)
      try {
        this.secretCode = atob( this.qrDataCodify );
      } catch(e) {
         this.secretCode = null;
         this.toastService.toastError('QR leido es incorrecto', 2000)
         this.navController.navigateBack('/home');
      }
      if (this.secretCode) {
        console.log("SECRETO ", this.secretCode)
        this.nameArray = this.secretCode.split('-');
        let tipo = this.nameArray[0];
        this.idReservaEstadia = this.nameArray[1];

        if (tipo == "RESERVA") {
          this.rutaTipo = 'reserva';
        } else if (tipo == "ESTADIA") {
          this.rutaTipo = 'estadia';
        } else {
          this.toastService.toastError('QR leido es incorrecto', 2000)
          this.navController.back();
        }
        this.idUsuario = this.nameArray[2];
        await this.traerUsuario();
        await this.traerUsuarioStorage();
        await this.traerReservaEstadiaStorage();
        
        if ((this.idUsuario != this.idUsrStorage) && (this.idReservaEstadiaStorage != this.idReservaEstadia)) { 
          console.log("ENCONTRADO ", this.secretCode)
          this.nombreUsuario = `${this.usuario.Usuario.nombreUsuario} ${this.usuario.Usuario.apellidoUsuario}`        
          const alert = await this.alertController.create(
            {
            header: 'Leyendo QR',
            message: `¿Desea Unirse a la ${this.rutaTipo} N° ${this.idReservaEstadia} de ${this.nombreUsuario}?`,
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  console.log('Confirm Cancel');
                  this.navController.navigateBack('/home');
                }
              }, {
                text: 'Unirse',
                handler: () => {
                  this.verifiarEstadoReservaEstadia();
                }
              }
            ],
            cssClass: 'alertPrimary'
          });
          await alert.present();
        }
        else { // No continuar, pues ya es Reserva o Estadía del usuario logueado
          this.toastService.toastSuccess(`Usted ya se encuentra unido a esta ${this.rutaTipo}`, 3000);
          this.navController.navigateBack('/home');
        }
      }
    }

    async verifiarEstadoReservaEstadia() {
      if (this.rutaTipo == "reserva") {
        await this.reservaServicio.getReserva(this.idReservaEstadia)
        .then(async res => {
          console.log("Reserva obtenida: ", res)
          if (res.reservaestados[0].estadoreserva.idEstadoReserva == 1) {

            await this.verificarUnionReserva(res);

            if (!this.errorRangoUsr) {
              await this.insertarReservaEstadiaComensalStorage();
              this.navController.navigateForward(`seleccion-comensal/${this.rutaTipo}/${this.idReservaEstadia}/creacion`);
            }
            else {
              this.toastService.toastError(`Ya se encuentra participando en una reserva para la misma fecha y rango horario. No es posible realizar la unión.`, 5000);
              this.navController.navigateForward([`/home`]);
            }
          }
          else {
            this.toastService.toastError(`La ${this.rutaTipo} N° ${this.idReservaEstadia} de ${this.nombreUsuario}, no se encuentra Vigente`, 3000);
            setTimeout(()=>{
              this.navController.navigateForward([`/home`]);
            }, 3000);
          }
        });
      }
      else {
        await this.estadiaServicio.getEstadia(this.idReservaEstadia)
        .then(async est => {
          console.log("Estadia obtenida: ", est)
          if (est.estadiaestados[0].estadoestadium.idEstadoEstadia == 1) {

            await this.verificarUnionEstadia(est);
            
            if (!this.errorRangoUsr) {
              await this.insertarReservaEstadiaComensalStorage();
              this.navController.navigateForward(`seleccion-comensal/${this.rutaTipo}/${this.idReservaEstadia}/creacion`);
            }
            else {
              this.toastService.toastError(`Ya se encuentra participando en una estadía para la misma fecha y rango horario. No es posible realizar la unión.`, 5000);
              this.navController.navigateForward([`/home`]);
            }
          }
          else {
            this.toastService.toastError(`La ${this.rutaTipo} N° ${this.idReservaEstadia} de ${this.nombreUsuario}, no se encuentra Vigente`, 3000);
            setTimeout(()=>{
              this.navController.navigateForward([`/home`]);
            }, 3000);
          }
        });
      }
    }

    async verificarUnionReserva(reserva) {
      this.errorRangoUsr = false;

      let fechaReservaActual = reserva.fechaReserva;
      let horaEntradaActual = reserva.horaEntradaReserva;
      let horaSalidaActual = reserva.horaSalidaReserva; 
      let idReservaActual = reserva.idReserva;

      await this.reservaServicio.getReservasPorEstado("generada")
      .then(async (res:any) => {
        if ( res && res.tipo != 2) {
          let reservasTodas = res.data;
          for (let todas of reservasTodas) {
            let fechaReservaTodas = todas.fechaReserva;
            let horaEntradaTodas = todas.horaEntradaReserva;
            let horaSalidaTodas = todas.horaSalidaReserva;
            let idReservaTodas = todas.idReserva;

            if (fechaReservaTodas == fechaReservaActual) {
              // Validar: No permitir generar reservas para un mismo usuario, misma fecha, dentro de un rango de horario parecido
              
              console.log("fechaReservaTodas", fechaReservaTodas, "fechaReservaActual", fechaReservaActual);
              if (idReservaActual != idReservaTodas) {
                this.errorRangoUsr = this.validarRangoHorarioReserva(horaEntradaTodas, horaEntradaActual, horaSalidaTodas, horaSalidaActual);
              }
            }
            if (this.errorRangoUsr) {
              break;
            }
          }
        }
      });
    }

    async verificarUnionEstadia(estadia) {
      this.errorRangoUsr = false;

      let fechaEstadiaActual = estadia.fechaEstadia;
      let idEstadiaActual = estadia.idEstadia;

      await this.estadiaServicio.getEstadiasPorEstado("generada")
      .then(async (res:any) => {
        if ( res && res.tipo != 2) {
          let estadiasTodas = res.data;
          for (let todas of estadiasTodas) {
            let fechaEstadiaTodas = todas.fechaEstadia;
            let idEstadiaTodas = todas.idEstadia;
            let idUsuariosEstadia = [];

            for (let comenTodas of todas.comensals) {
              let idUsrTod = comenTodas.idUsuario;
              if (idUsrTod != null && idUsrTod != "" && idUsrTod != "undefined") {
                idUsuariosEstadia.push(idUsrTod);
              }
            }

            if (fechaEstadiaTodas == fechaEstadiaActual) {
              // Validar: No permitir generar Estadias para un mismo usuario, misma fecha, dentro de un rango de horario parecido
              for (let usuarioEstadia of idUsuariosEstadia) {
                if (this.idUsrStorage == usuarioEstadia) {
                  if (idEstadiaTodas != idEstadiaActual) {
                    //NO VERIFICO RANGO HORARIO, PUES LAS ESTADIAS EN ESTADO "GENERADA" SIEMPRE SON ACTIVAS
                    this.errorRangoUsr = true;
                    break;
                  }
                }
              }
            }
            if (this.errorRangoUsr) {
              break;
            }
          }
        }
      });
    }

    validarRangoHorarioReserva(horaEntradaTodas, horaEntradaActual, horaSalidaTodas, horaSalidaActual) {
      let errorRango = false;
      if (horaEntradaTodas <= horaEntradaActual && horaEntradaActual < horaSalidaTodas) {
        errorRango = true;
      }
      if (horaEntradaTodas < horaSalidaActual && horaSalidaActual <= horaSalidaTodas) {
        errorRango = true;
      }
      if (horaEntradaActual <= horaEntradaTodas && horaSalidaTodas <= horaSalidaActual) {
        errorRango = true;
      }
      return errorRango;
    }
    
    async insertarReservaEstadiaComensalStorage() {
      //Elimino lo existente relacionado en storage, para no duplicar datos. Solo podra existir una reserva y estadía a la vez, para
      //un usuario logueado.

      let reservaEstadia = {
        idReservaEstadia: this.idReservaEstadia,
        idUsuarioCreador: this.idUsuario,
        tipo: this.rutaTipo
      }
      await this.storage.setOneObject(this.rutaTipo, reservaEstadia);
    }
    
    async traerUsuario() {
      await this.usuarioServicio.getUsuario(  this.idUsuario )
      .then( async usuario => {
         this.usuario = await usuario;
      })
    }

    async traerUsuarioStorage() {
      await this.storage.getCurrentUsuario()
      .then(data => {
        let currentUsuario = data;
        this.idUsrStorage =  currentUsuario.id;
      });
    }

    async traerReservaEstadiaStorage() {
      await this.storage.getOneObject(this.rutaTipo)
       .then((est: any) => {
        if (est != null && est != "") {
          this.idReservaEstadiaStorage = est.idReservaEstadia;
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
  
    lessTimes(startTime, endTime) {
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
        times[i] = a[i] - b[i];
      }
      var hours = times[0];
      var minutes = times[1];
      var seconds = times[2];
  
      if (seconds < 0) {
        var m =  60 + seconds; // seconds es negativo, por eso sumo (para restar)
        minutes -= 1
        seconds = m
      }
      if (minutes < 0) {
        var h = 60 + minutes; // minutes es negativo, por eso sumo (para restar)
        hours -= 1;
        minutes = h;
      }
      return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2);
    }
  
    traerHoraActual() {
      let date = new Date();
      this.horaActual = this.tratarFechaProvider.traerTime(date);
      this.horaActual += ":00";
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
      this.fechaActual = `${yy}-${mes}-${dia}`;
    }
  }
  
  