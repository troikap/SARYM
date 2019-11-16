import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidoService } from '../../../services/pedido/pedido.service';
import { ProductoService } from '../../../services/producto/producto.service';
import { MenuPromocionService } from '../../../services/menu-promocion/menu-promocion.service';

@Component({
  selector: 'app-search-actualizar-pedidos',
  templateUrl: './search-actualizar-pedidos.component.html',
  styleUrls: ['./search-actualizar-pedidos.component.scss']
})
export class SearchActualizarPedidosComponent implements OnInit {
  private listaPedidosEnPreparacion: any[] = [];
  private listaPedidosEnviados: any[] = [];
  private listaPedidos: any[] = [];

  constructor(
    
  ) {

  }

  ngOnInit() {
  }
  
}
