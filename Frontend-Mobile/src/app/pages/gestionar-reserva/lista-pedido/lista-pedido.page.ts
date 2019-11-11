import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../services/storage/storage.service';
import { ReservaService } from '../../../services/reserva/reserva.service';
import { Reserva, Comensal } from '../../../models/modelos';

@Component({
  selector: 'app-lista-pedido',
  templateUrl: './lista-pedido.page.html',
  styleUrls: ['./lista-pedido.page.scss'],
})
export class ListaPedidoPage implements OnInit {

  idReserva;
  idComensal;
  reserva: Reserva;
  comensales: Comensal[]

  constructor(
    private alertController: AlertController,
    private navController: NavController,
    public activatedRoute: ActivatedRoute,
    private storage: StorageService,
    private reservaservicio: ReservaService,
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

  traerReserva(){
    this.reservaservicio.getReserva( this.idReserva )
    .then( reserva => {
      console.log("RESERVA ", reserva)
      this.reserva = reserva;
      this.calcularTotalCostoPedido();
      console.log("Comensales" ,reserva.comensals)
      this.comensales = reserva.comensals
    })
  }

  calcularTotalCostoPedido(){
    for (let item of this.reserva.pedidos) {
      let importe;
      for (let elem of item.detallepedidoproductos) {
        console.log("elemento de detalle ", elem)
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

  eliminarPedido() {
    console.log("Logica eliminarPedido")
  }

  crearComensal() {
    console.log("Logica crearComensal")
  }

  seleccionarPedido() {
    
  }
}
