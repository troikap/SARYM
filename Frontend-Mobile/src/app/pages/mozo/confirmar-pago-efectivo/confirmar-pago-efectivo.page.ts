import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Comensal, Reserva } from 'src/app/models/modelos';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ToastService } from '../../../providers/toast.service'
import { EstadiaService } from 'src/app/services/estadia/estadia.service';
import { PagoService } from 'src/app/services/pago/pago.service';
import { MesaService } from 'src/app/services/mesa/mesa.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { TratarFechaProvider } from 'src/app/providers/tratarFecha.provider';
import { CajaService } from 'src/app/services/caja/caja.service';
import { StorageService } from '../../../services/storage/storage.service';


@Component({
  selector: 'app-confirmar-pago-efectivo',
  templateUrl: './confirmar-pago-efectivo.page.html',
  styleUrls: ['./confirmar-pago-efectivo.page.scss'],
})
export class ConfirmarPagoEfectivoPage implements OnInit {

  private qrDataCodify;
  public createdCode;
  private secretCode;
  private nameArray;
  public mostrar: boolean = false;
  public variable: boolean = false;
  public scannedCode;
  public idEstadia;
  public idPago;
  public estadia;
  public pago;
  public cajas;
  public idCurrentUsuario;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private alertController: AlertController,
    private navController: NavController,
    public activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private estadiaService: EstadiaService,
    private pagoService: PagoService,
    private mesaService: MesaService,
    private pedidoService: PedidoService,
    private tratarFechaProvider: TratarFechaProvider,
    private cajaService: CajaService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    // this.realizarMovimientoCaja();
    this.loadCurrencyUsuario();
    this.scanCode();
  }
  async loadCurrencyUsuario() {
    await this.storageService.getCurrentUsuario()
    .then(async logs => {
      this.idCurrentUsuario = logs.id;
    })
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
      this.qrDataCodify = 'UEFHTy0zLTU='; // RVNUQURJQS01LTEx - RVNUQURJQS00LTEx
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
      if (tipo != "PAGO") {
        this.toastService.toastError('QR leido es incorrecto', 2000)
        this.navController.back();
      } 
      this.idEstadia = this.nameArray[1];
      this.idPago = this.nameArray[2];
      await this.buscarEstadia();
      await this.buscarPago();
      if(this.pago) {
        if ((this.idEstadia) && (this.idPago)) { 
          const alert = await this.alertController.create(
            {
            header: 'Leyendo QR',
            message: `¿Desea Confirmar pago de Estadia N° ${this.estadia.idEstadia}?. El monto es de $${this.pago.importeTotalAPagar} correspondiente al comensal ${this.pago.comensal.aliasComensal}.`,
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
                text: 'Confirmar',
                handler: () => {
                  this.realizarMovimientoCaja();
                }
              }
            ],
            cssClass: 'alertPrimary'
          });
          await alert.present();
        } else { // No continuar, pues ya es Reserva o Estadía del usuario logueado
          this.toastService.toastSuccess(`No se enviaron los datos correctamente`, 3000);
          this.navController.navigateBack('/home');
        }
      }
    }
  }

  async buscarEstadia() {
    await this.estadiaService.getEstadia(this.idEstadia).then( async estadia => {
      console.log("ESTADIAAAAAAAAAAAA ------------ ", estadia)
      this.estadia = await estadia;
    })
  }

  async buscarPago() {
    await this.pagoService.getPago(this.idPago).then( async pago => {
      console.log("PAGOOOOOOOOOOOOOOOOO -----------------", pago)
      if(pago) {
        if (pago['confirmado'] == true) {
          this.toastService.toastWarning(`Este pago ya ha sido Confirmado!`, 3000);
          this.navController.navigateBack('/home')
        } else {
          this.pago = await pago;
        }
      } else {
        this.toastService.toastError(`No se encontro ningun pago relacionado`, 3000);
      }
    })
  }

  async cambiarEstadoPedido() {
    let count = 1;
    console.log("cambiarEstadoPedido", this.pago.pagopedidos)
    for (let element of this.pago.pagopedidos ) {
      let pathPedido = {
        idPedido: element.pedido.idPedido,
        idEstadoPedido: 6,
        descripcionPedidoEstado: `Pago Confirmado Correctamente: $${element.importePagadoPedido}`
      }
      await this.pedidoService.cambiarEstado(pathPedido)
      .then( async resp => {
        if ( resp && resp.tipo == 1 ) {
          let fechaYHoraActual = await this.getFechaYHoraActual();
          let pathActualizarFechaFin = {
            idPedido: element.pedido.idPedido,
            fechaYHoraFinPedido: fechaYHoraActual
          }
          await this.pedidoService.updatePedido(pathActualizarFechaFin)
          .then(resp1 => {
            console.log("PEDIDO Actualizados Correctamente. Seteo de fechaYHoraFinPedido a:" , fechaYHoraActual);
          });
        } else {
          console.log("NO se pudo actualizar PEDIDO ")
        }
        if (this.pago.pagopedidos.length == count) {
          this.toastService.toastSuccess("Pago de Pedido Confirmado", 3000)
          this.cambiarEstadoMesas(this.idEstadia);
          this.actualizarPago();
          
        }
      })
      count += 1;
    }
  }

  async cambiarEstadoMesas(idEstadia) {
    await this.estadiaService.getEstadia(idEstadia).then( async estadia => {
      if ( estadia ) {
        console.log("~~~~~~~~~~~~~~~~~~~~~~~ ESTADIA ~~~~~~~~~~~~~~ ",estadia)
        let modificarEstado = true;
        for (let pedido of estadia.pedidos) {
          if (pedido.pedidoestados[0].idEstadoPedido != 2 && // Anulado 
            pedido.pedidoestados[0].idEstadoPedido != 6 ) {   // Finalizado
              modificarEstado = false;
            }
        }
        await this.mesaService.getMesa(Number(estadia.detalleestadiamesas[0].idMesa)).then( async response => {
          console.log("MESA ////////// ",response)
          let mesa = response['data'];
          if (response['tipo'] == 1) {
            if (modificarEstado && mesa.mesaestados[0].idEstadoMesa == 4) {
              for (let mesaACambiar of estadia.detalleestadiamesas) {
                let pathMesa = {
                  idMesa: mesaACambiar.idMesa,
                  idEstadoMesa: 1
                }
                await this.mesaService.cambiarEstado(pathMesa).then( async resp => {
                  if (resp) {
                    if (resp.tipo == 1){
                      console.log(`MESA N° ${mesaACambiar.idMesa} CAMBIADA A PENDIENTE DE PAGO`)
                    } else {
                      console.log(`MESA N° ${mesaACambiar.idMesa} NO CAMBIADA`)
                    }
                  }
                })
              }
            }
          }
        })
      }
    })
  }

   async realizarMovimientoCaja() {
    await this.cajaService.getCajas().then( async cajas => {
      console.log("CAJAS ", cajas)
      console.log("Cantidad CAJAS ", cajas.length)
      if (cajas.length == 0) {
        this.toastService.toastError('Solicite la apertura de alguna Caja al Encargado del Local', 3000);
      } else if (cajas.length == 1) {
        // crear movimiento
        this.crearMovimiento(cajas[0].idCaja)
      } else {
        this.cajas = cajas;
        let listaCajas: String = '';
        for (let item of cajas) {
          if (listaCajas == '') {
            listaCajas = String(item.nroCaja);
          } else {
            listaCajas += ` - ${item.nroCaja}`;
          }
        }
        const alert = await this.alertController.create(
          {
          header: 'Seleccione caja',
          message: `Elija la Caja a donde enviará su pago Confirmado de $${this.pago.importeTotalAPagar}. Las Cajas Abiertas son: ${listaCajas}`,
          inputs: [
            {
              name: 'nroCaja',
              type: 'number',
              placeholder: 'Ingrese número de Caja'
            },
          ],
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
              text: 'Confirmar',
              handler: ( input ) => {
                console.log("CAJA SELECCIONADA ", input)
                let idCajaSeleccionada;
                for ( let item of this.cajas) {
                  if (item.nroCaja == input.nroCaja) {
                    idCajaSeleccionada = item.idCaja;
                  }
                  if (idCajaSeleccionada != null) {
                    this.crearMovimiento(idCajaSeleccionada)
                  }
                }
              }
            }
          ],
          cssClass: 'alertPrimary'
        });
        await alert.present();
      }
    });
  }

  crearMovimiento( idCaja ){
    let pathMovimientoCaja = {
      "idCaja": idCaja,
      "idUsuario": this.idCurrentUsuario,
      "idTipoMovimientoCaja": 1,
      "fechaYHoraMovimientoCaja": new Date(),
      "montoMovimientoCaja": this.pago.importeTotalAPagar,
      "descripcionMovimientoCaja": `Confirmado Pago de $${this.pago.importeTotalAPagar} por usuario: ${this.idCurrentUsuario}.`,
      "idPago": Number(this.idPago)
    }
    console.log("PATH MOVIMIENTO ", pathMovimientoCaja)
    this.cajaService.realizarMovimientoCaja(pathMovimientoCaja).then( resp => {
      console.log("REALIZANDO MOVIMIENTO ", resp)
      if (resp!= null && resp != 0) {
        if (resp['tipo'] == 1) {
          this.toastService.toastSuccess(`Se creo satisfactoriamente el movimiento de $${this.pago.importeTotalAPagar} sobre la caja ${idCaja}`, 3000, 'bottom');
          this.cambiarEstadoPedido();
        }
      }
    })
  }

  actualizarPago() {
    let pathPago = {
      idPago: this.idPago,
      confirmado: true
    }
    this.pagoService.updatePago(pathPago).then( resp => {
      console.log("ACTUALIZANOD PAGO ", resp)
      if (resp && resp.tipo == 1) {
        this.toastService.toastSuccess(`Se actualizo correctamente el Pago N°: ${this.idPago}`, 3000, 'top');
        console.log("NAVEGANDO -------------------------------------------------------")
        this.navController.navigateBack('/home');
      } else {
        this.toastService.toastError(`Fallo al actualizar el Pago N°: ${this.idPago}`, 3000, 'top');
      }
    })
  }

  async getFechaYHoraActual() {
    let fechaActual = this.traerFechaActual();
    let horaActual = await this.traerHoraActual();
    
    let fechaYHoraActual = fechaActual + " " + horaActual;
    console.log("fechaYHoraActual: ", fechaYHoraActual);
    return fechaYHoraActual;
  }

  traerFechaActual(){
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
    let fechaDesde = `${yy}-${mes}-${dia}`;
    return fechaDesde;

  }

  async traerHoraActual() {
    let date = new Date();
    let horaActual = await this.tratarFechaProvider.traerTime(date);
    horaActual += ":00";

    return horaActual;
  }
}