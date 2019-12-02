import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { SettingsProvider, ISettings } from '../../providers/settings/settings';
// import { StorageProvider } from '../../providers/storage/storage'
import { AppSettings } from '../../app.settings';
// import { ConfigService } from '../../services/config.service';
// import { IConfig } from '../../model/iconfig.model'
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  settings: ISettings;
  // config: IConfig;

  constructor(
    public navCtrl: NavController,
    private settingProvider: SettingsProvider,
    private alertCtrl: AlertController,
    // private storageProvider: StorageProvider,
    private toastCtrl: ToastController,
    // private configService: ConfigService
  ) {
  }

  ngOnInit() {
    console.log('ionViewDidLoad SettingPage');
    setTimeout(() => {
      this.presentPrompt();
    }, 400); // Fix focus out, en el input de password.
  }

  initSetting() {
    console.log("INCICIANDO initSetting")
    this.getSettings();
  }

  getSettings() {
    this.settingProvider.getSettings().then((value: ISettings) => {
      console.log("AAAAAAAAA ",value)
      if (value) {
        console.log("SETTING TRAIDO ",value)
        this.settings = value
      } else {
        this.settings = {
          ip: AppSettings.IP,
        }
        console.log("SETTING CREADO ",this.settings)
      }
    })
  }

  setSettings() {
    return this.settingProvider.setSettings({setting: this.settings});
  }

  private async presentPrompt() {
    const alert = await this.alertCtrl.create({
      message: 'Para modificar la configuración necesita ingresar una contraseña.',
      inputs: [
        {
          name: 'password',
          placeholder: 'Contraseña',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.navCtrl.pop()
          }
        },
        {
          text: 'Ingresar',
          handler: data => {
            if (data.password && data.password == AppSettings.PASSWORD) {
              this.initSetting()
            } else {
              this.presentToastError();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  private async presentToastError() {
    const toast = await this.toastCtrl.create({
      message: 'Contraseña incorrecta',
      duration: 5000,
      position: 'bottom'
    });
    await toast.present();
    this.navCtrl.pop()
  }

  saveChanges() {
    // this.storageProvider.clearStorage().then(() => {
      this.setSettings().then(() => this.saveSuccess()).catch(() => {
        this.errorSave();
        console.log('settings failed');
      });
    // }).catch(() => {
    //   this.errorSave();
    //   console.log('clear failed');
    // })
  }

  private async saveSuccess() {
    const alert = await this.alertCtrl.create({
      message: 'Cambios guardados con éxito',
      buttons: [{
        text: 'Aceptar',
      handler: () => {  
        console.log("SALIENDO DE CONFIGURACION")
        this.navCtrl.navigateRoot(['/logueo']) 
        }
      }]
    })
    await alert.present();
  }

  private async errorSave() {
     const alert = await this.alertCtrl.create({
      message: 'Los cambios no se guardarón',
      buttons:  [{
        text: 'Aceptar',
      handler: () => { this.navCtrl.navigateRoot(['/logueo'])}
      }]
    })
    await alert.present()
  }
}
