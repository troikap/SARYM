  import { Component, OnInit } from '@angular/core';
  import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
  import { AlertController } from '@ionic/angular';
  import { NavController } from '@ionic/angular';
  import { Router, ActivatedRoute } from '@angular/router';
  import { Comensal, Reserva } from 'src/app/models/modelos';
  import { ReservaService } from 'src/app/services/reserva/reserva.service';
  import { UsuarioService } from 'src/app/services/usuario/usuario.service';
  import { ToastService } from '../../providers/toast.service'

@Component({
  selector: 'app-unirse-reserva-estadia',
  templateUrl: './unirse-reserva-estadia.page.html',
  styleUrls: ['./unirse-reserva-estadia.page.scss'],
})
export class UnirseReservaEstadiaPage implements OnInit {
  
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
      private usuarioServicio: UsuarioService,
      private toastService: ToastService,
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
        this.qrDataCodify = 'UkVTRVJWQS0yLTEtMjAxOS0xMS0xOC8wOToxMw==';
        this.presentAlert()
      });
    }
  
    async presentAlert() {
      console.log("this ", this.qrDataCodify)
      try {
        this.secretCode = atob( this.qrDataCodify );
      } catch(e) {
         this.secretCode = null;
         this.toastService.toastError('QR leido es incorrecto', 2000)
         this.navController.navigateBack('/home');
      }
      if (this.secretCode) {
        console.log("SECRETO ", this.secretCode)
        this.nameArray = this.secretCode.split('-');
        let tipo = this.nameArray[0];
        let idReservaEstadia = this.nameArray[1];
        let rutaTipo;
        if (tipo == "RESERVA") {
          rutaTipo = 'reserva';
        } else if (tipo == "ESTADIA") {
          rutaTipo = 'estadia';
        } else {
          this.toastService.toastError('QR leido es incorrecto', 2000)
          this.navController.back();
        }
        let idUsuario = this.nameArray[2];
        await this.traerUsuario(idUsuario);
        console.log("ENCONTRADO ", this.secretCode)
        let nombreUsuario = `${this.usuario.Usuario.nombreUsuario} ${this.usuario.Usuario.apellidoUsuario}`
        const alert = await this.alertController.create(
          {
          header: 'Leyendo QR',
          message: `Desea Unirse a la reserva N° ${idReservaEstadia} de ${nombreUsuario}?`,
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
                this.navController.navigateForward(`seleccion-comensal/${rutaTipo}/${idReservaEstadia}`)
              }
            }
          ],
          cssClass: 'alertPrimary'
        });
        await alert.present();
      }
    }
  
    async traerUsuario( idUsuario ) {
      await this.usuarioServicio.getUsuario(  idUsuario )
      .then( async usuario => {
         this.usuario = await usuario;
      })
    }
  }
  