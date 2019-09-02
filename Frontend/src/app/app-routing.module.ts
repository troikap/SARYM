import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'logueo', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'mi-saldo', loadChildren: './mi-saldo/mi-saldo.module#MiSaldoPageModule' },
  { path: 'mi-cuenta', loadChildren: './mi-cuenta/mi-cuenta.module#MiCuentaPageModule' },
  { path: 'ionic', loadChildren: './otros/ionic/ionic.module#IonicPageModule' },
  { path: 'alert', loadChildren: './otros/alert/alert.module#AlertPageModule' },
  { path: 'avatar', loadChildren: './otros/avatar/avatar.module#AvatarPageModule' },
  { path: 'botones', loadChildren: './otros/botones/botones.module#BotonesPageModule' },
  { path: 'card', loadChildren: './otros/card/card.module#CardPageModule' },
  { path: 'sumaqr', loadChildren: './sumaqr/sumaqr.module#SumaqrPageModule' },
  { path: 'card-page', loadChildren: './card-page/card-page.module#CardPagePageModule' },
  { path: 'logueo', loadChildren: './logueo/logueo.module#LogueoPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
