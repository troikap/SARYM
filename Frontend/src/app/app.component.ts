import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { StorageService, Log } from './services/storage/storage.service';
import { MenuController } from '@ionic/angular';

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
      title: 'Catálogo',
      url: '/catalogo',
      icon: 'clipboard'
    },
    {
      title: 'Mi Saldo',
      url: '/mi-saldo',
      icon: 'filing'
    },
    {
      title: 'Camera',
      url: '/card-page',
      icon: 'beaker',
    },
    {
      title: 'Options',
      children: [
        {
          title: 'Ionic',
          url: '/ionic',
          icon: 'settings'
        },
        {
          title: 'Alert',
          url: '/alert',
          icon: 'logo-google'
        },
        {
          title: 'Avatar',
          url: '/avatar',
          icon: 'beaker',
        },
        {
          title: 'Botones',
          url: '/botones',
          icon: 'logo-google',
        },
        {
          title: 'Cards',
          url: '/card',
          icon: 'beaker',
        },
      ]
    },
    {
      title: 'Cerrar Sesión',
      url: '/logueo',
      icon: 'warning',
    },
  ];
  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: StorageService,
    private menu: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    // this.traerCurrentUsuario();
  }

  prueba( ruta: string) {
    if (ruta == '/logueo') {
      this.storage.delOneItem('currentUsuario');
      this.menu.enable(false);
    }
    this.router.navigate([ruta])
  }
}
