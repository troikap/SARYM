import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DatePipe } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sumaqr',
  templateUrl: './sumaqr.page.html',
  styleUrls: ['./sumaqr.page.scss'],
})
export class SumaqrPage implements OnInit {
  qrData = null;
  qrDataCodify = null;
  createdCode = null;
  scannedCode = null;
  name = null;
  nameArray= null;
  valor = null;
  secretCode = null;
  id = null;
  pararqr = false;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private datePipe: DatePipe,
    private alertController: AlertController,
    ) {
  }

  ngOnInit() {}

  createCode() {
    this.valor = `${this.datePipe.transform( new Date(), 'MMM d, y, h:mm:ss a')}@${this.qrData}`;
    this.qrDataCodify = btoa( this.valor );
    this.createdCode = this.qrDataCodify;
    if (!this.pararqr){
      this.pararqr = true;
    }
    if (this.pararqr) {
      if (this.id) {
        clearInterval(this.id);
      }
      this.id = setInterval(() => {
      if (this.valor && this.pararqr) {
        this.createCode();
        }
      }, 3000);
    }
  }

  scanCode() {
    this.barcodeScanner
    .scan()
    .then(barcodeData => {
      this.qrDataCodify = barcodeData.text;
      this.presentAlert();
    })
    .catch(err => {
      console.log('Error', err);
    });
  }

  async presentAlert() {
    this.secretCode = atob( this.qrDataCodify );
    this.nameArray = this.secretCode.split('@'),
    this.name = this.nameArray[this.nameArray.length - 1];
    const names = this.name;
    const date = this.nameArray[0];
    if (this.id) {
      clearInterval(this.id);
    }
    const alert = await this.alertController.create(
      {
      header: 'Leyendo QR',
      message: 'Esto es lo que trae: ' + names + ' ' + date,
      buttons: ['OK']
    });
    this.pararqr = true;
    await alert.present();
  }

}
