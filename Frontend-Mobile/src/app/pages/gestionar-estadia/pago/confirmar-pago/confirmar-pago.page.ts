import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Comensal, Estadia } from 'src/app/models/modelos';
import { EstadiaService } from 'src/app/services/estadia/estadia.service';
import { MesaService } from 'src/app/services/mesa/mesa.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { TratarFechaProvider } from 'src/app/providers/tratarFecha.provider';
import { PagoService } from 'src/app/services/pago/pago.service';

@Component({
  selector: 'app-confirmar-pago',
  templateUrl: './confirmar-pago.page.html',
  styleUrls: ['./confirmar-pago.page.scss'],
})
export class ConfirmarPagoPage implements OnInit {

  public datos;
  public valor;
  public qrDataCodify;
  public createdCode;
  public secretCode;
  public scannedCode;
  public idEstadia;
  public idPago;
  public comensal: Comensal;
  public comensales: Comensal[] = [];
  public codigoParaQr;
  public detallePagos;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private alertController: AlertController,
    private navController: NavController,
    public activatedRoute: ActivatedRoute,
    private estadiaService: EstadiaService,
    private mesaService: MesaService,
    private pedidoService: PedidoService,
    private tratarFechaProvider: TratarFechaProvider,
    private pagoService: PagoService,
    ) { 
    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);
      this.idEstadia = params.idEstadia;
      this.idPago = params.idPago
      this.traerEstadiaYPago();
    });
  }

  ngOnInit() {

  }
  
  traerEstadiaYPago() {
    console.log("Funcion 'traerEstadia()', ejecutada");
    if (this.idEstadia !== 0) {
      this.estadiaService.getEstadia(this.idEstadia)
      .then((res: Estadia) => {
        console.log("Estadia obtenida: ", res)
        if ( res['tipo'] == 2) {
          console.log("No se pudo obtener Estadia con id Nro ", this.idEstadia);
        } else {
          this.pagoService.getPago(this.idPago).then( respuesta => {
            console.log("PAGO ", respuesta)
            this.codigoParaQr = `PAGO-${this.idEstadia}-${respuesta.idPago}`;
            console.log("Codigo Para Qr ", this.codigoParaQr)
            this.createCode();
          })
        }
      });
    }
  }

  goBack() {
    this.navController.navigateBack('home');
  }
  
  createCode() {
    console.log('Creando QR');
    this.valor = this.codigoParaQr;
    this.qrDataCodify = btoa( this.valor );
    this.createdCode = this.qrDataCodify;
    console.log("VALOR LEIDO DEL QR : ", this.qrDataCodify)
  }
}
    