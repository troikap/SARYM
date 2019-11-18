import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UnirseReservaEstadiaPage } from './unirse-reserva-estadia.page';

const routes: Routes = [
  {
    path: '',
    component: UnirseReservaEstadiaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UnirseReservaEstadiaPage]
})
export class UnirseReservaEstadiaPageModule {}
