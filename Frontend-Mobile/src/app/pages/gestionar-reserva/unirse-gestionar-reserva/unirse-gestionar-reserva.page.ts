import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Comensal, Reserva } from 'src/app/models/modelos';
import { ReservaService } from 'src/app/services/reserva/reserva.service';

@Component({
  selector: 'app-unirse-gestionar-reserva',
  templateUrl: './unirse-gestionar-reserva.page.html',
  styleUrls: ['./unirse-gestionar-reserva.page.scss'],
})
export class UnirseGestionarReservaPage implements OnInit {

  private datos;
  private valor;
  private qrDataCodify;
  public createdCode;
  private secretCode;
  private nameArray;
  private name;
  public mostrar: boolean = false;
  public variable: boolean = false;
  public scannedCode;
  public idReserva;
  private comensal: Comensal;
  private comensales: Comensal[] = [];
  private tokenReserva;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private alertController: AlertController,
    private navController: NavController,
    public activatedRoute: ActivatedRoute,
    private reservaservicio: ReservaService
  ) { }

  ngOnInit() {
    this.scanCode();
  }

  scanCode() {
    this.barcodeScanner
    .scan()
    .then(barcodeData => {
      console.log("BARCODEDATA 0" , barcodeData)
      this.qrDataCodify = barcodeData.text;
      this.presentAlert();
    })
    .catch(err => {
      console.log('Error', err);
      this.qrDataCodify = 'MS0xLTIwMTktMDktMjMvMjM6Mzk=';
      this.presentAlert()
    });
  }

  async presentAlert() {
    this.secretCode = atob( this.qrDataCodify );
    this.nameArray = this.secretCode.split('@'),
    this.name = this.nameArray[this.nameArray.length - 1];
    const names = this.name;
    const date = this.nameArray[0];
    console.log('secretCode ',this.secretCode);
    console.log('qrDataCodify ',this.qrDataCodify);

    const alert = await this.alertController.create(
      {
      header: 'Leyendo QR',
      message: 'Esto es lo que trae: ' + names + ' ' + date,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel');
            this.navController.navigateForward('/home');
          }
        }, {
          text: 'Unirse',
          handler: () => {
            console.log('Confirm Okay');
            // ACA TENDRIA QUE IR A MOSTRAR LA ESTADIA PARA SELECCIONAR EL COMENSAL
          }
        }
      ]
    });
    // this.pararqr = true;
    await alert.present();
  }
}
