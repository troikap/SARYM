import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchGestionarReservaPage } from './search-gestionar-reserva.page';

const routes: Routes = [
  {
    path: '',
    component: SearchGestionarReservaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchGestionarReservaPage]
})
export class SearchGestionarReservaPageModule {}
