import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService, Log } from './services/storage/storage.service';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
// import { Deeplinks } from '@ionic-native/deeplinks';
// import { Deeplinks } from '@ionic-native/deeplinks/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  desactivar: boolean = false;

  pages = [
    {
      title: 'Principal',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Carta',
      url: '/catalogo',
      icon: 'clipboard'
    },
    // {
    //   title: 'Mi Saldo',
    //   url: '/mi-saldo',
    //   icon: 'filing'
    // },
    // {
    //   title: 'Camera',
    //   url: '/card-page',
    //   icon: 'beaker',
    // },
    // {
    //   title: 'Options',
    //   children: [
    //     {
    //       title: 'Ionic',
    //       url: '/ionic',
    //       icon: 'settings'
    //     },
    //     {
    //       title: 'Alert',
    //       url: '/alert',
    //       icon: 'logo-google'
    //     },
    //     {
    //       title: 'Avatar',
    //       url: '/avatar',
    //       icon: 'beaker',
    //     },
    //     {
    //       title: 'Botones',
    //       url: '/botones',
    //       icon: 'logo-google',
    //     },
    //     {
    //       title: 'Cards',
    //       url: '/card',
    //       icon: 'beaker',
    //     },
    //   ]
    // },
    {
      title: 'Cerrar Sesión',
      url: '/logueo',
      icon: 'warning',
    },
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: StorageService,
    private menu: MenuController,
    private navController: NavController,
    // private deep: DeeplinksOriginal,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  accion( ruta: string) {
    console.log("RUTA ",ruta)
    if (ruta == '/logueo') {
      this.storage.delOneItem('currentUsuario');
      this.storage.delOneItem('token');
      this.storage.delOneItem('reserva');
      this.storage.delOneItem('estadia');
      this.storage.delOneItem('comensalReserva');
      this.storage.delOneItem('comensalEstadia');
      this.menu.enable(false);
      this.navController.navigateRoot(ruta)
    } else {
      this.navController.navigateForward(ruta)
    }
    // this.router.navigate([ruta])
  }
}
