import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { PedidoService } from "../../../services/pedido/pedido.service";
import { ProductoService } from "../../../services/producto/producto.service";
import { MenuPromocionService } from "../../../services/menu-promocion/menu-promocion.service";

@Component({
  selector: "app-detalle-pedido",
  templateUrl: "./detalle-pedido.component.html",
  styleUrls: ["./detalle-pedido.component.scss"]
})
export class DetallePedidoComponent implements OnInit {
  private idPedido: number;
  private pedido: any;
  private precio: number;
  private detallesPedido: any[];
  private simbolo: string;
  
  constructor(
    private router: Router,
    private pedidoServicio: PedidoService,
    private activatedRoute: ActivatedRoute,
    private productoService: ProductoService,
    private menuPromocionService: MenuPromocionService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.idPedido = params.id;

      this.traerPedido(this.idPedido);
    });
  }

  ngOnInit() {}

  async traerPedido(idPedido) {
    var menuPromocion;
    var producto;
    this.pedidoServicio.getPedido(idPedido).then(async (res: any) => {
      this.pedido = res.data;
      this.detallesPedido = this.pedido.detallepedidoproductos;

      for (let i = 0; i < this.detallesPedido.length; i++) {
        this.precio = 0;
        if (this.detallesPedido[i].producto == null) {
          await this.menuPromocionService
            .getMenuPromocion(this.detallesPedido[i].menupromocion.idMenuPromocion)
            .then(async (datamp: any) => {
              menuPromocion = datamp;
              this.precio += menuPromocion.preciomenupromocions[0].importePrecioMenuPromocion;
              this.simbolo = menuPromocion.preciomenupromocions[0].tipomoneda.simboloTipoMoneda;
            });
        } else {
          await this.productoService
            .getProducto(this.detallesPedido[i].producto.idProducto)
            .then(async (datap: any) => {
              producto = datap;
              this.precio += producto.precioproductos[0].importePrecioProducto;
              this.simbolo = producto.precioproductos[0].tipomoneda.simboloTipoMoneda;
            });
        }
        this.detallesPedido[i].precio = this.precio;
        this.detallesPedido[i].precioTotal = this.precio * this.detallesPedido[0].cantidadPedidoProducto;
        this.detallesPedido[i].simboloTipoMoneda = this.simbolo;
      }
    });
  }
  editPedido() {
    this.router.navigate([`/edit_anular_pedido/${this.pedido.idEstadia}`]);
  }
}
