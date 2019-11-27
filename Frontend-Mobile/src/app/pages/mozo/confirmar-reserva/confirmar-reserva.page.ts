import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Comensal, Reserva } from 'src/app/models/modelos';
import { ReservaService } from 'src/app/services/reserva/reserva.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ToastService } from 'src/app/providers/toast.service';

@Component({
  selector: 'app-confirmar-reserva',
  templateUrl: './confirmar-reserva.page.html',
  styleUrls: ['./confirmar-reserva.page.scss'],
})
export class ConfirmarReservaPage implements OnInit {

  private qrDataCodify;
  public createdCode;
  private secretCode;
  private nameArray;
  public mostrar: boolean = false;
  public variable: boolean = false;
  public scannedCode;
  private usuario;

  private idReserva;
  private idUsuario;
  private nombreUsuario;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private alertController: AlertController,
    private navController: NavController,
    public activatedRoute: ActivatedRoute,
    private usuarioServicio: UsuarioService,
    private toastService: ToastService,
    private storage: StorageService
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
      this.qrDataCodify = 'UkVTRVJWQS00LTE3LTIwMTktMTEtMzAvMTc6MTk='; //UkVTRVJWQS0yLTE3LTIwMTktMTEtMjUvMTQ6MzQ=
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
      this.idReserva = this.nameArray[1];
      if (tipo == "RESERVA") {
        //reserva
      } else if (tipo == "ESTADIA") {
        this.toastService.toastError('El QR ingresado no corresponde a una Reserva', 2000)
        this.navController.back();
      } else {
        this.toastService.toastError('QR leido es incorrecto', 2000)
        this.navController.back();
      }
      this.idUsuario = this.nameArray[2];
      await this.traerUsuario();
      console.log("ENCONTRADO ", this.secretCode)
      this.nombreUsuario = `${this.usuario.Usuario.nombreUsuario} ${this.usuario.Usuario.apellidoUsuario}`        
      const alert = await this.alertController.create(
        {
        header: 'Leyendo QR',
        message: `¿Confirmar la Reserva N° ${this.idReserva} de ${this.nombreUsuario}?`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.navController.navigateBack('/home');
            }
          }, {
            text: 'Confirmar',
            handler: () => {
              this.navController.navigateForward(`crud-generar-estadia/${this.idReserva}/editar/confReserva`)
            }
          }
        ],
        cssClass: 'alertPrimary'
      });
      await alert.present();
    }
  }

  async traerUsuario() {
    await this.usuarioServicio.getUsuario(  this.idUsuario )
    .then( async usuario => {
       this.usuario = await usuario;
    })
  }

}
