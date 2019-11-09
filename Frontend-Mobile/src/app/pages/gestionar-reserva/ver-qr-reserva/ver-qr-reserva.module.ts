import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VerQRReservaPage } from './ver-qr-reserva.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';



const routes: Routes = [
  {
    path: '',
    component: VerQRReservaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxQRCodeModule,
  ],
  declarations: [VerQRReservaPage]
})
export class VerQRReservaPageModule {}
