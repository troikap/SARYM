import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario/usuario.service';
import { logging } from 'protractor';

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

  constructor(private menu: MenuController,
    private usuarioservice: UsuarioService) {
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
  

}
