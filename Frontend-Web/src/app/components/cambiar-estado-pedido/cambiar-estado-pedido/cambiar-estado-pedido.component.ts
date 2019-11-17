import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidoService } from '../../../services/pedido/pedido.service';
import { ProductoService } from '../../../services/producto/producto.service';
import { MenuPromocionService } from '../../../services/menu-promocion/menu-promocion.service';
import { MozoEstadiaService } from '../../../services/mozo-estadia/mozo-estadia';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cambiar-estado-pedido',
  templateUrl: './cambiar-estado-pedido.component.html',
  styleUrls: ['./cambiar-estado-pedido.component.scss']
})
export class CambiarEstadoPedidoComponent implements OnInit {
  private listaPedidosEnviados: any[] = [];
  private listaPedidos: any[] = [];
  private horaActual: Date = new Date()
  
  

  constructor(
    private router: Router,
    private pedidoServicio: PedidoService,
    private activatedRoute: ActivatedRoute,
    private productoService: ProductoService,
    private menuPromocionService: MenuPromocionService,
    private mozoestadiaservicio: MozoEstadiaService,
    private datePipe: DatePipe
  ) {
    setInterval( () => { 
      location.reload()}, 10000);
   }

  ngOnInit() {
    this.traerPedidos();
  }
  
  traerPedidos() {
    console.log(this.datePipe.transform(this.horaActual,
      "h:mm"))
    this.pedidoServicio.getPedidos().then((data: any) => {
      this.listaPedidos = data.data;
      for (let item of this.listaPedidos) {
        let estadoPedido = item['pedidoestados'][0].estadopedido.idEstadoPedido;
        if (estadoPedido == 4) { 
          this.mozoestadiaservicio.getEstadia(item.idEstadia).then((dataEstadia: any) => {
           for(let i of dataEstadia.data['detalleestadiamesas']){
            
             let mesas:any[]=[];
             mesas.push(i.mesa.nroMesa);
             item.mesas = mesas.join();
           }
          })
          this.listaPedidosEnviados.push(item);          
        }
      }
    })
  }
}
