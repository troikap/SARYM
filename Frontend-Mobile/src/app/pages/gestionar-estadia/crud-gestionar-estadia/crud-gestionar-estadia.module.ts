import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CrudGestionarEstadiaPage } from './crud-gestionar-estadia.page';

const routes: Routes = [
  {
    path: '',
    component: CrudGestionarEstadiaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CrudGestionarEstadiaPage]
})
export class CrudGestionarEstadiaPageModule {}
