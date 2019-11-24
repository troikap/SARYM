import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Comensal, Estadia } from 'src/app/models/modelos';
import { EstadiaService } from 'src/app/services/estadia/estadia.service';

@Component({
  selector: 'app-ver-qr-estadia',
  templateUrl: './ver-qr-estadia.page.html',
  styleUrls: ['./ver-qr-estadia.page.scss'],
})
export class VerQrEstadiaPage implements OnInit {

    public datos;
    public valor;
    public qrDataCodify;
    public createdCode;
    public secretCode;
    public nameArray;
    public name;
    public mostrar: boolean = false;
    public variable: boolean = false;
    public scannedCode;
    public idEstadia;
    public comensal: Comensal;
    public comensales: Comensal[] = [];
    public tokenEstadia;
  
    constructor(
      private barcodeScanner: BarcodeScanner,
      private alertController: AlertController,
      private navController: NavController,
      public activatedRoute: ActivatedRoute,
      private EstadiaServicio: EstadiaService
    ) { 
      this.activatedRoute.params.subscribe(params => {
        console.log("PAREMTROS DE URL", params);
        this.idEstadia = params.id;
        this.traerEstadia();
      });
    }
  
    ngOnInit() {
  
    }
  
    createCode() {
      console.log('Creando QR');
      this.valor = this.tokenEstadia;
      this.qrDataCodify = btoa( this.valor );
      this.createdCode = this.qrDataCodify;
      console.log("VALOR LEIDO DEL QR : ", this.qrDataCodify)
    }
  
    traerEstadia() {
      console.log("Funcion 'traerEstadia()', ejecutada");
      if (this.idEstadia !== 0) {
        this.EstadiaServicio.getEstadia(this.idEstadia)
        .then((res: Estadia) => {
          console.log("Estadia obtenida: ", res)
          if ( res['tipo'] == 2) {
            console.log("No se pudo obtener Estadia con id Nro ", this.idEstadia);
          } else {
            this.tokenEstadia = res.tokenEstadia;
            this.createCode();
          }
        });
      }
    }
  }
  