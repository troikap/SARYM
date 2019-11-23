import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SeleccionComensalPage } from './seleccion-comensal.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionComensalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SeleccionComensalPage]
})
export class SeleccionComensalPageModule {}
