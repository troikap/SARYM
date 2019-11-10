import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MostrarMesasPage } from './mostrar-mesas.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarMesasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MostrarMesasPage]
})
export class MostrarMesasPageModule {}
