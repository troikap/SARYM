import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss'],
})
export class MensajesComponent implements OnInit {

  constructor(
    public toastController: ToastController,
    public alertController: AlertController
  ) { }

  ngOnInit() {}


    // The color to use from your application's color palette for TOAST. Default options are: "primary", 
  // "secondary", "tertiary", "success", "warning", "danger", "light", "medium", and "dark".

  public async toastPrimary(pMensaje: string) {
    const toast = await this.toastController.create({
      message: pMensaje,
      duration: 3000,
      color: 'primary',
      position: 'middle',
      translucent: true
    });
    toast.present();
  }

  async toastWarning(pMensaje: string) {
    const toast = await this.toastController.create({
      message: pMensaje,
      duration: 3000,
      color: 'warning',
      position: 'middle',
      translucent: true
    });
    toast.present();
  }

  async toastSuccess(pMensaje: string) {
    const toast = await this.toastController.create({
      message: pMensaje,
      duration: 3000,
      color: 'success',
      position: 'middle',
      translucent: true
    });
    toast.present();
  }

  async toastError(pMensaje: string) {
    const toast = await this.toastController.create({
      message: pMensaje,
      duration: 3000,
      color: 'danger',
      position: 'middle',
      translucent: true
    });
    toast.present();
  }

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
