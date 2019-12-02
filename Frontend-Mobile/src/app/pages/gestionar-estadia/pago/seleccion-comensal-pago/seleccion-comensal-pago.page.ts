import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../../services/storage/storage.service';
import { EstadiaService } from '../../../../services/estadia/estadia.service';
import { Estadia, Comensal } from 'src/app/models/modelos';
import { ToastService } from '../../../../providers/toast.service';

@Component({
  selector: 'app-seleccion-comensal-pago',
  templateUrl: './seleccion-comensal-pago.page.html',
  styleUrls: ['./seleccion-comensal-pago.page.scss'],
})
export class SeleccionComensalPagoPage implements OnInit {
     
  public idEstadia;
  public idComensal;
  public currentUsuario;
  public estadia: Estadia;
  public comensales: Comensal[];
  public modificarComensal = false;
  // public from;
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
          // this.from = params.from;
          // this.traerComensalEstadiaStorage();
        }).unsubscribe();
        // this.traerUsuario();
        this.traerEstadia();
        // this.loadCurrentUsuario();
    }
  }

  // loadCurrentUsuario() {
  //   this.storage.getCurrentUsuario().then((data) => {
  //     let currentUsuario: any = data;
  //     this.nombreUsuario = currentUsuario.rolUsuario;
  //     console.log("this.nombreUsuario : ", this.nombreUsuario );
  //   });
  // }

  ionViewWillEnter(){
    this.storage.getComensales().then((respuesta) => {
      console.log("Trayendo Comensales Reserva", respuesta)
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

  // traerUsuario() {
  //   this.storage.getCurrentUsuario()
  //     .then( logs => {
  //       this.currentUsuario = logs['id'];
  //     })
  // }

  limpiarComensalStorage(){
    this.storage.validarComensal().then((respuesta) => {
      console.log("Limpiando Comensales Reserva", respuesta)
      if(respuesta) {
        respuesta.forEach(element => {
          if( element && element.vencida) {
            let data: {} = {idEstadia: element.idEstadia,
              idEstadoEstadia: 2,
              descripcionReservaEstado: `Por Vencimiento, eliminado desde Comensal ${element.idComensal}.`}
            this.estadiaService.cambiarEstado(data)
            .then( resp => {
              if( resp && resp.tipo == 1){
                this.toastService.toastError( `Reserva N° ${element.idEstadia} Anulada por vencimiento.`,3000,'bottom')
              } else {
                this.toastService.toastWarning( `Reserva N° ${element.idEstadia} Anulada por vencimiento.`,3000,'bottom')
              }
            })
          }
        });
      }
    })
  }

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
      console.log("Comensales" ,estadia.comensals)
      this.comensales = estadia.comensals
    })
  }

  seleccionarComensal( item ) {
    this.confirmacionComensal( item );

    // this.storage.getOneObject("comensalEstadia").then((data) => {
    //   if (data != null) {
    //     let idComensalStorage = data.idComensal;
    //     if (idComensalStorage != item.idComensal) {
    //       this.confirmacionComensal( item );
    //     }
    //     else {
    //       this.navController.navigateForward([`/lista-pedido/estadia/${this.idEstadia}/comensal/${item.idComensal}`])
    //     }
    //   } else {
    //     this.guardarComensal(item);
    //     this.navController.navigateForward([`/lista-pedido/estadia/${this.idEstadia}/comensal/${item.idComensal}`])
    //   }
    // });    
  }

  async guardarComensal( item ) {
    let comensal = { 
      idComensal: item.idComensal, 
      idEstadia: this.estadia.idEstadia
    }
    await this.storage.setComensalEstadia( comensal )
  }

  async confirmacionComensal( item ) {
    const alert = await this.alertController.create({
      header: 'Desea pagar con este Comensal?',
      message: `Usted realizaría el pago con el comensal seleccionado. Esta seguro?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Pagar',
          handler: () => {
            console.log('Asociando');
            this.navController.navigateForward([`/lista-pedido-pago/estadia/${this.idEstadia}/comensal/${item.idComensal}`])
          }
        }
      ],
      cssClass: 'alertPrimary',
    });
    await alert.present();
  } 
  
  // goBack() {
  //   if ( this.from == 'creacion' ) {
  //     this.navController.navigateRoot('/home')
  //   } else if (this.from == "edicion") {
  //     this.navController.navigateBack('/search-gestionar-estadia');
  //   }
  // }
}