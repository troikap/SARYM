import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, AlertController } from '@ionic/angular';
import { ReservaService } from 'src/app/services/reserva/reserva.service';
import { MesaService } from 'src/app/services/mesa/mesa.service';
import { ActivatedRoute } from '@angular/router';
import { Reserva, Comensal, Mesa } from 'src/app/models/modelos';
import { AlertService } from 'src/app/providers/alert.service';
import { ToastService } from 'src/app/providers/toast.service';
import { StorageService } from 'src/app/services/storage/storage.service';


@Component({
  selector: 'app-consulta-gestionar-reserva',
  templateUrl: './consulta-gestionar-reserva.page.html',
  styleUrls: ['./consulta-gestionar-reserva.page.scss'],
})
export class ConsultaGestionarReservaPage implements OnInit {
  
  public reserva: Reserva;
  public idReserva = 0;
  
  public comensales: Comensal[] = [];
  private mesasTodas: any[];
  public mesas: any[] = [];
  public nombreUsuario;
  private mesasReserva = [];
  private idUsuarioReserva = null;
  private esPropietario = false;

  constructor(
    private toastController: ToastController,
    private navController: NavController,
    private reservaservicio: ReservaService,
    private mesaservicio: MesaService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private alertService: AlertService,
    private toastService: ToastService,
    private storage: StorageService
  ) {
    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);
      this.idReserva = params.id;
    });

  }

  ngOnInit() {
    this.traerMesas();
  }

  goBack() {
    this.navController.navigateRoot('/search-gestionar-reserva');
  }
  
  async traerMesas(){
    await this.mesaservicio.getMesas()
    .then(  resp => {
      this.mesasTodas =  resp;
      this.traerReserva();
    })
  }
  
  loadCurrentUsuario() {
    this.storage.getCurrentUsuario().then((data) => {
      let currentUsuario: any = data;
      this.idUsuarioReserva = data.id;
      this.nombreUsuario = currentUsuario.rolUsuario;
      this.getReservasStorage();
    });
  }

  async getReservasStorage() {
    let idReservaStorage = null;
    let idUsrReservaStorage = null;
    await this.storage.getOneObject("reserva")
    .then(async (res: any) => {
      if (res != null && res != "") {
        idReservaStorage = res.idReservaEstadia;
        idUsrReservaStorage = res.idUsuarioCreador;
        if (idReservaStorage == this.idReserva && idUsrReservaStorage == this.idUsuarioReserva) {
          this.esPropietario = true;
        }
      }
      else { //No existe reserva en storage
        this.esPropietario = true;
      }
    });
    console.log("esPropietario: ", this.esPropietario);
  }

  async traerReserva() {
    if (this.idReserva !== 0) {
      await this.reservaservicio.getReserva(this.idReserva)
      .then( res => {
        console.log("Reserva obtenida: ", res)
        if ( res['tipo'] == 2) {
          console.log("No se pudo obtener Reserva con id Nro ", this.idReserva);
        } else {
          // Reserva
          this.reserva = res;
          let comensal;
          for (let i = 0; i < res.comensals.length; i++) {
            comensal = {};
            comensal = res.comensals[i];
            if (res.comensals[i].usuario) {
              comensal['cuitUsuario'] = res.comensals[i].usuario.cuitUsuario;
            }
            this.comensales.push(comensal);
          }
          let idMesaReserva = null;
          let idMesaTodas = null;
          let mesasMap = {};

          for(let detalleReserva of res.detallereservamesas) {
            idMesaReserva = detalleReserva.idMesa;
            this.mesasReserva.push(detalleReserva.idMesa);

            for(let mesasTodasParam of this.mesasTodas) {
              let idMesaTodas = mesasTodasParam.idMesa;
              if (idMesaReserva == idMesaTodas) {
                mesasMap['nroMesa'] = mesasTodasParam.nroMesa;
                mesasMap['capacidadMesa'] = mesasTodasParam.capacidadMesa;
                mesasMap['nombreSector'] = mesasTodasParam.sector.nombreSector;

                this.mesas.push(mesasMap);
              }
              idMesaTodas = null;
            }
            
            mesasMap = {};
            idMesaReserva = null;
          }
          this.loadCurrentUsuario();
        }
      });
    }
  }

  editarReserva() {
    console.log("Editar Reserva");
    this.navController.navigateForward(['/crud-gestionar-reserva', this.idReserva, 'editar' ]);
  }

  anularReserva() {
    console.log("Anular Reserva");

    let pTituloConfirm = "Anular Reserva";
    let pMensajeConfirm = "¿Desea anular la reserva seleccionada?<br>Si continúa no podrá revertir los cambios.";
    this.Confirm(pTituloConfirm, pMensajeConfirm);
  }

  verQrReserva() {
    console.log("Ver QR Reserva");
    this.navController.navigateForward(['/ver-qr-reserva', this.idReserva ]);
  }

  getDTOCambioEstadoEliminarReserva() {
    console.log("Funcion 'getDTOCambioEstadoEliminarReserva()', ejecutada");

    let dtoAnularReserva: any = {
      idReserva: this.idReserva,
      idEstadoReserva: "2", //ANULAR
      descripcionReservaEstado:  "Anulada por el Cliente",
    }
    return dtoAnularReserva;
  }

  async Confirm(pTitulo: string, pMensaje: string) {
    const alert = await this.alertController.create({
      header: pTitulo,
      message: pMensaje,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelado');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            console.log('Anular Reserva');
            let dtoAnularReserva = this.getDTOCambioEstadoEliminarReserva();
            this.reservaservicio.cambiarEstado(dtoAnularReserva)
            .then(async resp => {
              
              await this.cambiarEstadoMesas();
              
              this.toastService.toastSuccess("Se ha anulado correctamente la reserva seleccionada", 2500);
              setTimeout(()=>{
                this.navController.navigateForward(['/search-gestionar-reserva']);
              }, 2500);
            })
          }
        }
      ],
      cssClass: 'alertPrimary'
    });

    await alert.present();
  }

  async cambiarEstadoMesas(){
    for (let mesa of this.mesasReserva) {
      let pathMesa = {}
      pathMesa['idMesa'] = mesa.idMesa;
      pathMesa['idEstadoMesa'] = 2;
      await this.mesaservicio.cambiarEstado(pathMesa)
      .then(respo2 => {});
    }
  }
  
}
