import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RecuperarContraseniaPage } from './recuperar-contrasenia.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarContraseniaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RecuperarContraseniaPage]
})
export class RecuperarContraseniaPageModule {}
