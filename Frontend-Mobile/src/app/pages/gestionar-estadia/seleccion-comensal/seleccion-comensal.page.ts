import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../services/storage/storage.service';
import { EstadiaService } from '../../../services/estadia/estadia.service';
import { Estadia, Comensal } from 'src/app/models/modelos';
import { ToastService } from '../../../providers/toast.service';

@Component({
  selector: 'app-seleccion-comensal',
  templateUrl: './seleccion-comensal.page.html',
  styleUrls: ['./seleccion-comensal.page.scss'],
})
export class SeleccionComensalPage implements OnInit {
   
    public idEstadia;
    public idComensal;
    public currentUsuario;
    public estadia: Estadia;
    public comensales: Comensal[];
    public modificarComensal = false;
    public from;
    public nombreUsuario;
  
    public pathDetalleComensalUsuario: {idEstadia: number, detalle: [{aliasComensal: string, edadComensal: number, idUsuario?: number}]};
  
    constructor(
      private alertController: AlertController,
      private navController: NavController,
      public activatedRoute: ActivatedRoute,
      private storage: StorageService,
      private estadiaService: EstadiaService,
      private toastService: ToastService,
    ) {
     }
  
    ngOnInit() {
      console.log("PAGE SeleccionComensalPage")
      this.limpiarComensalStorage()
      if (!this.idEstadia) {
        this.activatedRoute.params
          .subscribe(params => {
            this.idEstadia = params.idEstadia;
            this.from = params.from;
            this.traerComensalEstadiaStorage();
          }).unsubscribe();
          this.traerUsuario();
          this.traerEstadia();
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
        console.log("Trayendo Comensales Estadia", respuesta)
        if (respuesta != null) {
          respuesta.forEach(element => {
            if(element.idEstadia == this.idEstadia){
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
        console.log("Limpiando Comensales Estadia", respuesta)
        if(respuesta) {
          respuesta.forEach(element => {
            if( element && element.vencida) {
              let data: {} = {idEstadia: element.idEstadia,
                idEstadoEstadia: 2,
                descripcionEstadiaEstado: `Por Vencimiento, eliminado desde Comensal ${element.idComensal}.`}
              this.estadiaService.cambiarEstado(data)
              .then( resp => {
                if( resp && resp.tipo == 1){
                  this.toastService.toastError( `Estadia N° ${element.idEstadia} Anulada por vencimiento.`,3000,'bottom')
                } else {
                  this.toastService.toastWarning( `Estadia N° ${element.idEstadia} Anulada por vencimiento.`,3000,'bottom')
                }
              })
            }
          });
        }
      })
    }
  
    traerComensalEstadiaStorage(){
      if(!this.modificarComensal){
        this.storage.getComensales().then((respuesta) => {
          console.log("Trayendo Comensales Estadia", respuesta)
          if (respuesta != null ){
            respuesta.forEach(element => {
              if(element.idEstadia == this.idEstadia){
                this.modificarComensal = true;
                this.idComensal = element.idComensal;
                this.navController.navigateForward([`/lista-pedido/estadia/${this.idEstadia}/comensal/${element.idComensal}`])
              }
            });
          }
        })
      }
    }
  
    traerEstadia(){
      this.estadiaService.getEstadia( this.idEstadia )
      .then( estadia => {
        console.log("ESTADIA ", estadia)
        this.estadia = estadia;
        console.log("Comensales" ,estadia.comensals)
        this.comensales = estadia.comensals
      })
    }
  

    seleccionarComensal( item ) {
      this.storage.getOneObject("comensalEstadia").then((data) => {
        if (data != null) {
          let idComensalStorage;
          for ( let comen of data ){ 
            if (comen.idEstadia == this.estadia.idEstadia) {
              idComensalStorage = comen.idComensal
            }
          }
          if (idComensalStorage != item.idComensal) {
            this.confirmacionComensal( item );
          }
          else {
            this.navController.navigateForward([`/lista-pedido/estadia/${this.idEstadia}/comensal/${item.idComensal}`])
          }
        }
        else {
          this.guardarComensal(item);
          this.navController.navigateForward([`/lista-pedido/estadia/${this.idEstadia}/comensal/${item.idComensal}`])
        }
      });    
    }
  
    async guardarComensal( item ) {
      let comensal = { 
        idComensal: item.idComensal, 
        idEstadia: this.estadia.idEstadia , 
      }
      await this.storage.setComensalEstadia( comensal )
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
            }
          }, {
            text: 'Asociarme',
            handler: () => {
              console.log('Asociando');
              this.guardarComensal(item);
              this.navController.navigateForward([`/lista-pedido/estadia/${this.idEstadia}/comensal/${item.idComensal}`])
            }
          }
        ],
        cssClass: 'alertPrimary'
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
              let pathComensal = { idEstadia: this.idEstadia,detalle: [ { idComensal: item['idComensal'], baja: true}]};
              this.estadiaService.setComensalesEstadia(pathComensal)
              .then( respuesta => {
                if (respuesta.tipo == 1){
                  this.toastService.toastSuccess('Comensal eliminado correctamente.', 1500)
                  this.traerEstadia();
                } else {
                  this.ConfirmarEliminarComensalAsociado('Confirmar Eliminado', 'El Comensal posee pedidos asociados. ¿Desea eliminar el Comensal con todos sus Pedidos?', pathComensal, item['idComensal']);
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

    async ConfirmarEliminarComensalAsociado(pTitulo: string, pMensaje: string, pathComensal, idComensal: number) {
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
              if (this.verificarEliminarComensalEstadia(idComensal)) {
                console.log("Obligar eliminacion de comensal con pedidos asociados")
                this.estadiaService.setComensalesEstadia(pathComensal, true)
                .then( respuesta => {
                  if ( respuesta.tipo == 1 ){
                    this.toastService.toastSuccess(`Comensal eliminado Correctamente con todos sus Pedidos asociados.`, 2500)
                    this.traerEstadia();
                  }
                })
              }
              else {
                this.toastService.toastError(`No se ha podido eliminar el Comensal. El mismo posee Pedidos Finalizados o Pendientes de Pago.`, 3000)
              }
            }
          }
        ],
        cssClass: 'alertWarning',
      })
      await alert.present();
    }

    verificarEliminarComensalEstadia (idComensal: number): boolean { 
      //Si al menos un pedido se encuentra en ciertos estados, NO permitir eliminar Comensal
      for (let item of this.estadia.pedidos) {
        if (idComensal == item.idComensal) {
          let estadoPedido = item.idPedido;
          console.log("estadoPedido: ", estadoPedido);
          if (estadoPedido == 5 || estadoPedido == 6 || estadoPedido == 7 ) { // Que no permite si estado es: Finalizado, Finalizado Sin Pagar, Pendiente de Pago
            return false;
          }
        }
      }
      return true;
    }
  
    crearComensal() {
      console.log("CREANDO COMENSAL")
      this.ConfirmCreateComensal(`Crear nuevo Comensal`, `Desea generar nuevo Comensal para la estadia N° ${this.idEstadia} en curso? Por favor Ingrese los siguientes datos.`)
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
              if ( info.alias && info.edad && info.edad >= 10 ){
                this.pathDetalleComensalUsuario = { idEstadia: this.idEstadia, detalle: [{aliasComensal: info.alias, edadComensal: info.edad }] }
                let existe = false;
                this.estadia.comensals.forEach( element => {
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
        cssClass: 'alertPrimary'
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
        cssClass: 'alertPrimary'
      })
      await alert.present();
    }
  
    agregarNuevoComensal( path ){
      console.log('agregando ',path);
      this.estadiaService.setComensalesEstadia( path )
        .then( res => {
          if ( res && res.tipo == 1){
            this.toastService.toastSuccess(`Comensal agregado Correctamente!.`, 2000)
          } else {
            this.toastService.toastWarning(`Comensal no se pudo crear`, 2000)
          }
          this.traerEstadia();
        })
    }

    goBack() {
      console.log("FROM ", this.from)
      if ( this.from == 'creacion' ) {
        this.navController.navigateRoot('/home')
      } else if (this.from == "edicion") {
        this.navController.navigateBack('/search-gestionar-estadia');
      } else if (this.from == 'home') {
        this.navController.navigateRoot('/home')
      } else {
        this.navController.navigateRoot('/home')
      }
    }
  }
  