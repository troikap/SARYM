import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, AlertController } from '@ionic/angular';
import { EstadiaService } from 'src/app/services/estadia/estadia.service';
import { MesaService } from 'src/app/services/mesa/mesa.service';
import { ActivatedRoute } from '@angular/router';
import { Estadia, Comensal, Mesa } from 'src/app/models/modelos';
import { AlertService } from 'src/app/providers/alert.service';
import { ToastService } from 'src/app/providers/toast.service';

@Component({
  selector: 'app-consulta-gestionar-estadia',
  templateUrl: './consulta-gestionar-estadia.page.html',
  styleUrls: ['./consulta-gestionar-estadia.page.scss'],
})
export class ConsultaGestionarEstadiaPage implements OnInit {
  
  public estadia: Estadia;
  public idEstadia= 0;
  public comensales: Comensal[] = [];
  private mesasTodas: any[];
  public mesas: any[] = [];

  constructor(
    private toastController: ToastController,
    private navController: NavController,
    private estadiaServicio: EstadiaService,
    private mesaservicio: MesaService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private alertService: AlertService,
    private toastService: ToastService
  ) {
    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);
      this.idEstadia = params.id;
    });
  }

  ngOnInit() {
    this.traerMesas();
    this.traerEstadia();
  }
  
  async traerMesas(){
    await this.mesaservicio.getMesas()
    .then(  resp => {
      this.mesasTodas =  resp['data'];
      
      console.log("traerMesas: ", this.mesasTodas );
    })
  }

  async traerEstadia() {
    console.log("Funcion 'traerEstadia()', ejecutada");
    if (this.idEstadia !== 0) {
      await this.estadiaServicio.getEstadia(this.idEstadia)
      .then( res => {
        console.log("Estadia obtenida: ", res)
        if ( res['tipo'] == 2) {
          console.log("No se pudo obtener Estadia con id Nro ", this.idEstadia);
        } else {
          // Estadia
          this.estadia = res;
          console.log("TrearEstadia: ", this.estadia);

          let comensal;
          for (let i = 0; i < res.comensals.length; i++) {
            comensal = {};
            comensal = res.comensals[i];
            if (res.comensals[i].usuario) {
              comensal['cuitUsuario'] = res.comensals[i].usuario.cuitUsuario;
            }
            this.comensales.push(comensal);
          }
          console.log("Comensales de la estadia: ", this.comensales);
          let idMesaEstadia = null;
          let idMesaTodas = null;
          let mesasMap = {};
          console.log("res.detalleestadiamesas: ", res.detalleestadiamesas);
          console.log("this.mesasTodas: ", this.mesasTodas);
          for(let detalleEstadia of res.detalleestadiamesas) {
            idMesaEstadia = detalleEstadia.idMesa;
            for(let mesasTodas of this.mesasTodas) {
              let idMesaTodas = mesasTodas.idMesa;
              if (idMesaEstadia == idMesaTodas) {
                mesasMap['nroMesa'] = mesasTodas.nroMesa;
                mesasMap['capacidadMesa'] = mesasTodas.capacidadMesa;
                mesasMap['nombreSector'] = mesasTodas.sector.nombreSector;
                this.mesas.push(mesasMap);
              }
              idMesaTodas = null;
            }
            mesasMap = {};
            idMesaEstadia = null;
          }
          console.log("Mesas de la estadia: ", this.mesas);
        }
      });
    }
  }

  editarEstadia() {
    console.log("Editar Estadia");
    this.navController.navigateForward(['/crud-gestionar-estadia', this.idEstadia, 'editar' ]);
  }

  anularEstadia() {
    console.log("Anular Estadia");
    let pTituloConfirm = "Anular Estadia";
    let pMensajeConfirm = "¿Desea anular la estadia seleccionada?<br>Si continúa no podrá revertir los cambios.";
    this.Confirm(pTituloConfirm, pMensajeConfirm);
  }

  verQrEstadia() {
    console.log("Ver QR Estadia");
    this.navController.navigateForward(['/ver-qr-estadia', this.idEstadia ]);
  }

  getDTOCambioEstadoEliminarEstadia() {
    console.log("Funcion 'getDTOCambioEstadoEliminarEstadia()', ejecutada");
    let dtoAnularEstadia: any = {
      idEstadia: this.idEstadia,
      idEstadoEstadia: "2", //ANULAR
      descripcionEstadia:  "Anulada por el Cliente",
    }
    return dtoAnularEstadia;
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
            console.log('Anular Estadia');
            let dtoAnularEstadia = this.getDTOCambioEstadoEliminarEstadia();
            this.estadiaServicio.cambiarEstado(dtoAnularEstadia)
            .then( resp => {
              console.log("Respuesta Anular Estadia: ",resp)

              if (resp.tipo != 2) {
                this.toastService.toastSuccess("Se ha anulado correctamente la estadia seleccionada", 2500);
                setTimeout(()=>{
                  this.navController.navigateForward(['/search-gestionar-estadia']);
                 }, 2500);
              }
              else {
                this.toastService.toastError(resp.title, 2500);
              }
            })
          }
        }
      ]
    });
    await alert.present();
  }
  
}

