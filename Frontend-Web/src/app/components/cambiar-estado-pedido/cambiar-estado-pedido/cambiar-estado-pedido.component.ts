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
  enviarPedido(id:number){
    let newForm={
      idPedido:id,
      idEstadoPedido:3,
      descripcionPedidoEstado:"Se revierte el envio del pedido por parte del cocinero"
    }
    let _this = this;
    const titulo = "Confirmación";
    const mensaje = `¿Está seguro que desea revertir el envio?`;
    ($ as any).confirm({
      title: titulo,
      content: "¿Confirma volver el pedido a elaborar?",
      type: "blue",
      typeAnimated: true,
      theme: "material",
      buttons: {
        aceptar: {
          text: "Aceptar",
          btnClass: "btn-blue",
          action: function() {
            let nuevaCaja: any = {
              idUsuario: localStorage.getItem("idUsuario")
            };
            _this.pedidoServicio.updatePedidoEstado(newForm).then(response => {
              if (response.tipo !== 2) {
                //TODO CORRECTO
                const titulo = "Éxito";
                const mensaje =
                  "Se ha enviado el pedido de forma exitosa";
  
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
                        location.reload();
                      }
                    }
                  }
                });
              } 
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
