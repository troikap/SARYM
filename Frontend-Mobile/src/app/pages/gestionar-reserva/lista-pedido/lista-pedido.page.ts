import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../services/storage/storage.service';
import { ReservaService } from '../../../services/reserva/reserva.service';
import { Reserva, Comensal } from '../../../models/modelos';
import { PedidoService } from '../../../services/pedido/pedido.service';
import { ToastService } from '../../../providers/toast.service';
import { AlertService } from '../../../providers/alert.service';

@Component({
  selector: 'app-lista-pedido',
  templateUrl: './lista-pedido.page.html',
  styleUrls: ['./lista-pedido.page.scss'],
})
export class ListaPedidoPage implements OnInit {

  idReserva;
  idComensal;
  reserva: Reserva;
  comensales: Comensal[];
  mostrar: Boolean[] = [];

  constructor(
    private alertController: AlertController,
    private navController: NavController,
    public activatedRoute: ActivatedRoute,
    private storage: StorageService,
    private reservaservicio: ReservaService,
    private pedidoService: PedidoService,
    private toastService: ToastService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    console.log("PAGE SeleccionComensalPage")
    this.activatedRoute.params
      .subscribe(params => {
        console.log("PARAMETROS ", params)
        this.idReserva = params.idReserva;
        this.idComensal = params.idComensal;
      })
      this.traerReserva();
  }

  ionViewWillEnter(){
    console.log("PRIMERO ")
    this.traerReserva();
  }

  ionViewDidEnter(){
    console.log("SEGUNDO ")
  }

  ionViewWillLeave(){
    console.log("TERCERO ")
  }

  ionViewDidLeave(){
    console.log("CUARTO ")
  }

  traerReserva(){
    this.reservaservicio.getReserva( this.idReserva )
    .then( reserva => {
      console.log("RESERVA ", reserva)
      this.reserva = reserva;
      reserva.pedidos.forEach(element => {
        this.mostrar.push(false);
      });
      this.calcularTotalCostoPedido();
      console.log("Comensales" ,reserva.comensals)
      this.comensales = reserva.comensals
    })
  }

  calcularTotalCostoPedido(){
    for (let item of this.reserva.pedidos) {
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
  }

  eliminarPedido(item) {
    console.log("Logica eliminarPedido")
    this.Confirm("Confirmacion!", "Está seguro que desea eliminar el Pedido?", item)
  }

  crearPedido() {
    console.log("Logica crearComensal")
    let data: {};
    data = {
      "descripcionPedidoEstado": `Pedido creado por comensal ${this.idComensal}`,
      "idComensal": this.idComensal,
      "idReserva": this.idReserva
    }
    this.pedidoService.setPedido( data )
    .then( resp => {
      if ( resp.tipo == 1 ) {
        let codPedido = this.crearCodigoPedido(data, resp);
        let pathCodigo: {} = {idPedido: resp.id, codPedido: codPedido}
        this.pedidoService.updatePedido(pathCodigo)
        .then( res => {
          if ( res.tipo == 1){
            this.toastService.toastSuccess(`Pedido N° ${resp.id} creado!`, 3000)
            this.traerReserva();
          } else {
            this.toastService.toastWarning(`Pedido N° ${resp.id} creado!. No se pudo actualizar Codigo.`, 4000)
          }
        })
      }
    })
  }

  crearCodigoPedido( data, pedido ) {
    let codigo;
    codigo = `P${pedido.id}-R${data.idReserva}-C${data.idComensal}`;
    return codigo
  }

  seleccionarPedido() {
    
  }

  editarPedido( item ) {
    console.log("Editando Pedido", item)
    this.navController.navigateForward([`/pedido-catalogo/comensal/${this.idComensal}/pedido/${item.idPedido}`])
  }

  editarDetalle (item, idPedido) {
    console.log("Editando DETALLE", item)
    let tipo;
    let nombre;
    if (item.idProducto){
      tipo = "Producto";
      nombre = item.producto.nombreProducto;
    } else if (item.menupromocion.tipomenupromocion.nombreTipoMenuPromocion == "Menu") {
      tipo = "Menu";
      nombre = item.menupromocion.nombreMenuPromocion;
    } else {
      tipo = "Promocion";
      nombre = item.menupromocion.nombreMenuPromocion;
    }
    this.ConfirmEdit(`Modificar ${tipo}`, `Desea modificar ${tipo} ${nombre} del pedido N° ${idPedido}? Por favor Ingrese cantidad.`, item, idPedido)
  }

  eliminarDetalle (item, idPedido) {
    console.log("ELIMINADO DETALLE", item)
    let tipo;
    let nombre;
    if (item.idProducto){
      tipo = "Producto";
      nombre = item.producto.nombreProducto;
    } else if (item.menupromocion.tipomenupromocion.nombreTipoMenuPromocion == "Menu") {
      tipo = "Menu";
      nombre = item.menupromocion.nombreMenuPromocion;
    } else {
      tipo = "Promocion";
      nombre = item.menupromocion.nombreMenuPromocion;
    }
    this.ConfirmDelete(`Eliminar ${tipo}!`, `Desea eliminar ${tipo} ${nombre} del pedido N° ${idPedido}?`, item, idPedido)
  }


  async Confirm(pTitulo: string, pMensaje: string, data) {
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
          text: 'Aceptar',
          handler: () => {
            console.log('Confirmado');
              let pathPedidoEstado = {
                idPedido: data.idPedido,
                idEstadoPedido: 2,
                descripcionPedidoEstado: `Eliminado por comensal ${this.idComensal}.`
              }
              this.pedidoService.cambiarEstado( pathPedidoEstado)
              .then( res => {
                if (res.tipo == 1){
                  this.toastService.toastSuccess(`Pedido N° ${data.idPedido} Anulado!`, 3000)
                } else {
                  this.toastService.toastWarning(`Problemas al intentar anular Pedido N° ${data.idPedido}.`, 4000)
                }
                this.traerReserva();
              })
          }
        }
      ]
    });
    await alert.present();
  }

  async ConfirmEdit(pTitulo: string, pMensaje: string, data, idPedido) {
    const alert = await this.alertController.create({
      header: pTitulo,
      message: pMensaje,
      inputs: [
        {
          name: 'cantidad',
          type: 'number',
          value: data.cantidadPedidoProducto,
          placeholder: 'Ingrese Cantidad'
        },
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
            console.log("DATA ", data)
            let tipo;
            let nombre;
            if (data.idProducto) {
              tipo = 'idProducto';
              nombre = 'Producto';
            } else {
              tipo = 'idMenuPromocion';
              nombre = data.menupromocion.tipomenupromocion.nombreTipoMenuPromocion
            }
            let pathDetalle = { idPedido: idPedido, detalle: [ {idDetallePedidoProducto: data.idDetallePedidoProducto, cantidadPedidoProducto: info.cantidad} ]}
            console.log("pathDetalle ", pathDetalle)
            this.pedidoService.setDetallePedidoProducto( pathDetalle )
            .then( res => {
              console.log("resssss ----- ", res)
              if ( res.tipo == 1){
                this.toastService.toastSuccess(`Detalle modificado!. Cantidad del ${nombre} cambiado en su Pedido.`, 3000)
              } else {
                this.toastService.toastWarning(`Detalle no se pudo editar`, 4000)
              }
              this.traerReserva();
            })
          }
        }
      ]
    });
    await alert.present();
  }

  async ConfirmDelete(pTitulo: string, pMensaje: string, data, idPedido) {
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
          text: 'Aceptar',
          handler: (  ) => {
            let nombre;
            if (data.idProducto) {
              nombre = 'Producto';
            } else {
              nombre = data.menupromocion.tipomenupromocion.nombreTipoMenuPromocion
            }
            let pathDetalle = { idPedido: idPedido, detalle: [ {idDetallePedidoProducto: data.idDetallePedidoProducto, baja: true} ]}
            console.log("pathDetalle ", pathDetalle)
            this.pedidoService.setDetallePedidoProducto( pathDetalle )
            .then( res => {
              if ( res.tipo == 1){
                this.toastService.toastSuccess(`Detalle eliminado!. ${nombre} se borro correctamente del Pedido.`, 3000)
              } else {
                this.toastService.toastWarning(`Detalle no se pudo eliminar`, 4000)
              }
              this.traerReserva();
            })
          }
        }
      ]
    });
    await alert.present();
  }
}
