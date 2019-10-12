import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalDetalleCatalogoPage } from './modal-detalle-catalogo.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDetalleCatalogoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalDetalleCatalogoPage]
})
export class ModalDetalleCatalogoPageModule {}
