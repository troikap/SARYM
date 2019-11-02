import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UnirseGestionarReservaPage } from './unirse-gestionar-reserva.page';

const routes: Routes = [
  {
    path: '',
    component: UnirseGestionarReservaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UnirseGestionarReservaPage]
})
export class UnirseGestionarReservaPageModule {}
