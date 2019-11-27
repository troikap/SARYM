import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CrudGenerarEstadiaPage } from './crud-generar-estadia.page';
import { PipesModule } from 'src/app/shared/pipe.module';


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
    RouterModule.forChild(routes),
    ReactiveFormsModule,

    PipesModule
  ],
  declarations: [CrudGenerarEstadiaPage]
})
export class CrudGenerarEstadiaPageModule {}
