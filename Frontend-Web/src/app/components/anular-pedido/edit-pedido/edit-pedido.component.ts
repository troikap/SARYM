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
  private precioMenuPromocion : number;
  private precioProducto: number;
  
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
   
    this.pedidoServicio.getPedidos()
      .then((data: any) => { // Llamo a un Observer
        if (data != null) {
          this.listaPedidos = data.data;
          
          var length = this.listaPedidos.length;
          for (let i = 0; i < length; i++) {
            var detalles = this.listaPedidos[i].detallepedidoproductos.length;
            console.log(detalles);
            for (let j = 0; j < detalles; j++) {
           if(this.listaPedidos[i].detallepedidoproductos[j].producto == null){
             this.menuPromocionService.getMenuPromocion(this.precioMenuPromocion += this.listaPedidos[i].detallepedidoproductos[j].menupromocion.idMenuPromocion)
             .then((data: any) => {
                var menuPromocion = data.data;
                this.precioMenuPromocion += menuPromocion.preciomenupromocions.importePrecioMenuPromocion;
             });

           }else{
             
           }
            }
          }
          
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
