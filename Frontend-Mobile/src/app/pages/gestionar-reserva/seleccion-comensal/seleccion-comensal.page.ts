import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
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

  public idReserva;
  public idComensal;
  public currentUsuario;
  public reserva: Reserva;
  public comensales: Comensal[];
  public modificarComensal = false;
  public from;
  public nombreUsuario;

  public pathDetalleComensalUsuario: {idReserva: number, detalle: [{aliasComensal: string, edadComensal: number, idUsuario?: number}]};

  constructor(
    private alertController: AlertController,
    private navController: NavController,
    public activatedRoute: ActivatedRoute,
    private storageService: StorageService,
    private reservaServicio: ReservaService,
    private toastService: ToastService,
  ) {
   }

  ngOnInit() {
    console.log("PAGE SeleccionComensalPage")
    this.limpiarComensalStorage()
    if (!this.idReserva) {
      this.activatedRoute.params
        .subscribe(params => {
          this.from = params.from;
          this.idReserva = params.idReserva;
          this.traerComensalReservaStorage();
        }).unsubscribe();
        this.traerUsuario();
        this.traerReserva();
        this.loadCurrentUsuario();
    }
  }

  loadCurrentUsuario() {
    this.storageService.getCurrentUsuario().then((data) => {
      let currentUsuario: any = data;
      this.nombreUsuario = currentUsuario.rolUsuario;
    });
  }

  ionViewWillEnter(){
    this.storageService.getComensales().then((respuesta) => {
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
    this.storageService.getCurrentUsuario()
      .then( logs => {
        this.currentUsuario = logs['id'];
      })
  }

  limpiarComensalStorage(){
    this.storageService.validarComensal().then((respuesta) => {
      if(respuesta) {
        respuesta.forEach(element => {
          if(element.vencida) {
            let data: {} = {idReserva: element.idReserva,
              idEstadoReserva: 2,
              descripcionReservaEstado: `Por Vencimiento, eliminado desde Comensal ${element.idComensal}.`}
            this.reservaServicio.cambiarEstado(data)
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
      this.storageService.getComensales().then((respuesta) => {
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
    this.reservaServicio.getReserva( this.idReserva )
    .then( reserva => {
      this.reserva = reserva;
      this.comensales = reserva.comensals
    })
  }

  seleccionarComensal( item ) {
    this.storageService.getOneObject("comensalReserva").then((data) => {
      if (data != null) {
        let idComensalStorage;
        for ( let comen of data ){ 
          if (comen.idReserva == this.reserva.idReserva) {
            idComensalStorage = comen.idComensal
          }
        }
        if (idComensalStorage != item.idComensal) {
          this.confirmacionComensal( item );
        }
        else {
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
    await this.storageService.addComensal( comensal )
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
      cssClass: 'alertPrimary',
    });
    await alert.present();
  } 

  async eliminarComensal( item ) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: `¿Desea Eliminar el comensal seleccionado?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: ( resp ) => {
            // no hacer nada
          }
        }, {
          text: 'Eliminar Comensal',
          handler: () => {
            let pathComensal = { idReserva: this.idReserva,detalle: [ { idComensal: item['idComensal'], baja: true}]};
            this.reservaServicio.setComensalesReserva(pathComensal)
            .then( respuesta => {
              if (respuesta.tipo == 1){
                this.toastService.toastSuccess('Comensal eliminado correctamente.', 1500)
                this.traerReserva();
              } else {
                this.ConfirmarEliminarComensalAsociado('Confirmar Eliminado', 'El Comensal posee pedidos asociados. ¿Desea eliminar el Comensal con todos sus Pedidos?', pathComensal);
              }
            }).catch( error => {
              console.log("ERROR ", error)
            });
          }
        }
      ],
      cssClass: 'alertWarning',
    });
    await alert.present();
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
          min: 10,
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
            if ( info.alias && info.edad && info.edad >= 10 ){
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
              this.toastService.toastError('La edad debe ser positiva y mayor a 10 años.', 2000)
            }
          }
        }
      ],
      cssClass: 'alertPrimary',
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
      ],
      cssClass: 'alertPrimary',
    })
    await alert.present();
  }

  agregarNuevoComensal( path ){
    this.reservaServicio.setComensalesReserva( path )
      .then( res => {
        if ( res.tipo == 1){
          this.toastService.toastSuccess(`Comensal agregado Correctamente!.`, 2000)
        } else {
          this.toastService.toastWarning(`Comensal no se pudo crear`, 2000)
        }
        this.traerReserva();
      })
  }

  async ConfirmarEliminarComensalAsociado(pTitulo: string, pMensaje: string, pathComensal) {
    const alert = await this.alertController.create({
      header: pTitulo,
      message: pMensaje,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelado');
          }
        }, {
          text: 'Eliminar',
          handler: ( info ) => {
            console.log("Obligar eliminacion de comensal con pedidos asociados")
            this.reservaServicio.setComensalesReserva(pathComensal, true)
            .then( respuesta => {
              if ( respuesta.tipo == 1 ){
                this.toastService.toastSuccess(`Comensal eliminado Correctamente con todos sus Pedidos asociados.`, 2500)
                this.storageService.eliminarComensalReserva( pathComensal.detalle[0].idComensal )
                this.traerReserva();
              }
            })
          }
        }
      ],
      cssClass: 'alertWarning',
    })
    await alert.present();
  }


  goBack() {
    if ( this.from == 'creacion' ) {
      this.navController.navigateRoot('/home')
    } else if (this.from == "edicion") {
      this.navController.navigateBack('/search-gestionar-reserva');
    }
  }
}
