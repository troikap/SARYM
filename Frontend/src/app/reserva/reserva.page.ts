import { Component, OnInit } from '@angular/core';
import { EnvioReservaService } from '../services/envio-reserva/envio-reserva.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {

  private datos;
  private valor;
  private qrDataCodify;
  private createdCode;
  private secretCode;
  private nameArray;
  private name;
  private mostrar: boolean = false;
  private variable: boolean = false;

  constructor(
    private envioReservaService: EnvioReservaService,
    private barcodeScanner: BarcodeScanner,
    private alertController: AlertController,
    private navController: NavController
  ) { 
    this.envioReservaService.$getObjectSource
    .subscribe( data => {
      console.log("DATA", data)
      if (Object.keys(data).length === 0) {
        this.variable = false;
        this.scanCode();
      } else {
        this.variable = true;
        this.datos = data
      }
    })
    .unsubscribe() // para evitar duplicidad
  }

  ngOnInit() {
    // this.datos = null;
    
  }

  createCode() {
    console.log('Creando QR');
    this.valor = `${this.datos.fechaReserva}@${this.datos.idTraidoBackEnd}`;
    this.qrDataCodify = btoa( this.valor );
    this.createdCode = this.qrDataCodify;
    
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
    });
  }

  async presentAlert() {
    this.secretCode = atob( this.qrDataCodify );
    this.nameArray = this.secretCode.split('@'),
    this.name = this.nameArray[this.nameArray.length - 1];
    console.log('name ',this.name);
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
            this.navController.navigateBack('/home');
          }
        }, {
          text: 'Unirse',
          handler: () => {
            console.log('Confirm Okay');
            this.traerReserva(Number(names))
          }
        }
      ]
    });
    // this.pararqr = true;
    await alert.present();
  }

  traerReserva( id: number ) {
    this.datos = {
    cantidadComensal: "12",
    comensales:  [
      {
      aliasComensal: "Lucas",
      edadComensal: 27,
      idUsuario: 1
      },
      {
      aliasComensal: "Mari",
      edadComensal: 24,
      idUsuario: 2
      },
      {
      aliasComensal: "Roberto",
      edadComensal: 25,
      idUsuario: null
      }
    ],
    fechaReserva: "2019-09-23",
    horaEntrada: "22:50",
    horaSalida: "23:30",
    idTraidoBackEnd: id,
    nroMesa: "2",
    sector: "3",
    }
    this.variable = true;
  }

  onBack() {
    console.log("Retrocediendo.")
    this.variable = false;
    this.datos = null;
    this.navController.navigateRoot('/home');
  }
}
