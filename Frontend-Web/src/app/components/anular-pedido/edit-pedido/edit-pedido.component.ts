import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidoService } from '../../../services/pedido/pedido.service';
import { ProductoService } from '../../../services/producto/producto.service';
import { MenuPromocionService } from '../../../services/menu-promocion/menu-promocion.service';
import { MozoEstadiaService } from '../../../services/mozo-estadia/mozo-estadia';
@Component({
  selector: 'app-edit-pedido',
  templateUrl: './edit-pedido.component.html',
  styleUrls: ['./edit-pedido.component.scss']
})
export class EditPedidoComponent implements OnInit {
  private idEstadia: number;
  private listaPedidos: any[] = [];
  private precioTotalPedido: number;
  private simbolo: string;
  private listaPedidosmensaje : any[]=[];

  constructor(
    private router: Router,
    private pedidoServicio: PedidoService,
    private activatedRoute: ActivatedRoute,
    private productoService: ProductoService,
    private menuPromocionService: MenuPromocionService,
    private mozoestadiaservicio: MozoEstadiaService

  ) {
    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);
      this.idEstadia = params.id;

      this.traerPedidos();

    });
  }


  ngOnInit() {
   
  }
 

  async traerPedidos() {
    let _this = this;
    var menuPromocion;
    var producto;
    await this.mozoestadiaservicio.getEstadia(this.idEstadia)
      .then(async (data: any) => { // Llamo a un Observer
        if (data != null) {
          this.listaPedidos = data.data.pedidos;

          var length = this.listaPedidos.length;
          for (let i = 0; i < length; i++) {
            if(this.listaPedidos[i]['pedidoestados'][0].estadopedido.idEstadoPedido ==3){
              this.listaPedidosmensaje.push(this.listaPedidos[i]);
             }
            _this.precioTotalPedido = 0;
            var detalles = this.listaPedidos[i].detallepedidoproductos.length;
            for (let j = 0; j < detalles; j++) {

              if (_this.listaPedidos[i].detallepedidoproductos[j].producto == null) {
                console.log("id Menu Promocion", this.listaPedidos[i].detallepedidoproductos[j].menupromocion.idMenuPromocion);
                await _this.menuPromocionService.getMenuPromocion(_this.listaPedidos[i].detallepedidoproductos[j].menupromocion.idMenuPromocion)
                  .then(async (datamp: any) => {
                    menuPromocion = datamp;

                    _this.precioTotalPedido += menuPromocion.preciomenupromocions[0].importePrecioMenuPromocion;
                    _this.simbolo = menuPromocion.preciomenupromocions[0].tipomoneda.simboloTipoMoneda;
                    
                  });

              } else {
                await _this.productoService.getProducto(_this.listaPedidos[i].detallepedidoproductos[j].producto.idProducto)
                  .then(async (datap: any) => {
                    producto = datap;
                    _this.precioTotalPedido += producto.precioproductos[0].importePrecioProducto;
                    _this.simbolo = producto.precioproductos[0].tipomoneda.simboloTipoMoneda;

                  });
              }

            }

            _this.listaPedidos[i].precioTotalPedido = _this.precioTotalPedido;
            _this.listaPedidos[i].simboloTipoMoneda = _this.simbolo;
            console.log("El precio total es ", _this.precioTotalPedido);
          }
          console.log(this.listaPedidos);
        }
      });

  }

  buscarPedido(termino: string) {

    console.log(termino);

    if (termino !== "") {
      this.pedidoServicio.getPedidoByAll(termino)
        .subscribe((data: any) => { // Llamo a un Observer
          console.log(data.data);
          if (data.tipo == 1) {
            console.log("RESULT ----------------->", data);
            this.listaPedidos = data.data;
          } else {
            this.listaPedidos = [];
          }
        });
    }
    else {
      this.traerPedidos();
    }
  }
  detallePedido(idElemento: number) {
    console.log("idElemento: ", idElemento);  

  this.router.navigate( [`/detalle_anular_pedido/${idElemento}`] );

  }
  anularPedido(idPedido: number){
    let _this = this; //Asigno el contexto a una variable, ya que se pierde al ingresar a la función de mensajeria
    const titulo = "Confirmación";
    const mensaje = `¿Está seguro que desea anular el pedido seleccionado?`;
               
      ($ as any).confirm({
        title: titulo,
        content: mensaje,
        type: 'blue',
        typeAnimated: true,
        theme: 'material',
        buttons: {
          aceptar: {
            text: 'Aceptar',
            btnClass: 'btn-blue',
            action: function () {
              let pedidoAnulado: any = {
                idPedido: idPedido,       
                idEstadoPedido: 2,
                descripcionPedidoEstado: "Anulado por el Encargado"      
        
              }
              
                _this.pedidoServicio.updatePedidoEstado(pedidoAnulado)
                  .then((response) => {
                    console.log("ACTUALIZADO", response);

                    const titulo = "Éxito";
                    const mensaje = "Se ha anulado el pedido de forma exitosa";

                    ($ as any).confirm({
                      title: titulo,
                      content: mensaje,
                      type: 'green',
                      typeAnimated: true,
                      theme: 'material',
                      buttons: {
                        aceptar: {
                          text: 'Aceptar',
                          btnClass: 'btn-green',
                          action: function () {
                            //ACCION
                            _this.router.navigate(['/search_anular_pedido/']);


                          }
                        }
                      }
                    });


                  })
              
                

            }
          },
          cerrar: {
            text: 'Cerrar',
            action: function () {
              console.log("Edición Cancelada");
            }
          }
        }
      });

  }
}
