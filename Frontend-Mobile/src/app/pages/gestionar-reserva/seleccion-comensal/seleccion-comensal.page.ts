import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../services/storage/storage.service';
import { ReservaService } from '../../../services/reserva/reserva.service';
import { Reserva, Comensal } from 'src/app/models/modelos';
import { ToastService } from '../../../providers/toast.service';

@Component({
  selector: 'app-seleccion-comensal',
  templateUrl: './seleccion-comensal.page.html',
  styleUrls: ['./seleccion-comensal.page.scss'],
})
export class SeleccionComensalPage implements OnInit {

  idReserva;
  idComensal;
  currentUsuario;
  reserva: Reserva;
  comensales: Comensal[];
  modificarComensal = false;
  private nombreUsuario;

  pathDetalleComensalUsuario: {idReserva: number, detalle: [{aliasComensal: string, edadComensal: number, idUsuario?: number}]};

  constructor(
    private alertController: AlertController,
    private navController: NavController,
    public activatedRoute: ActivatedRoute,
    private storage: StorageService,
    private reservaservicio: ReservaService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    console.log("PAGE SeleccionComensalPage")
    this.limpiarComensalStorage()
    if (!this.idReserva) {
      this.activatedRoute.params
        .subscribe(params => {
          this.idReserva = params.idReserva;
          this.traerComensalReservaStorage();
        }).unsubscribe();
        this.traerUsuario();
        this.traerReserva();
        this.loadCurrentUsuario();
    }
  }

  loadCurrentUsuario() {
    this.storage.getCurrentUsuario().then((data) => {
      let currentUsuario: any = data;
      this.nombreUsuario = currentUsuario.rolUsuario;
      console.log("this.nombreUsuario : ", this.nombreUsuario );
    });
  }

  ionViewWillEnter(){
    this.storage.getComensales().then((respuesta) => {
      console.log("Trayendo Comensales Reserva", respuesta)
      if (respuesta != null) {
        respuesta.forEach(element => {
          if(element.idReserva == this.idReserva){
            this.idComensal = element.idComensal;
          }
        });
      }
    })
  }

  ngOnDestroy() {

  }

  traerUsuario() {
    this.storage.getCurrentUsuario()
      .then( logs => {
        this.currentUsuario = logs['id'];
      })
  }

  limpiarComensalStorage(){
    this.storage.validarComensal().then((respuesta) => {
      console.log("Limpiando Comensales Reserva", respuesta)
      if(respuesta) {
        respuesta.forEach(element => {
          if(element.vencida) {
            let data: {} = {idReserva: element.idReserva,
              idEstadoReserva: 2,
              descripcionReservaEstado: `Por Vencimiento, eliminado desde Comensal ${element.idComensal}.`}
            this.reservaservicio.cambiarEstado(data)
            .then( resp => {
              if(resp.tipo == 1){
                this.toastService.toastError( `Reserva N° ${element.idReserva} Anulada por vencimiento.`,3000,'bottom')
              } else {
                this.toastService.toastWarning( `Reserva N° ${element.idReserva} Anulada por vencimiento.`,3000,'bottom')
              }
            })
          }
        });
      }
    })
  }

  traerComensalReservaStorage(){
    if(!this.modificarComensal){
      this.storage.getComensales().then((respuesta) => {
        console.log("Trayendo Comensales Reserva", respuesta)
        if (respuesta != null ){
          respuesta.forEach(element => {
            if(element.idReserva == this.idReserva){
              this.modificarComensal = true;
              this.idComensal = element.idComensal;
              this.navController.navigateForward([`/lista-pedido/reserva/${this.idReserva}/comensal/${element.idComensal}`])
            }
          });
        }
      })
    }
  }

  traerReserva(){
    this.reservaservicio.getReserva( this.idReserva )
    .then( reserva => {
      console.log("RESERVA ", reserva)
      this.reserva = reserva;
      console.log("Comensales" ,reserva.comensals)
      this.comensales = reserva.comensals
    })
  }

  seleccionarComensal( item ) {
    this.storage.getOneObject("comensalReserva").then((data) => {
      if (data != null) {
        let idComensalStorage = data[0].idComensal;
        if (idComensalStorage != item.idComensal) {
          this.confirmacionComensal( item );
        }
        else {
          this.guardarComensal(item);
          this.navController.navigateForward([`/lista-pedido/reserva/${this.idReserva}/comensal/${item.idComensal}`])
        }
      }
      else {
        this.guardarComensal(item);
        this.navController.navigateForward([`/lista-pedido/reserva/${this.idReserva}/comensal/${item.idComensal}`])
      }
    });    
  }

  async guardarComensal( item ) {
    let comensal = { 
      idComensal: item.idComensal, 
      idReserva: this.reserva.idReserva , 
      fechaReserva: this.reserva.fechaReserva, 
      horaEntradaReserva: this.reserva.horaEntradaReserva 
    }
    await this.storage.addComensal( comensal )
  }

  async confirmacionComensal( item ) {
    const alert = await this.alertController.create({
      header: 'Desea asociarse?',
      message: `Desea identificarse con este Comensal?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // if (this.idReserva && this.idComensal){
            //   this.navController.navigateForward([`/lista-pedido/reserva/${this.idReserva}/comensal/${this.idComensal}`])
            // }
          }
        }, {
          text: 'Asociarme',
          handler: () => {
            console.log('Asociando');
            this.guardarComensal(item);
            this.navController.navigateForward([`/lista-pedido/reserva/${this.idReserva}/comensal/${item.idComensal}`])
          }
        }
      ],
      cssClass: 'alert',
    });
    await alert.present();
  } 

  eliminarComensal() {
    console.log("ELIMINADN COMENSAL")
  }

  crearComensal() {
    console.log("CREANDO COMENSAL")
    this.ConfirmCreateComensal(`Crear nuevo Comensal`, `Desea generar nuevo Comensal para la reserva N° ${this.idReserva} en curso? Por favor Ingrese los siguientes datos.`)
  }

  async ConfirmCreateComensal(pTitulo: string, pMensaje: string) {
    const alert = await this.alertController.create({
      header: pTitulo,
      message: pMensaje,
      inputs: [
        {
          name: 'alias',
          type: 'text',
          placeholder: 'Ingrese Alias'
        },
        {
          name: 'edad',
          type: 'number',
          placeholder: 'Ingrese Edad',
          min: 15,
          max: 99
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelado');
          }
        }, {
          text: 'Aceptar',
          handler: ( info ) => {
            if ( info.alias && info.edad && info.edad >= 15 ){
              this.pathDetalleComensalUsuario = { idReserva: this.idReserva, detalle: [{aliasComensal: info.alias, edadComensal: info.edad }] }
              let existe = false;
              this.reserva.comensals.forEach( element => {
                if ( element.idUsuario == this.currentUsuario) {
                  existe = true;
                }
              })
              if (!existe) {
                this.UsarUsuarioActual(`Desea asociar el nuevo comensal a su usuario actual?`, `Por favor seleccione su respuesta.`)
              } else {
                this.agregarNuevoComensal(this.pathDetalleComensalUsuario)
              }
            } else if ( !info.alias ) {
              this.toastService.toastError('Ingrese Alias.', 2000)
            } else { 
              this.toastService.toastError('La edad debe ser positiva y mayor a 15 años.', 2000)
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async UsarUsuarioActual(pTitulo: string, pMensaje: string) {
    const alert = await this.alertController.create({
      header: pTitulo,
      message: pMensaje,
      buttons: [
        {
          text: 'No asociar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelado');
            this.agregarNuevoComensal(this.pathDetalleComensalUsuario)
          }
        }, {
          text: 'Asociar',
          handler: ( info ) => {
            this.pathDetalleComensalUsuario.detalle[0]['idUsuario'] = this.currentUsuario;
            this.agregarNuevoComensal(this.pathDetalleComensalUsuario)
          }
        }
      ]
    })
    await alert.present();
  }

  agregarNuevoComensal( path ){
    console.log('agregando ',path);
    this.reservaservicio.setComensalesReserva( path )
      .then( res => {
        if ( res.tipo == 1){
          this.toastService.toastSuccess(`Comensal agregado Correctamente!.`, 3000)
        } else {
          this.toastService.toastWarning(`Comensal no se pudo crear`, 4000)
        }
        this.traerReserva();
      })
  }
}
