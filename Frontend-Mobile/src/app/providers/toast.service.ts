import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    public toastController: ToastController
  ) { }

   // A modo de ejemplo dejo esto por aca... para el malparido del EMILIO GATO
   async toastNoExisteUsuario() {
    const toast = await this.toastController.create({
      message: 'Cuit de Usuario ingresado es incorrecto',
      duration: 3000,
      color: 'warning',
      position: 'middle',
      translucent: true
    });
    toast.present();
  }
  async toastComensalAgregado() {
    const toast = await this.toastController.create({
      message: 'Comensal Agregado',
      duration: 2000,
      color: 'success',
      position: 'middle',
      translucent: true
    });
    toast.present();
  }
  async toastEliminarComensal() {
    const toast = await this.toastController.create({
      message: 'Comensal Eliminado',
      duration: 2000,
      color: 'success',
      position: 'middle',
      translucent: true
    });
    toast.present();
  }
}
