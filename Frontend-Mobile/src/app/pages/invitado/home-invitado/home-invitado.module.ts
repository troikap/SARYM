import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomeInvitadoPage } from './home-invitado.page';

const routes: Routes = [
  {
    path: '',
    component: HomeInvitadoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeInvitadoPage]
})
export class HomeInvitadoPageModule {}
