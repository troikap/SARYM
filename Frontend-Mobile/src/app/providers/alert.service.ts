import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    public alertController: AlertController
  ) { }

  async emilioGato( ) {
    const alert = await this.alertController.create({
      header: 'Emilio Gato',
      message: `Emilio Sos un Gato`,
      buttons: ['OK'],
      cssClass: 'alert',
    });
    await alert.present();
  }

  async alert( algo) {
    if (1) {
      const alert = await this.alertController.create({
        header: algo,
        message: `${algo}`,
        buttons: ['OK'],
        cssClass: 'alert',
      });
      await alert.present();
    } 
    if (2) {
      const alert = await this.alertController.create({
        header: algo,
        message: algo,
        buttons: ['OK'],
        cssClass: 'alert',
      });
      await alert.present();
    } 
    if (3){
      const alert = await this.alertController.create({
        header: algo,
        message: algo,
        buttons: ['OK'],
        cssClass: 'alert',
      });
      await alert.present();
    }
  }

  async alertRol( error ) {
      const alert = await this.alertController.create({
        header: error,
        message: error,
        buttons: ['OK'],
        cssClass: 'alert',
      });
      await alert.present();
    } 
}
