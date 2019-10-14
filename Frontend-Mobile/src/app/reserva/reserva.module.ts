import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReservaPage } from './reserva.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';

const routes: Routes = [
  {
    path: '',
    component: ReservaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxQRCodeModule
  ],
  declarations: [ReservaPage]
})
export class ReservaPageModule {}
