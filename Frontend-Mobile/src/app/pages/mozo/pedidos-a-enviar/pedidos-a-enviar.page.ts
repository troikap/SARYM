import { Component, OnInit } from '@angular/core';
import { StorageService, Log  } from '../../../services/storage/storage.service';
import { environment } from '../../../../environments/environment';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { Pedido } from 'src/app/models/modelos';

@Component({
  selector: 'app-pedidos-a-enviar',
  templateUrl: './pedidos-a-enviar.page.html',
  styleUrls: ['./pedidos-a-enviar.page.scss'],
})
export class PedidosAEnviarPage implements OnInit {

  token: string;
  pedidos: Pedido[];
  pedidoEstadia: Pedido[];


  constructor(
    private storage: StorageService,
    private pedidoService: PedidoService,
  ) { 
    this.getToken();
  }

  ngOnInit() {
    this.traerPedidosAEnviar();
  }

  async getToken() {
    await this.storage.getOneObject('token')
      .then( resp => {
          this.token = resp;
          this.traerPedidosAEnviar();
          
      })
  }

  traerPedidosAEnviar(){
    this.pedidoService.getPedidosAEnviar()
      .then( ( res: any ) => {
        this.pedidos = res.data;
        this.traerEstadiasDePedidosAEnviar(this.pedidos);
      })
      .catch( err => {
        console.log("Error ", err)
      })
  }

  traerEstadiasDePedidosAEnviar(pedidos){    
      this.pedidoService.getEstadiaPedidosAEnviar(pedidos)
      .then( ( res: any ) => {
        //this.pedidoEstadia = res.data;
        console.log("LA RESPESTA ES", res);
    })
    .catch( err => {
      console.log("Error ", err)
    });
}
}