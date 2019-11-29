import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ModalDetalleCatalogoPage } from '../modal/modal-detalle-catalogo/modal-detalle-catalogo.page';


import { IonicModule } from '@ionic/angular';

import { CatalogoPage } from './catalogo.page';

const routes: Routes = [
  {
    path: '',
    component: CatalogoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  // declarations: [CatalogoPage], 
  declarations: [CatalogoPage, ModalDetalleCatalogoPage], 
  entryComponents: [ModalDetalleCatalogoPage],
})
export class CatalogoPageModule {}
