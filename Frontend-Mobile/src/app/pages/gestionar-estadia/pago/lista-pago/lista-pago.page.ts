import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../../services/storage/storage.service';
import { EstadiaService } from '../../../../services/estadia/estadia.service';
import { PagoService } from '../../../../services/pago/pago.service';
import { Estadia, Pago } from '../../../../models/modelos';
import { PedidoService } from '../../../../services/pedido/pedido.service';
import { ToastService } from '../../../../providers/toast.service';
import { AlertService } from '../../../../providers/alert.service';
import { LoaderService } from '../../../../providers/loader.service';

  

@Component({
  selector: 'app-lista-pago',
  templateUrl: './lista-pago.page.html',
  styleUrls: ['./lista-pago.page.scss'],
})
export class ListaPagoPage implements OnInit {
  
    public idEstadia;
    public idComensal;
    public currentUsuario;
    public pago: Pago;
    public pagos: Pago[];
    public modificarComensal = false;
    public from;
    public nombreUsuario;
    public pathDetalleComensalUsuario: {idEstadia: number, detalle: [{aliasComensal: string, edadComensal: number, idUsuario?: number}]};
    public mostrar: any[] = [];

  constructor(
    private alertController: AlertController,
    private navController: NavController,
    public activatedRoute: ActivatedRoute,
    private storage: StorageService,
    private estadiaService: EstadiaService,
    private pagoService: PagoService,
    private pedidoService: PedidoService,
    private toastService: ToastService,
    private alertService: AlertService,
    private loaderService: LoaderService,
  ) {
    
    }

  ngOnInit() {
    console.log("PAGE ListaPagoPage")
    this.activatedRoute.params
      .subscribe(params => {
        this.idEstadia = params.idEstadia;
      })
      this.traerPagos();
  }

  ionViewWillEnter(){
    this.traerPagos();
  }

  loadCurrentUsuario() {
    this.storage.getCurrentUsuario().then((data) => {
      let currentUsuario: any = data;
      this.nombreUsuario = currentUsuario.rolUsuario;
      console.log("this.nombreUsuario : ", this.nombreUsuario );
    });
  }

  seleccionComensalPago() {
    this.navController.navigateForward( [`/seleccion-comensal-pago/${this.idEstadia}`])
  }

  async imprimir( item ) {
    console.log("IMPRIMIR ", item)
    const alert = await this.alertController.create({
      header: 'Desea imprimir comprobante?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Imprimir',
          handler: () => {
            console.log('Imprimir');
            this.loaderService.presentLoading('Imprimiendo Comprobante aguarde unos segundos', 3000 )
            .then ( resp => { console.log("Comprobante Impreso")})
          }
        }
      ],
      cssClass: 'alertPrimary',
    });
    await alert.present();
  }
  traerPagos(){
    this.pagoService.getPagosPorEstadia( this.idEstadia )
    .then( pagos => {
      console.log("PAGOS ", pagos)
      this.pagos = pagos;
    })
  }
}
      