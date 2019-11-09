import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidoService } from '../../../services/pedido/pedido.service';
import * as $ from 'jquery'
import { ProductoService } from '../../../services/producto/producto.service';
import { MenuPromocionService } from '../../../services/menu-promocion/menu-promocion.service';
@Component({
  selector: 'app-edit-pedido',
  templateUrl: './edit-pedido.component.html',
  styleUrls: ['./edit-pedido.component.scss']
})
export class EditPedidoComponent implements OnInit {
  private idEstadia: number;
  private listaPedidos: any[]=[];
  private precioMenuPromocion : number =0;
  private precioProducto: number =0;
  
  constructor(
    private router: Router,
    private pedidoServicio: PedidoService,
    private activatedRoute: ActivatedRoute,
    private productoService: ProductoService,
    private menuPromocionService : MenuPromocionService

  ) {
    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);
      this.idEstadia = params.id;
      
        this.traerPedidos();
      
    });
  }
   

  ngOnInit() {
    this.cargarOnFocus();
  }
  cargarOnFocus() {
    $("#botonBuscar").focus();
  }

  traerPedidos() {
    var menuPromocion;
    var producto;
    this.pedidoServicio.getPedidos()
      .then((data: any) => { // Llamo a un Observer
        if (data != null) {
          this.listaPedidos = data;
          
          var length = this.listaPedidos['data'].length;
          for (let i = 0; i < length; i++) {
            this.precioMenuPromocion =0;
            this.precioProducto=0;
            var detalles = this.listaPedidos['data'][i].detallepedidoproductos.length;
            
            for (let j = 0; j < detalles; j++) {
              
           if(this.listaPedidos['data'][i].detallepedidoproductos[j].producto == null){
             console.log("id Menu Promocion",this.listaPedidos['data'][i].detallepedidoproductos[j].menupromocion.idMenuPromocion);
             this.menuPromocionService.getMenuPromocion(this.listaPedidos['data'][i].detallepedidoproductos[j].menupromocion.idMenuPromocion)
             .then((datamp: any) => {
                menuPromocion = datamp;
                console.log("este es el menu promocion",menuPromocion);
                this.precioMenuPromocion += menuPromocion.preciomenupromocions.importePrecioMenuPromocion;
             });

           }else{
             this.productoService.getProducto(this.listaPedidos['data'][i].detallepedidoproductos[j].producto.idProducto)
             .then((datap: any) => {
               producto = datap;
               this.precioProducto += producto.precioProducto.importePrecioProducto;

             });
           }
            }
           var  precioTotalPedido = this.precioMenuPromocion + this.precioProducto;
            this.listaPedidos['data'][i].push(precioTotalPedido);
            console.log("El precio total es ",precioTotalPedido);

          }
         this.listaPedidos = this.listaPedidos['data'];
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
        this.listaPedidos= data.data;          
      }else{
        this.listaPedidos =[];
      }
    });
  }
  else {
    this.traerPedidos();
  }
}

}
