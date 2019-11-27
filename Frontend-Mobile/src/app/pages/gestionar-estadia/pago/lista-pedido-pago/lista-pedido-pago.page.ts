import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../../services/storage/storage.service';
import { EstadiaService } from '../../../../services/estadia/estadia.service';
import { PagoService } from '../../../../services/pago/pago.service';
import { Estadia, Pago, Pedido } from '../../../../models/modelos';
import { PedidoService } from '../../../../services/pedido/pedido.service';
import { ToastService } from '../../../../providers/toast.service';
import { AlertService } from '../../../../providers/alert.service';
import { LoaderService } from '../../../../providers/loader.service';

@Component({
  selector: 'app-lista-pedido-pago',
  templateUrl: './lista-pedido-pago.page.html',
  styleUrls: ['./lista-pedido-pago.page.scss'],
})
export class ListaPedidoPagoPage implements OnInit {
  
  public idEstadia;
  public idComensal;
  public currentUsuario;
  public estadia: Estadia;
  public pedidos: Pedido[];
  public modificarComensal = false;
  public from;
  public nombreUsuario;
  public pathDetalleComensalUsuario: {idEstadia: number, detalle: [{aliasComensal: string, edadComensal: number, idUsuario?: number}]};
  public mostrar: any[] = [];

  constructor(
  private alertController: AlertController,
  private navController: NavController,
  public activatedRoute: ActivatedRoute,
  private storage: StorageService,
  private estadiaService: EstadiaService,
  private pagoService: PagoService,
  private pedidoService: PedidoService,
  private toastService: ToastService,
  private alertService: AlertService,
  private loaderService: LoaderService,
  ) {

  }

  ngOnInit() {
  console.log("PAGE ListaPedidoPagoPage")
  this.activatedRoute.params
  .subscribe(params => {
    this.idEstadia = params.idEstadia;
    this.idComensal = params.idComensal;
    console.log("PARAMETROS ", params)
  })
  this.traerEstadia();
  }
  // ngOnInit() {
  //   console.log("PAGE SeleccionComensalPage")
  //   this.limpiarComensalStorage()
  //   if (!this.idEstadia) {
  //     this.activatedRoute.params
  //       .subscribe(params => {
  //         this.idEstadia = params.idEstadia;
  //         this.from = params.from;
  //         this.traerComensalEstadiaStorage();
  //       }).unsubscribe();
  //       this.traerUsuario();
  //       this.traerEstadia();
  //       this.loadCurrentUsuario();
  //   }
  // }

  loadCurrentUsuario() {
    this.storage.getCurrentUsuario().then((data) => {
      let currentUsuario: any = data;
      this.nombreUsuario = currentUsuario.rolUsuario;
      console.log("this.nombreUsuario : ", this.nombreUsuario );
    });
  }

  realizarPago() {
    
  }

  async imprimir( item ) {
    console.log("IMPRIMIR ", item)
      const alert = await this.alertController.create({
        header: 'Desea imprimir comprobante?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
            }
          }, {
          text: 'Imprimir',
          handler: () => {
            console.log('Imprimir');
            this.loaderService.presentLoading('Imprimiendo Comprobante aguarde unos segundos', 3000 )
            .then ( resp => { console.log("Comprobante Impreso")})
          }
        }
      ],
      cssClass: 'alertPrimary',
    });
    await alert.present();
  }

  calcularTotalCostoPedido(){
    for (let item of this.pedidos) {
      let importe;
      for (let elem of item.detallepedidoproductos) {
        if (elem.producto != null) {
          if (importe == null) importe = 0;
          importe += ( Number(elem.producto.precioproductos[0].importePrecioProducto) * Number(elem.cantidadPedidoProducto))
        } else if (elem.menupromocion != null) {
          if (importe == null) importe = 0;
          importe += ( Number(elem.menupromocion.preciomenupromocions[0].importePrecioMenuPromocion) * Number(elem.cantidadPedidoProducto))
        }
      }
      item['importeTotal'] = importe;
    }
    console.log("MODIFICADO ",this.pedidos)
  }


  // ionViewWillEnter(){
  //   this.storage.getComensales().then((respuesta) => {
  //     console.log("Trayendo Comensales Reserva", respuesta)
  //     if (respuesta != null) {
  //       respuesta.forEach(element => {
  //         if(element.idEstadia == this.idEstadia){
  //           this.idComensal = element.idComensal;
  //         }
  //       });
  //     }
  //   })
  // }

  // ngOnDestroy() {

  // }

  // traerUsuario() {
  //   this.storage.getCurrentUsuario()
  //     .then( logs => {
  //       this.currentUsuario = logs['id'];
  //     })
  // }

  // limpiarComensalStorage(){
  //   this.storage.validarComensal().then((respuesta) => {
  //     console.log("Limpiando Comensales Reserva", respuesta)
  //     if(respuesta) {
  //       respuesta.forEach(element => {
  //         if(element.vencida) {
  //           let data: {} = {idEstadia: element.idEstadia,
  //             idEstadoEstadia: 2,
  //             descripcionReservaEstado: `Por Vencimiento, eliminado desde Comensal ${element.idComensal}.`}
  //           this.estadiaService.cambiarEstado(data)
  //           .then( resp => {
  //             if(resp.tipo == 1){
  //               this.toastService.toastError( `Reserva N° ${element.idEstadia} Anulada por vencimiento.`,3000,'bottom')
  //             } else {
  //               this.toastService.toastWarning( `Reserva N° ${element.idEstadia} Anulada por vencimiento.`,3000,'bottom')
  //             }
  //           })
  //         }
  //       });
  //     }
  //   })
  // }

  // traerComensalEstadiaStorage(){
  //   if(!this.modificarComensal){
  //     this.storage.getComensales().then((respuesta) => {
  //       console.log("Trayendo Comensales Reserva", respuesta)
  //       if (respuesta != null ){
  //         respuesta.forEach(element => {
  //           if(element.idEstadia == this.idEstadia){
  //             this.modificarComensal = true;
  //             this.idComensal = element.idComensal;
  //             this.navController.navigateForward([`/lista-pedido/estadia/${this.idEstadia}/comensal/${element.idComensal}`])
  //           }
  //         });
  //       }
  //     })
  //   }
  // }

  traerEstadia(){
    this.estadiaService.getEstadia( this.idEstadia )
    .then( estadia => {
      console.log("ESTADIA ", estadia)
      this.estadia = estadia;
      console.log("PEDIDOS ", estadia.pedidos)
      this.pedidos = estadia.pedidos;
      this.calcularTotalCostoPedido();
    })
  }

  // seleccionarComensal( item ) {
  //   this.storage.getOneObject("comensalEstadia").then((data) => {
  //     if (data != null) {
  //       let idComensalStorage = data.idComensal;
  //       if (idComensalStorage != item.idComensal) {
  //         this.confirmacionComensal( item );
  //       }
  //       else {
  //         this.navController.navigateForward([`/lista-pedido/estadia/${this.idEstadia}/comensal/${item.idComensal}`])
  //       }
  //     } else {
  //       this.guardarComensal(item);
  //       this.navController.navigateForward([`/lista-pedido/estadia/${this.idEstadia}/comensal/${item.idComensal}`])
  //     }
  //   });    
  // }

  // async guardarComensal( item ) {
  //   let comensal = { 
  //     idComensal: item.idComensal, 
  //     idEstadia: this.estadia.idEstadia
  //   }
  //   await this.storage.setComensalEstadia( comensal )
  // }

  // async confirmacionComensal( item ) {
  //   const alert = await this.alertController.create({
  //     header: 'Desea asociarse?',
  //     message: `Desea identificarse con este Comensal?`,
  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: () => {
  //         }
  //       }, {
  //         text: 'Asociarme',
  //         handler: () => {
  //           console.log('Asociando');
  //           this.guardarComensal(item);
  //           this.navController.navigateForward([`/lista-pedido/estadia/${this.idEstadia}/comensal/${item.idComensal}`])
  //         }
  //       }
  //     ],
  //     cssClass: 'alert',
  //   });
  //   await alert.present();
  // } 

  // eliminarComensal( item ) {
  //   console.log("ELIMINADN COMENSAL", item)
  // }

  // crearComensal() {
  //   console.log("CREANDO COMENSAL")
  //   this.ConfirmCreateComensal(`Crear nuevo Comensal`, `Desea generar nuevo Comensal para la estadia N° ${this.idEstadia} en curso? Por favor Ingrese los siguientes datos.`)
  // }

  // async ConfirmCreateComensal(pTitulo: string, pMensaje: string) {
  //   const alert = await this.alertController.create({
  //     header: pTitulo,
  //     message: pMensaje,
  //     inputs: [
  //       {
  //         name: 'alias',
  //         type: 'text',
  //         placeholder: 'Ingrese Alias'
  //       },
  //       {
  //         name: 'edad',
  //         type: 'number',
  //         placeholder: 'Ingrese Edad',
  //         min: 15,
  //         max: 99
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           console.log('Cancelado');
  //         }
  //       }, {
  //         text: 'Aceptar',
  //         handler: ( info ) => {
  //           if ( info.alias && info.edad && info.edad >= 10 ){
  //             this.pathDetalleComensalUsuario = { idEstadia: this.idEstadia, detalle: [{aliasComensal: info.alias, edadComensal: info.edad }] }
  //             let existe = false;
  //             this.estadia.comensals.forEach( element => {
  //               if ( element.idUsuario == this.currentUsuario) {
  //                 existe = true;
  //               }
  //             })
  //             if (!existe) {
  //               this.UsarUsuarioActual(`Desea asociar el nuevo comensal a su usuario actual?`, `Por favor seleccione su respuesta.`)
  //             } else {
  //               this.agregarNuevoComensal(this.pathDetalleComensalUsuario)
  //             }
  //           } else if ( !info.alias ) {
  //             this.toastService.toastError('Ingrese Alias.', 2000)
  //           } else { 
  //             this.toastService.toastError('La edad debe ser positiva y mayor a 10 años.', 2000)
  //           }
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  // async UsarUsuarioActual(pTitulo: string, pMensaje: string) {
  //   const alert = await this.alertController.create({
  //     header: pTitulo,
  //     message: pMensaje,
  //     buttons: [
  //       {
  //         text: 'No asociar',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           console.log('Cancelado');
  //           this.agregarNuevoComensal(this.pathDetalleComensalUsuario)
  //         }
  //       }, {
  //         text: 'Asociar',
  //         handler: ( info ) => {
  //           this.pathDetalleComensalUsuario.detalle[0]['idUsuario'] = this.currentUsuario;
  //           this.agregarNuevoComensal(this.pathDetalleComensalUsuario)
  //         }
  //       }
  //     ]
  //   })
  //   await alert.present();
  // }

  // agregarNuevoComensal( path ){
  //   console.log('agregando ',path);
  //   this.estadiaService.setComensalesEstadia( path )
  //     .then( res => {
  //       if ( res.tipo == 1){
  //         this.toastService.toastSuccess(`Comensal agregado Correctamente!.`, 2000)
  //       } else {
  //         this.toastService.toastWarning(`Comensal no se pudo crear`, 2000)
  //       }
  //       this.traerEstadia();
  //     })
  // }

  // goBack() {
  //   if ( this.from == 'creacion' ) {
  //     this.navController.navigateRoot('/home')
  //   } else if (this.from == "edicion") {
  //     this.navController.navigateBack('/search-gestionar-estadia');
  //   }
  // }
}
        