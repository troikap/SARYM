import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConsultaGestionarEstadiaPage } from './consulta-gestionar-estadia.page';

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
    RouterModule.forChild(routes)
  ],
  declarations: [ConsultaGestionarEstadiaPage]
})
export class ConsultaGestionarEstadiaPageModule {}
