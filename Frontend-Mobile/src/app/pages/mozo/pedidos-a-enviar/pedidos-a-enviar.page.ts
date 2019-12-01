import { Component, OnInit } from '@angular/core';
import { StorageService, Log  } from '../../../services/storage/storage.service';
import { environment } from '../../../../environments/environment';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { Pedido } from 'src/app/models/modelos';
import { EstadiaService } from '../../../services/estadia/estadia.service';
import { ToastService } from "../../../providers/toast.service";

@Component({
  selector: 'app-pedidos-a-enviar',
  templateUrl: './pedidos-a-enviar.page.html',
  styleUrls: ['./pedidos-a-enviar.page.scss'],
})
export class PedidosAEnviarPage implements OnInit {
/* CU 11-CONSULTAR PEDIDOS ESTADIA A ENVIAR
   Y CU 15-ENTREGAR PEDIDO
*/

  token: string;
  pedidos: Pedido[];
  pedidoEstadia: Pedido[];
  intervalo;
  mostrar=[];
  mostrarDetalle = false;

  constructor(
    private storage: StorageService,
    private pedidoService: PedidoService,
    private estadiaService: EstadiaService,
    private toastService: ToastService
    ) { 
    this.getToken();
  }

  ngOnInit() {
    this.setearIntervalo();
  }

  // Limpia el Intervalo
  ngOnDestroy() {
    clearInterval(this.intervalo);
  }

  async getToken() {
    await this.storage.getOneObject('token')
      .then( resp => {
          this.token = resp;
          this.traerPedidosAEnviar();
      })
  }

  setearIntervalo() {
    this.intervalo = setInterval( () => {
      console.log("EJECUTANDO INTERVALO")
      this.traerPedidosAEnviar()
    }, 5000);
  }

  traerPedidosAEnviar(){
    this.pedidoService.getPedidosAEnviar()
      .then( ( res: any ) => {
        if ( res ) {
          this.pedidos = res;
          this.traerMesasPorEstadia();
        }
      })
      .catch( err => {
        console.log("Error ", err)
      })
  }

  traerMesasPorEstadia () {
    for ( let item of this.pedidos ) {
      this.estadiaService.getEstadia(Number(item.idEstadia)).then( estadia => {
        if ( estadia ) {
          let mesas = '';
          for (let det of estadia.detalleestadiamesas) {
            if (mesas == '') {
              mesas = String(det.mesa.nroMesa);
            } else {
              mesas += ` - ${String(det.mesa.nroMesa)}`
            }
          }
          item['mesas'] = mesas;
        }
      })
    }
  }

pedidoEntregado(item) {
  let pathPedido = {
    idPedido: item.idPedido,
    idEstadoPedido: 5,
    descripcionPedidoEstado: "Entregado Correctamente"
  }
  this.pedidoService.cambiarEstado(pathPedido).then( resp => {
    if ( resp ) {
      if ( resp.tipo == 1 ) {
        this.toastService.toastSuccess(`Se entregó correctamente el Pedido N° ${item.idPedido}`, 2000);
        this.traerPedidosAEnviar();
      } else {
        this.toastService.toastSuccess(`No se pudo modificar el Pedido N° ${item.idPedido}`, 2000);
      }
    } else {
      this.toastService.toastError('Problemas al intentar conectarse', 2500);
    }
  })
}
}