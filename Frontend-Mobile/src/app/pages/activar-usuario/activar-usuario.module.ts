import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ActivarUsuarioPage } from './activar-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: ActivarUsuarioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ActivarUsuarioPage]
})
export class ActivarUsuarioPageModule {}
