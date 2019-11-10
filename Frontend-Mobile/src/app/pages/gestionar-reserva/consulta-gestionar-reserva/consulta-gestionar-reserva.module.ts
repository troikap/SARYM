import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConsultaGestionarReservaPage} from './consulta-gestionar-reserva.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';
// import { AjustarPalabraPipe } from 'src/app/pipes/ajustar-palabra.pipe';
import { CheckNullPipe } from 'src/app/pipes/check-null.pipe';

const routes: Routes = [
  {
    path: '',
    component: ConsultaGestionarReservaPage
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
  declarations: [
    ConsultaGestionarReservaPage,
    // AjustarPalabraPipe,
    CheckNullPipe
  ]
})
export class ConsultaGestionarReservaPageModule {}
