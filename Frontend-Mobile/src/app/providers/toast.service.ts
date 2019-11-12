import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    public toastController: ToastController
  ) { }

  // The color to use from your application's color palette for TOAST. Default options are: "primary", 
  // "secondary", "tertiary", "success", "warning", "danger", "light", "medium", and "dark".

  public async toastPrimary(pMensaje: string, time: number, position?: any) {
    if(!position) position = "middle";
    const toast = await this.toastController.create({
      message: pMensaje,
      duration: time,
      color: 'primary',
      position: position,
      translucent: true
    });
    toast.present();
  }

  async toastWarning(pMensaje: string, time: number, position?: any) {
    if(!position) position = "middle";
    const toast = await this.toastController.create({
      message: pMensaje,
      duration: time,
      color: 'warning',
      position: position,
      translucent: true
    });
    toast.present();
  }

  async toastSuccess(pMensaje: string, time: number,position?: any) {
    if(!position) position = "middle";
    const toast = await this.toastController.create({
      message: pMensaje,
      duration: time,
      color: 'success',
      position: position,
      translucent: true
    });
    toast.present();
  }

  async toastError(pMensaje: string, time: number, position?: any) {
    // top, bottom and middle
    if(!position) position = "middle";
    const toast = await this.toastController.create({
      message: pMensaje,
      duration: time,
      color: 'danger',
      position: position,
      translucent: true
    });
    toast.present();
  }
}
