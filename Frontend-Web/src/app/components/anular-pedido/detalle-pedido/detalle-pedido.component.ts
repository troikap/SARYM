import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidoService } from '../../../services/pedido/pedido.service';
import { ProductoService } from '../../../services/producto/producto.service';
import { MenuPromocionService } from '../../../services/menu-promocion/menu-promocion.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.scss']
})
export class DetallePedidoComponent implements OnInit {
private idPedido: number;
private pedido: any;
private precio: number;
private detallesPedido : any[];
private simbolo: string;
  constructor(
    private router: Router,
    private pedidoServicio: PedidoService,
    private activatedRoute: ActivatedRoute,
    private productoService: ProductoService,
    private menuPromocionService: MenuPromocionService
  ) { 
    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);
      this.idPedido = params.id;

      this.traerPedido(this.idPedido);

    });
  }

  ngOnInit() {
  }
  async traerPedido(idPedido) {  
    let _this = this;
    var menuPromocion;
    var producto;  
    _this.pedidoServicio.getPedido(idPedido)
      .then(async (res: any) => {
       
        _this.pedido =  res.data;
        _this.detallesPedido = _this.pedido.detallepedidoproductos;
        console.log(res);
        
        var length = _this.detallesPedido.length;
          for (let i = 0; i < length; i++) {
            _this.precio = 0;

              if (_this.detallesPedido[i].producto == null) {
                await _this.menuPromocionService.getMenuPromocion(_this.detallesPedido[i].menupromocion.idMenuPromocion)
                  .then(async (datamp: any) => {
                    menuPromocion = datamp;

                    _this.precio += menuPromocion.preciomenupromocions[0].importePrecioMenuPromocion;
                    _this.simbolo = menuPromocion.preciomenupromocions[0].tipomoneda.simboloTipoMoneda;
                  });

              } else {
                await _this.productoService.getProducto(_this.detallesPedido[i].producto.idProducto)
                  .then(async (datap: any) => {
                    producto = datap;
                    _this.precio += producto.precioproductos[0].importePrecioProducto;
                    _this.simbolo = producto.precioproductos[0].tipomoneda.simboloTipoMoneda;

                  });
              }

            

              _this.detallesPedido[i].precio = _this.precio;
              _this.detallesPedido[i].simboloTipoMoneda = _this.simbolo;
            console.log("El precio total es ", _this.precio);
          }
      })

  }
  editPedido() {
      

  this.router.navigate( [`/edit_anular_pedido/${this.pedido.idEstadia}`] );

  }

  
}
