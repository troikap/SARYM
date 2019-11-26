import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListaPedidoPagoPage } from './lista-pedido-pago.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPedidoPagoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListaPedidoPagoPage]
})
export class ListaPedidoPagoPageModule {}
