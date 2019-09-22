import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NuevaReservaPage } from './nueva-reserva.page';

import { BrMaskerModule } from 'br-mask';

const routes: Routes = [
  {
    path: '',
    component: NuevaReservaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    BrMaskerModule,
    ReactiveFormsModule
  ],
  declarations: [NuevaReservaPage]
})
export class NuevaReservaPageModule {}
