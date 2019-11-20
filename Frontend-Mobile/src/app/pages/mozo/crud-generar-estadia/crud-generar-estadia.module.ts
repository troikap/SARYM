import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CrudGenerarEstadiaPage } from './crud-generar-estadia.page';

const routes: Routes = [
  {
    path: '',
    component: CrudGenerarEstadiaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CrudGenerarEstadiaPage]
})
export class CrudGenerarEstadiaPageModule {}
