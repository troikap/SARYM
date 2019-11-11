import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PedidoCatalogoPage } from './pedido-catalogo.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoCatalogoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PedidoCatalogoPage]
})
export class PedidoCatalogoPageModule {}
