import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VerQrEstadiaPage } from './ver-qr-estadia.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';


const routes: Routes = [
  {
    path: '',
    component: VerQrEstadiaPage
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
  declarations: [VerQrEstadiaPage],
})
export class VerQrEstadiaPageModule {}
