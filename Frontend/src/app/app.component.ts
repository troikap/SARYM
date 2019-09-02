import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  pages = [
    {
      title: 'Principal',
      url: '/home',
      icon: 'home'
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
          icon: 'logo-ionic'
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
          // icon: '../assets/icon/tucus.jpeg'
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
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
