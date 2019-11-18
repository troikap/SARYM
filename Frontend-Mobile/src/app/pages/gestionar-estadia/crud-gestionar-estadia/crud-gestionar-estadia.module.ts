import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BrMaskerModule } from 'br-mask';
import { PipesModule } from 'src/app/shared/pipe.module';
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
    RouterModule.forChild(routes),
    BrMaskerModule,
    ReactiveFormsModule,
    PipesModule
  ],
  declarations: [CrudGestionarEstadiaPage]
})
export class CrudGestionarEstadiaPageModule {}
