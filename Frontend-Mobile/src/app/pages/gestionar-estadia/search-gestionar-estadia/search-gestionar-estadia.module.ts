import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchGestionarEstadiaPage } from './search-gestionar-estadia.page';

const routes: Routes = [
  {
    path: '',
    component: SearchGestionarEstadiaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchGestionarEstadiaPage]
})
export class SearchGestionarEstadiaPageModule {}
