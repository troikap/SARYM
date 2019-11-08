import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Comensal, Reserva } from 'src/app/models/modelos';
import { ReservaService } from 'src/app/services/reserva/reserva.service';

@Component({
  selector: 'app-ver-qr-reserva',
  templateUrl: './ver-qr-reserva.page.html',
  styleUrls: ['./ver-qr-reserva.page.scss'],
})
export class VerQRReservaPage implements OnInit {
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

  constructor(
    private barcodeScanner: BarcodeScanner,
    private alertController: AlertController,
    private navController: NavController,
    public activatedRoute: ActivatedRoute,
    private reservaservicio: ReservaService

  ) { 
    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);
      this.idReserva = params.id;

    });
  }

  ngOnInit() {

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

  traerReserva(idBackEnd: number) {
    console.log("Funcion 'traerReserva()', ejecutada");
    console.log("Id Reserva Url: ", this.idReserva);
    console.log("Id Backend: ", idBackEnd);

    if (this.idReserva !== 0) {
      this.reservaservicio.getReserva(this.idReserva)
      .then((res: Reserva) => {
        console.log("Reserva obtenida: ", res)
        if ( res['tipo'] == 2) {
          console.log("No se pudo obtener Reserva con id Nro ", this.idReserva);
        } else {

          for (let i = 0; i < res.comensals.length; i++) {
            this.comensal = {
              idComensal: res.comensals[i].idComensal,
              aliasComensal: res.comensals[i].aliasComensal,
              edadComensal: res.comensals[i].edadComensal,
              cuitUsuario: res.comensals[i].cuitUsuario,
              idUsuario: res.comensals[i].idUsuario
            }
            this.comensales.push(this.comensal);
            this.comensal = null;
          }
          
          this.datos = {
            cantidadComensal: res.cantPersonas,
            comensales: this.comensales,
            fechaReserva: res.fechaReserva,
            horaEntrada: res.horaEntradaReserva,
            horaSalida: res.horaSalidaReserva,
            idTraidoBackEnd: idBackEnd,
            nroMesa: "2",
            sector: "3",
            }
            this.variable = true;
        }
      });
    }
    
  }

  onBack() {
    console.log("Retrocediendo.")
    this.variable = false;
    this.datos = null;
    this.navController.navigateRoot('/search-gestionar.reserva');
  }

}
