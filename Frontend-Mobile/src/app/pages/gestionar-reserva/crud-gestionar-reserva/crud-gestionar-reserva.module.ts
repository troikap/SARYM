import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CrudGestionarReservaPage } from './crud-gestionar-reserva.page';

import { BrMaskerModule } from 'br-mask';
import { IonicSelectableModule } from 'ionic-selectable';
// import { AjustarPalabraPipe } from 'src/app/pipes/ajustar-palabra.pipe';
import { PipesModule } from 'src/app/shared/pipe.module';

const routes: Routes = [
  {
    path: '',
    component: CrudGestionarReservaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    BrMaskerModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    PipesModule
  ],
  declarations: [
    CrudGestionarReservaPage
    // AjustarPalabraPipe
  ]
})
export class CrudGestionarReservaPageModule {}
