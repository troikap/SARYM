import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Comensal, Reserva } from 'src/app/models/modelos';
import { ReservaService } from 'src/app/services/reserva/reserva.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

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
  private usuario;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private alertController: AlertController,
    private navController: NavController,
    public activatedRoute: ActivatedRoute,
    private reservaServicio: ReservaService,
    private usuarioServicio: UsuarioService
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
      this.qrDataCodify = 'My0yMy0yMDE5LTExLTEzLzEwOjUx';
      this.presentAlert()
    });
  }

  async presentAlert() {
    this.secretCode = atob( this.qrDataCodify );
    this.nameArray = this.secretCode.split('-');
    let idReserva = this.nameArray[0]
    let idUsuario = this.nameArray[1]
    await this.traerUsuario(idUsuario);
    let nombreUsuario = `${this.usuario.Usuario.nombreUsuario} ${this.usuario.Usuario.apellidoUsuario}`
    const alert = await this.alertController.create(
      {
      header: 'Leyendo QR',
      message: `Desea Unirse a la reserva N° ${idReserva} de ${nombreUsuario}?`,
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
            // ACA TENDRIA QUE IR A MOSTRAR LA ESTADIA PARA SELECCIONAR EL COMENSAL
            this.navController.navigateForward(`seleccion-comensal/${idReserva}`)
          }
        }
      ]
    });
    await alert.present();
  }

  async traerUsuario( idUsuario ) {
    await this.usuarioServicio.getUsuario(  idUsuario )
    .then( async usuario => {
       this.usuario = await usuario;
    })
  }
}
