  import { Component, OnInit } from '@angular/core';
  import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
  import { AlertController } from '@ionic/angular';
  import { NavController } from '@ionic/angular';
  import { Router, ActivatedRoute } from '@angular/router';
  import { Comensal, Reserva } from 'src/app/models/modelos';
  import { ReservaService } from 'src/app/services/reserva/reserva.service';
  import { UsuarioService } from 'src/app/services/usuario/usuario.service';
  import { ToastService } from '../../providers/toast.service'
import { StorageService } from 'src/app/services/storage/storage.service';
import { EstadiaService } from 'src/app/services/estadia/estadia.service';

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

    private rutaTipo;
    private idReservaEstadia;
    private idUsuario;
    private nombreUsuario;
    private idUsrStorage;
    private idReservaEstadiaStorage = 0;

    constructor(
      private barcodeScanner: BarcodeScanner,
      private alertController: AlertController,
      private navController: NavController,
      public activatedRoute: ActivatedRoute,
      private usuarioServicio: UsuarioService,
      private toastService: ToastService,
      private storage: StorageService,
      private reservaServicio: ReservaService,
      private estadiaServicio: EstadiaService,
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
        this.qrDataCodify = 'RVNUQURJQS0zLTEx'; // ESTADIA: RVNUQURJQS0zLTEx; //RESERVA: UkVTRVJWQS0yLTE3LTIwMTktMTEtMjkvMTk6MjE=
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
        this.idReservaEstadia = this.nameArray[1];

        if (tipo == "RESERVA") {
          this.rutaTipo = 'reserva';
        } else if (tipo == "ESTADIA") {
          this.rutaTipo = 'estadia';
        } else {
          this.toastService.toastError('QR leido es incorrecto', 2000)
          this.navController.back();
        }
        this.idUsuario = this.nameArray[2];
        await this.traerUsuario();
        await this.traerUsuarioStorage();
        await this.traerReservaEstadiaStorage();
        
        if ((this.idUsuario != this.idUsrStorage) && (this.idReservaEstadiaStorage != this.idReservaEstadia)) { 
          console.log("ENCONTRADO ", this.secretCode)
          this.nombreUsuario = `${this.usuario.Usuario.nombreUsuario} ${this.usuario.Usuario.apellidoUsuario}`        
          const alert = await this.alertController.create(
            {
            header: 'Leyendo QR',
            message: `¿Desea Unirse a la ${this.rutaTipo} N° ${this.idReservaEstadia} de ${this.nombreUsuario}?`,
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
                  this.verifiarEstadoReservaEstadia();
                }
              }
            ],
            cssClass: 'alertPrimary'
          });
          await alert.present();
        }
        else { // No continuar, pues ya es Reserva o Estadía del usuario logueado
          this.toastService.toastSuccess(`Usted ya se encuentra unido a esta ${this.rutaTipo}`, 3000);
          this.navController.navigateBack('/home');
        }
      }
    }

    verifiarEstadoReservaEstadia() {
      if (this.rutaTipo == "reserva") {
        this.reservaServicio.getReserva(this.idReservaEstadia)
        .then( res => {
          console.log("Reserva obtenida: ", res)
          if (res.reservaestados[0].estadoreserva.idEstadoReserva == 1) {
            this.insertarReservaEstadiaComensalStorage();
            this.navController.navigateForward(`seleccion-comensal/${this.rutaTipo}/${this.idReservaEstadia}/creacion`);
          }
          else {
            this.toastService.toastError(`La ${this.rutaTipo} N° ${this.idReservaEstadia} de ${this.nombreUsuario}, no se encuentra Vigente`, 3000);
            setTimeout(()=>{
              this.navController.navigateForward([`/home`]);
            }, 3000);
          }
        });
      }
      else {
        this.estadiaServicio.getEstadia(this.idReservaEstadia)
        .then( est => {
          console.log("Estadia obtenida: ", est)
          if (est.estadiaestados[0].estadoestadium.idEstadoEstadia == 1) {
            this.insertarReservaEstadiaComensalStorage();
            this.navController.navigateForward(`seleccion-comensal/${this.rutaTipo}/${this.idReservaEstadia}/creacion`);
          }
          else {
            this.toastService.toastError(`La ${this.rutaTipo} N° ${this.idReservaEstadia} de ${this.nombreUsuario}, no se encuentra Vigente`, 3000);
            setTimeout(()=>{
              this.navController.navigateForward([`/home`]);
            }, 3000);
          }
        });
      }
    }
    
    insertarReservaEstadiaComensalStorage() {
      //Elimino lo existente relacionado en storage, para no duplicar datos. Solo podra existir una reserva y estadía a la vez, para
      //un usuario logueado.

      let reservaEstadia = {
        idReservaEstadia: this.idReservaEstadia,
        idUsuarioCreador: this.idUsuario,
        tipo: this.rutaTipo
      }
      this.storage.setOneObject(this.rutaTipo, reservaEstadia);
    }
    
    async traerUsuario() {
      await this.usuarioServicio.getUsuario(  this.idUsuario )
      .then( async usuario => {
         this.usuario = await usuario;
      })
    }

    async traerUsuarioStorage() {
      await this.storage.getCurrentUsuario()
      .then(data => {
        let currentUsuario = data;
        this.idUsrStorage =  currentUsuario.id;
      });
    }

    async traerReservaEstadiaStorage() {
      await this.storage.getOneObject(this.rutaTipo)
       .then((est: any) => {
        if (est != null && est != "") {
          this.idReservaEstadiaStorage = est.idReservaEstadia;
        }
      });
    }
  }
  
  