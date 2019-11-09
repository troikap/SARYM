import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
// import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    public alertController: AlertController
  ) { }

  async Alert(pTitulo: string, pMensaje: string) {
    const alert = await this.alertController.create({
      header: pTitulo,
      // subHeader: 'Subtitle',
      message: pMensaje,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async Confirm(pTitulo: string, pMensaje: string) {
    const alert = await this.alertController.create({
      header: pTitulo,
      message: pMensaje,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelado');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirmado');
          }
        }
      ]
    });
    await alert.present();
  }

}
