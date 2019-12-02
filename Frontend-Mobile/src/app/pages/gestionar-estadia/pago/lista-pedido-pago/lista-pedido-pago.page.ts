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
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MesaService } from '../../../../services/mesa/mesa.service';


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
  public ver;
  public from;
  public nombreUsuario;
  public pathDetalleComensalUsuario: {idEstadia: number, detalle: [{aliasComensal: string, edadComensal: number, idUsuario?: number}]};
  public mostrar: any[] = [];
  public listaPedidos: Pedido[] = [];
  public form: FormGroup;
  public medioPago;

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
  private formBuilder: FormBuilder,
  private mesaService: MesaService,

  ) {
    this.form = this.formBuilder.group({
      formaPago: ['', Validators.required],
      tipoTarjeta: ['', Validators.required],
      tipoPago: ['', Validators.required],
      numTarjeta: ['', Validators.compose([Validators.required, Validators.min(1000000000000000), Validators.max(9999999999999999)])],
      dniTitular: ['', Validators.compose([Validators.required, Validators.min(1000000), Validators.max(50000000)])],
      nomApeTarjeta: ['', Validators.required],
      fechaExpiracion: ['', Validators.compose([Validators.required, Validators.pattern('^(([0][1-9])|([1][0-2]))\/([2][0-5])$')])],
      codSeguridad: ['', Validators.compose([Validators.required, Validators.min(99), Validators.max(999)])],
    });
  }
  prueba() {
    console.log(" OK ", this.form)
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

  loadCurrentUsuario() {
    this.storage.getCurrentUsuario().then((data) => {
      let currentUsuario: any = data;
      this.nombreUsuario = currentUsuario.rolUsuario;
    });
  }

  async realizarPago() {
    console.log("REALIZAR PAGO")
    let MP;
    if (this.medioPago == 'tarjeta') {
      MP = 2;
    } else if ( this.medioPago == 'efectivo') {
      MP = 1
    } else {
      console.log("SE ESTA SELECCIONANDO MAL EL MEDIO DE PAGO")
    }
    let importeTotalPago = 0;
    for (let item of this.listaPedidos) {
      importeTotalPago += Number(item.importeTotal);
    }
    let pathPago = {
      importeTotalAPagar: importeTotalPago,
      idMedioPago: MP,
      idComensal: Number(this.idComensal),
    }
    await this.pagoService.setPago(pathPago).then( async respuesta => {
      if ( respuesta && respuesta.tipo == 1) {
        let detalle = [];
        for (let pedido of this.listaPedidos) {
          detalle.push( {idPedido: pedido.idPedido, importePagoPedido: Number(pedido.importeTotal)})
        }
        let pathPedidoPago = {idPago: respuesta.id, detalle: detalle};
        await this.pagoService.setPagoPedido(pathPedidoPago).then( async resp => {
          if ( resp && resp.tipo == 1 ) {
            this.loaderService.presentLoading('Realizando Pago. Por favor, aguarde un momento', 5000).then( () => {
              this.toastService.toastSuccess(`Se realizo correctamente el Pago. N° de Pago: ${respuesta.id}`, 3000);
              this.navController.navigateBack(`/lista-pago/${this.idEstadia}`)
            })
            let count = 1;
            for (let element of detalle ) {
              let pathPedido = {
                idPedido: element.idPedido,
                idEstadoPedido: 6,
                descripcionPedidoEstado: `Pagado: $${element.importePagadoPedido}`
              }
              await this.pedidoService.cambiarEstado(pathPedido).then( async resp => {
                if ( resp && resp.tipo == 1 ) {
                  console.log("PEDIDO Actualizados Correctamente")
                  let pathActualizarFechaFin = {
                    fechaYHoraFinPedido: 'aaa'                                                                                // ACA EMILIO
                  }
                  // SERVICIO DE ACTUALIZAR DATOS DEL PEDIDO .....
                } else {
                  console.log("NO se pudo actualizar PEDIDO ")
                }
                if (detalle.length == count) {
                  this.cambiarEstadoMesas(this.estadia)
                }
              })
              count += 1;
            }
          } else {
            console.log("ERROr")
            this.toastService.toastError('Ocurrió un error al crearse el Detalle del Pago', 2000);
          }
        })
      } else {
        console.log("ERROr")
        this.toastService.toastError('Ocurrió un error al crearse el Pago', 2000);
      }
    })
  }

  async cambiarEstadoMesas(item) {
    await this.estadiaService.getEstadia(item.idEstadia).then( async estadia => {
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

  handlerNumeroTarjeta() {
    let num = this.form.value.numTarjeta;
    if ( String(num).length > 16 ) {
      let nuevoNumero = String(num).slice(0,16);
      this.form.controls.numTarjeta.setValue( Number(nuevoNumero))
    }
  }

  cambiarMedioPago( evento ){
    this.medioPago = evento.detail.value;
  }

  agregarPedido( item ) {
    this.listaPedidos.push(item);
    let newPedidos = [];
    for (let element of this.pedidos){
      if (element.idPedido != item.idPedido) {
        newPedidos.push(element);
      }
    }
    this.pedidos = newPedidos;
    console.log("PEDIDOS ---------- ", this.pedidos)
    console.log("ITEM  ---------- ", this.listaPedidos)
  }

  eliminarPedido( item ) {
    this.pedidos.push(item);
    let newPedidos = [];
    for (let element of this.listaPedidos){
      if (element.idPedido != item.idPedido) {
        newPedidos.push(element);
      }
    }
    this.listaPedidos = newPedidos;
    console.log("PEDIDOS ---------- ", this.pedidos)
    console.log("ITEM  ---------- ", this.listaPedidos)
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
}
        