import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { StorageService, Log } from '../services/storage/storage.service';
import { NavController, AlertController } from '@ionic/angular';
import { EstadiaService } from '../services/estadia/estadia.service';
import { ToastService } from '../providers/toast.service';
import { ReservaService } from '../services/reserva/reserva.service';
import { TratarFechaProvider } from '../providers/tratarFecha.provider';
import { MesaService } from '../services/mesa/mesa.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public logueo: Log;
  public currentUsuario: string;
  selectOption;
  public idCurrentUsuario;
  public nombreUsuario = null;
  public idEstadia;

  private fechaActual;
  private horaActual;

  slidesCliente = [
    {
      url: '../../assets/icon/Presentacion/logo-sarym.png'
    },
    {
      url: '../../assets/icon/Presentacion/Desayunos.jpg'
    },
    {
      url: '../../assets/icon/Presentacion/Hamburguesa.jpg'
    },
    {
      url: '../../assets/icon/Presentacion/Pastas.jpg'
    },
    {
      url: '../../assets/icon/Presentacion/Variedades.jpg'
    }
  ];

  slidesMozo = [
    {
      url: '../../assets/icon/Presentacion/mozo.jpg'
    }
  ];

  constructor(
    private menu: MenuController,
    private storage: StorageService,
    private navController: NavController,
    private alertController: AlertController,
    private estadiaService: EstadiaService,
    private reservaService: ReservaService,
    private mesaService: MesaService,
    private toastService: ToastService,
    private tratarFechaProvider: TratarFechaProvider,
  ) {
    //this.loadLog()
  }
  openFirst() {
    this.menu.toggle();
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    console.log("CARGO-------------------")
    this.loadLog()
  }

  // TODO: Consultar por las reservas que se encuentren en estado Generada, y filtrar por fecha y rango horario (-30min + 30min). Las que se encuentren en este rango, cambiar el estado de las mesas a "RESERVADA"

  // TODO: Consultar por las reservas que se encuentren en estado Generada, y filtrar por fecha y rango horario. Aquellas que hayan superado el horario de ingreso por 30 minutos, Actualizar el estado de las mesas a "DISPONIBLE" y la reserva a "ANULADA", con descripción que indique los motivos.

  realizarPedido() {
    // if (this.idEstadia != undefined && this.idEstadia != null && this.idEstadia != 0) {
      if (this.idEstadia != undefined && this.idEstadia != null && this.idEstadia != 0) {

      this.goTo('realizar-pedido');
    } else {
      this.toastService.toastWarning('Usted no se encuentra asociado a ninguna Estadía', 2500)
    }
  }

  async goTo(key: string) {
    // await this.loadLog()
    let id = this.logueo.id;

    if (id == -1) { //Invitado
      id = 0;
    }

    let page;
    switch (key) {
      case "registro-usuario":
        page = `/registro-usuario/${id}`;
        break;
      case "nueva-reserva":
        page = `/crud-gestionar-reserva/0/crear`;
        break;
      case "unirse-reserva":
        // page = `/unirse-gestionar-reserva`;
        page = `/unirse-reserva-estadia`;
        break;
      // case "realizar-pedido":
      //   page = `/ver-qr-reserva/1`;
      //   break;
      case "realizar-pedido":
        page = `/seleccion-comensal/estadia/${this.idEstadia}/home`;
        break;
      case "search-gestionar-reserva":
        // page = `/search-gestionar-reserva`;
        break;
      // case 'realizar-pedido':
      //   page = `/realizar-pedido`;
      //   break;
      
      case "catalogo":
        page = `/catalogo`;
        break;
      //MOZO
      case "consultar-salon":
        page = `/consultar-salon`;
        break;
      case "generar-estadia":
        page = `crud-generar-estadia/0/crear/estadia`;
        break;
        case "finalizar-estadia":
          page = `/`;
          break;
      case "pedidos a enviar":
        page = `/pedidos-a-enviar`;
        break;
      case "confirmar-reserva":
        page = `/confirmar-reserva`;
        break;
    }
    this.navController.navigateForward(page);
  }
  
  async loadLog() {
    await this.storage.getCurrentUsuario()
      .then(async logs => {
        console.log("LOG:-----------", logs);
        this.logueo = logs;
        this.currentUsuario = logs['rolUsuario'];
        this.idCurrentUsuario = logs.id;
        this.nombreUsuario = this.currentUsuario['rolUsuario'];
        
        await this.cargarPagina();
      })
  }

  async cargarPagina() {
    await this.tratarFechaActual();
    await this.traerHoraActual();
    await this.getEstadiaUsrLogueado();
    await this.comprobarReservasActuales();
  }

  async getEstadiaUsrLogueado() {
    if (this.idCurrentUsuario !== -1) { // Si NO es Usuario Invitado
      console.log("Usuario Invitado");
      await this.estadiaService.getEstadiasPorUsuario(this.idCurrentUsuario)
      .then((res: any) => {
        if ( res && res.tipo == 1 ){
          this.idEstadia =  res.data.idEstadia;
        } else {
          this.idEstadia = 0;
        }
      });
    }
    else {
      await this.storage.getOneObject("estadia")
      .then((est: any) => {
        if (est != null && est != "") {
          this.idEstadia = est.idReservaEstadia;
        }
        else {
          this.idEstadia = 0;
        }
      });
    }
  }

  async comprobarReservasActuales() {
    await this.reservaService.getReservasPorEstado("generada")
    .then((res:any) => {
      if ( res && res.tipo != 2) {
        let reservasGeneradas = res.data;
        console.log("reservasGeneradas: ", reservasGeneradas);

        console.log("----------------------------------------------------");
        console.log("------------RESERVAS---------------");

        for (let reserva of reservasGeneradas) {
          let fechaReserva = reserva.fechaReserva;
          let horaEntradaReserva = reserva.horaEntradaReserva;
          let idMesasReserva = [];
          for (let mesasreserva of reserva.detallereservamesas) {
            let mesaToda = mesasreserva.mesa.idMesa;
            if (mesaToda != "" && mesaToda != null && mesaToda != "undefined") {
              idMesasReserva.push(mesaToda);
            }
          }
            
          console.log("fechaReserva", fechaReserva);
          console.log("horaEntradaReserva", horaEntradaReserva);
          console.log("idMesasReserva", idMesasReserva);
          
          console.log("lessTimes(horaEntradaReserva, '00:30'): ", this.lessTimes(horaEntradaReserva , '00:30'));
          console.log("addTimes(horaEntradaReserva , '00:30'): ", this.addTimes(horaEntradaReserva , '00:30'));

          console.log("-------------------------------");
          
          if (fechaReserva == this.fechaActual) {
            if (
              (this.horaActual >= (this.lessTimes(horaEntradaReserva , '00:30'))) && 
              (this.horaActual < (this.addTimes(horaEntradaReserva, '00:30'))) 
            ) {
              //CAMBIAR ESTADO DE MESAS A RESERVADO
              this.cambiarEstadoMesaReservada(reserva, idMesasReserva);
            }
            else if ( this.horaActual > (this.addTimes(horaEntradaReserva, '00:30')) ) {
              //ANULAR RESERVA y LIBERAR MESAS
              this.anularReservaAutomaticamente(reserva, idMesasReserva);
            }
          }
          else if (fechaReserva < this.fechaActual) { // Si ocurre esto, debo ANULAR la reserva y Habilitar el cambiar estado de Mesas
            //ANULAR RESERVA y LIBERAR MESAS
            this.anularReservaAutomaticamente(reserva, idMesasReserva);
          }
        }
        console.log("----------------------------------------------------");
        console.log("------------ACTUAL-------------");

        console.log("fechaActual", this.fechaActual);
        console.log("horaActual", this.horaActual);
      }
    });
  }

  cambiarEstadoMesaReservada(reserva, idMesasReserva) {
    console.log("CAMBIAR ESTADO DE MESAS A RESERVADO, de la Reserva Nro ", reserva.idReserva);
    for (let idMesa of idMesasReserva) {
      let pathMesa = {}
      pathMesa['idMesa'] = idMesa;
      pathMesa['idEstadoMesa'] = 3 //Reservada
      this.mesaService.cambiarEstado(pathMesa)
      .then(resp => {
        if (resp.tipo != 2) {
          console.log("Cambio de estado de Mesa Nro ", idMesa, ", a Reservada");
        }
        else {
          console.log("No se ha podido actualizar el estado de la Mesa Nro ", idMesa, " Error: ", resp.title);
        }
      });
    }
  }
  
  anularReservaAutomaticamente(reserva, idMesasReserva) {
    console.log("ANULAR RESERVA y LIBERAR MESAS, de la Reserva Nro ", reserva.idReserva);
    
    let pathReserva = {};
    pathReserva['idReserva'] = reserva.idReserva;
    pathReserva['idEstadoReserva'] = 2; // Anular Reserva
    pathReserva['descripcionReservaEstado'] = "Reserva no confirmada. Anulación automática";
    this.reservaService.cambiarEstado(pathReserva)
    .then( respo => {
      if ( respo && respo.tipo == 1 ){
        console.log("Reserva Nro ", reserva.idReserva, ", Anulada por No ser confirmada a tiempo");
        for (let idMesa of idMesasReserva) {
          let pathMesa = {}
          pathMesa['idMesa'] = idMesa;
          pathMesa['idEstadoMesa'] = 2 //Libre
          this.mesaService.cambiarEstado(pathMesa)
          .then(resp => {
            if (resp.tipo != 2) {
              console.log("Cambio de estado de Mesa Nro ", idMesa, ", a Libre");
            }
            else {
              console.log("No se ha podido actualizar el estado de la Mesa Nro ", idMesa, " Error: ", resp.title);
            }
          });
        }
      }
      else {
        console.log("Error al actualizar estado Reserva: ", respo.title);
      }
    });
  }

  tratarFechaActual(){
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

  traerHoraActual() {
    let date = new Date();
    this.horaActual = this.tratarFechaProvider.traerTime(date);
    this.horaActual += ":00";
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
      times[i] = a[i] - b[i]
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

  seleccionarMis(){
    this.ConfirmMisEstadiaReserva();
  }

  async ConfirmMisEstadiaReserva() {
    const alert = await this.alertController.create({
      header: 'Seleccione una Respuesta',
      buttons: [
        {
          text: 'Volver',
          role: 'cancel',
          cssClass: 'secondary',
        }, 
        {
          text: 'Ver mis Reservas',
          handler: () => {
            this.navController.navigateForward('/search-gestionar-reserva');
          }
        },
        {
          text: 'Ver mi Estadia Actual',
          handler: () => {
            this.navController.navigateForward('/search-gestionar-estadia');
          }
        }
      ],
      cssClass: 'alertPrimaryModificado'
    });
    await alert.present();
    return 'hola'
  }
}
