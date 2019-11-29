import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment.prod'

@Injectable()
export class SettingsProvider {
  static SETTINGS = 'settings_storage';

  constructor(public storage: Storage) {
    console.log('Hello SettingsProvider Provider');
  }

  setSettings(params: {setting: ISettings}) {
    if (params && params.setting) {
      const settings: ISettings = {
        ip: params.setting.ip,
      }
      environment.urlNgrok = settings.ip;
      return this.storage.set(SettingsProvider.SETTINGS, settings)
    }
  }

  getSettings() {
    return this.storage.get(SettingsProvider.SETTINGS);
  }

}

export interface ISettings {
  ip: string;
}
