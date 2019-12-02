import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { StorageService, Log } from '../services/storage/storage.service';
import { NavController, AlertController } from '@ionic/angular';
import { EstadiaService } from '../services/estadia/estadia.service';
import { ToastService } from '../providers/toast.service';
import { ReservaService } from '../services/reserva/reserva.service';
import { TratarFechaProvider } from '../providers/tratarFecha.provider';
import { MesaService } from '../services/mesa/mesa.service';
import { environment } from 'src/environments/environment';


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
    this.loadLog()
  }

  realizarPedido() {
    this.getEstadiaUsrLogueado();
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
        page = `/unirse-reserva-estadia`;
        break;
      case "realizar-pedido":
        page = `/seleccion-comensal/estadia/${this.idEstadia}/home`;
        break;
      case "search-gestionar-reserva":
        break;
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
      await this.estadiaService.getEstadiasPorUsuario(this.idCurrentUsuario)
      .then(async (res: any) => {
        if ( res && res.tipo == 1 ){
          let idEstadia = res.data.idEstadia;
          await this.estadiaService.getEstadia(idEstadia)
          .then((est: any) => {
            console.log("est: ", est);
            let idEstadoEstadia = est.estadiaestados[0].estadoestadium.idEstadoEstadia;
            if (est && idEstadoEstadia != 2 && idEstadoEstadia != 3) { // idEstadoEstadia != "Finalizada" AND idEstadoEstadia != "Anulada"
              this.idEstadia = idEstadia;
            } else {
              this.storage.delOneItem("estadia");
              this.storage.delOneItem("comensalEstadia");
            }
          })
        }
        else {
          this.idEstadia = 0;
        }
      });
    }
    else {
      await this.storage.getOneObject("estadia")
      .then(async (est: any) => {
        if (est != null && est != "") {
          let idEstadia = est.idReservaEstadia;
          await this.estadiaService.getEstadia(idEstadia)
          .then((est: any) => {
            console.log("est: ", est);
            let idEstadoEstadia = est.estadiaestados[0].estadoestadium.idEstadoEstadia;
            if (est && idEstadoEstadia != 2 && idEstadoEstadia != 3) { // idEstadoEstadia != "Finalizada" AND idEstadoEstadia != "Anulada"
              this.idEstadia = idEstadia;
            } else {
              this.storage.delOneItem("estadia");
              this.storage.delOneItem("comensalEstadia");
            }
          })
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
          if (fechaReserva == this.fechaActual) {
            if (
              (this.horaActual >= (this.lessTimes(horaEntradaReserva , environment.rangoHoraMaxReserva))) && 
              (this.horaActual < (this.addTimes(horaEntradaReserva, environment.rangoHoraMinReserva))) 
            ) {
              //CAMBIAR ESTADO DE MESAS A RESERVADO
              this.cambiarEstadoMesaReservada(reserva, idMesasReserva);
            }
            else if ( this.horaActual > (this.addTimes(horaEntradaReserva, environment.rangoHoraMinReserva)) ) {
              //ANULAR RESERVA y LIBERAR MESAS
              this.anularReservaAutomaticamente(reserva, idMesasReserva);
            }
          }
          else if (fechaReserva < this.fechaActual) { // Si ocurre esto, debo ANULAR la reserva y Habilitar el cambiar estado de Mesas
            //ANULAR RESERVA y LIBERAR MESAS
            this.anularReservaAutomaticamente(reserva, idMesasReserva);
          }
        }
      }
    });
  }

  async cambiarEstadoMesaReservada(reserva, idMesasReserva) {
    let cambiarEstado = false;
    let cambiarEstadoCount = 0;
    let i = 0;
    for (let idMesa of idMesasReserva) {
      i++;
      await this.mesaService.getMesa(idMesa)
      .then((res:any) => {
        if ( res && res.tipo != 2) {
          let estadoMesa = res.data.mesaestados[0].estadomesa.idEstadoMesa;
          let estadoMesaDesc = res.data.mesaestados[0].estadomesa.nombreEstadoMesa;
          console.log("Estado Mesa con idMesa: ", idMesa, ": Estado: ", estadoMesa);
          if (estadoMesa == 2) { //Si está en estado Disponible
            cambiarEstado = true;
            cambiarEstadoCount ++;
          }
          else {
            console.log("Mesa en estado: ", estadoMesa, " (",estadoMesaDesc,"). No hacer cambio de estado");
          }
        }
        else {
          console.log("Error al intentar traerse las mesas por id, con idMesa: ", idMesa);
        }
      });
    }
    
    //Cambiar el estado de todas las mesas si TODAS se encontraran en estado Disponible
    if (cambiarEstado) { // if (cambiarEstado || !cambiarEstado) { // Para reiniciar el estado de todas las mesas, hacer esta condición
      if (cambiarEstadoCount == i) {
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
      else { // Estados de mesas incorrectos. Verifique las semillas, ya que hay inconsistencia
        console.log("Estados de mesas incorrectos. Verifique las semillas, ya que hay inconsistencia. No se realiza el cambio de estado de las mesas de la reserva");
      }
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
