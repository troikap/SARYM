import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SeleccionComensalPagoPage } from './seleccion-comensal-pago.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionComensalPagoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SeleccionComensalPagoPage]
})
export class SeleccionComensalPagoPageModule {}
