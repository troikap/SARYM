import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UsuarioServiceService } from '../services/usuario-service.service';

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
    private usuarioservice: UsuarioServiceService) {
  }

  openFirst() {
    this.menu.toggle();
  }

  verusuario(){
    this.usuarioservice.getUsers()
    .then( algo => {
      console.log("Hola servicio : ", algo);
    });
  }

}
