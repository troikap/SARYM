import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Router } from '@angular/router';

import { StorageService, Log } from '../services/storage/storage.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private logueo: Log;

  slides = [
    {
      url: '../../assets/icon/Presentacion/logo-sarym.png'
    },
    {
      url: '../../assets/icon/Presentacion/Desayunos.jpg'
    },
    {
      url: '../../assets/icon/Presentacion/Hamburguesa.jpg'
    },
    {
      url: '../../assets/icon/Presentacion/Pastas.jpg'
    },
    {
      url: '../../assets/icon/Presentacion/Variedades.jpg'
    }
  ];

  constructor(
    private menu: MenuController,
    private usuarioservice: UsuarioService,
    private router: Router,
    private storage: StorageService,
    private navController: NavController
    ) {
    this.loadLog()
  }
  openFirst() {
    this.menu.toggle();
  }

  ngOnInit() {
  }

  async goTo(key: string) {
    await this.loadLog()
    let id = this.logueo.id;
    let page;
    switch (key) {
      case 'registro-usuario':
        page = `/registro-usuario/${id}`;
        break;
      case 'nueva-reserva':
        page = `/crud-gestionar-reserva/0/crear`;
        break;
      case 'unirse-reserva':
        page = `/unirse-gestionar-reserva`;
        break;
      case 'realizar-pedido':
        page = `/seleccion-comensal/1`;
        break;
      // case 'realizar-pedido':
      //   page = `/realizar-pedido`;
      //   break;
      case 'catalogo':
        page = `/catalogo`;
        break;
    }
    this.navController.navigateForward(page)
    // this.router.navigateByUrl(page);
  }

  async loadLog() {
    await this.storage.getCurrentUsuario()
      .then(logs => {
        this.logueo = logs;
        if (!logs) {
          console.log('ERRORR')
        }
      })
  }
}
