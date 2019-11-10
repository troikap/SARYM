import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GenerarEstadiaPage } from './generar-estadia.page';

const routes: Routes = [
  {
    path: '',
    component: GenerarEstadiaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GenerarEstadiaPage]
})
export class GenerarEstadiaPageModule {}
