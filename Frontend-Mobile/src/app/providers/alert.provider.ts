import { AlertController } from '@ionic/angular';

export class AlertProvider {

    constructor(
        public alertController: AlertController
        ) { }

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
