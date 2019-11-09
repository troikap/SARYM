import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PedidosAEnviarPage } from './pedidos-a-enviar.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosAEnviarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PedidosAEnviarPage]
})
export class PedidosAEnviarPageModule {}
