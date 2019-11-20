import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConsultaGestionarEstadiaPage } from './consulta-gestionar-estadia.page';
import { PipesModule } from 'src/app/shared/pipe.module';
import { NgxQRCodeModule } from 'ngx-qrcode2';


const routes: Routes = [
  {
    path: '',
    component: ConsultaGestionarEstadiaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxQRCodeModule,
    PipesModule,
  ],
  declarations: [ConsultaGestionarEstadiaPage]
})
export class ConsultaGestionarEstadiaPageModule {}
