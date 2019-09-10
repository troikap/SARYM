import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario/usuario.service';
import { logging } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

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
    private router: Router,) {
  }

  openFirst() {
    this.menu.toggle();
  }

  OnInit(){}
getUsuario(id){
  this.usuarioservice.getUsuario(id);

}

  async getUsuarios() {
  let datos = await this.usuarioservice.getUsuarios();
  }

  goTo(key: string) {
    let page;

    switch (key) {
      case 'registro-usuario':
        page = '/registro-usuario/1';
        break;
    }

    this.router.navigateByUrl(page);
  }
  

}
