import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidoService } from '../../../services/pedido/pedido.service';
import { ProductoService } from '../../../services/producto/producto.service';
import { MenuPromocionService } from '../../../services/menu-promocion/menu-promocion.service';
import { MozoEstadiaService } from '../../../services/mozo-estadia/mozo-estadia';

@Component({
  selector: "app-edit-pedido",
  templateUrl: "./edit-pedido.component.html",
  styleUrls: ["./edit-pedido.component.scss"]
})

export class EditPedidoComponent implements OnInit {
  private idEstadia: number;
  private listaPedidos: any[] = [];
  private precioTotalPedido: number;
  private simbolo: string;
  private listaPedidosmensaje: any[] = [];

  constructor(
    private router: Router,
    private pedidoServicio: PedidoService,
    private activatedRoute: ActivatedRoute,
    private productoService: ProductoService,
    private menuPromocionService: MenuPromocionService,
    private mozoestadiaservicio: MozoEstadiaService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.idEstadia = params.id;
      this.traerPedidos();
    });
  }

  ngOnInit() {}


  async calcularTotalCostoPedido(){
    for (let item of this.listaPedidos) {
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

  async traerPedidos() {
    var menuPromocion;
    var producto;
    await this.mozoestadiaservicio
      .getEstadia(this.idEstadia)
      .then(async (data: any) => {
        // Llamo a un Observer
        if (data != null) {
          this.listaPedidos = data.data.pedidos;

          await this.calcularTotalCostoPedido();
          
          for (let i = 0; i < this.listaPedidos.length; i++) {
            if (this.listaPedidos[i]["pedidoestados"][0].estadopedido.idEstadoPedido == 3) {
              this.listaPedidosmensaje.push(this.listaPedidos[i]);
            }
            this.precioTotalPedido = 0;
            var detalles = this.listaPedidos[i].detallepedidoproductos.length;
            for (let j = 0; j < detalles; j++) {
              if ( this.listaPedidos[i].detallepedidoproductos[j].producto == null) {
                let idMenuPromocion = this.listaPedidos[i].detallepedidoproductos[j].menupromocion.idMenuPromocion;
                await this.menuPromocionService
                  .getMenuPromocion(idMenuPromocion)
                  .then(async (datamp: any) => {
                    menuPromocion = datamp;

                    this.precioTotalPedido += menuPromocion.preciomenupromocions[0].importePrecioMenuPromocion;
                    this.simbolo = menuPromocion.preciomenupromocions[0].tipomoneda.simboloTipoMoneda;
                  });
              } else {
                let idProducto = this.listaPedidos[i].detallepedidoproductos[j].producto.idProducto;
                await this.productoService
                  .getProducto(idProducto)
                  .then(async (datap: any) => {
                    producto = datap;
                    this.precioTotalPedido += producto.precioproductos[0].importePrecioProducto;
                    this.simbolo = producto.precioproductos[0].tipomoneda.simboloTipoMoneda;
                  });
              }
            }
            this.listaPedidos[i].precioTotalPedido = this.precioTotalPedido;
            this.listaPedidos[i].simboloTipoMoneda = this.simbolo;
          }
        }
      });
  }

  buscarPedido(termino: string) {
    if (termino !== "") {
      this.pedidoServicio.getPedidoByAll(termino).subscribe((data: any) => {
        // Llamo a un Observer
        if (data.tipo == 1) {
          this.listaPedidos = data.data;
        } else {
          this.listaPedidos = [];
        }
      });
    } else {
      this.traerPedidos();
    }
  }
  detallePedido(idElemento: number) {
    this.router.navigate([`/detalle_anular_pedido/${idElemento}`]);
  }
  anularPedido(idPedido: number) {
    let _this = this; //Asigno el contexto a una variable, ya que se pierde al ingresar a la función de mensajeria
    const titulo = "Confirmación";
    const mensaje = `¿Está seguro que desea anular el pedido seleccionado?`;
    ($ as any).confirm({
      title: titulo,
      content: mensaje,
      type: "blue",
      typeAnimated: true,
      theme: "material",
      buttons: {
        aceptar: {
          text: "Aceptar",
          btnClass: "btn-blue",
          action: function() {
            let pedidoAnulado: any = {
              idPedido: idPedido,
              idEstadoPedido: 2,
              descripcionPedidoEstado: "Anulado por el Encargado"
            };
            _this.pedidoServicio
              .updatePedidoEstado(pedidoAnulado)
              .then(response => {
                const titulo = "Éxito";
                const mensaje = "Se ha anulado el pedido de forma exitosa";
                ($ as any).confirm({
                  title: titulo,
                  content: mensaje,
                  type: "green",
                  typeAnimated: true,
                  theme: "material",
                  buttons: {
                    aceptar: {
                      text: "Aceptar",
                      btnClass: "btn-green",
                      action: function() {
                        _this.router.navigate(["/search_anular_pedido/"]);
                      }
                    }
                  }
                });
              });
          }
        },
        cerrar: {
          text: "Cerrar",
          action: function() {}
        }
      }
    });
  }
}
