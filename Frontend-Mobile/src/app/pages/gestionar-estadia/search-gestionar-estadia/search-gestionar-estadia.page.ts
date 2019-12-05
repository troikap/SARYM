import { Component, OnInit } from '@angular/core';
import { EstadiaService } from '../../../services/estadia/estadia.service';
import { StorageService } from '../../../services/storage/storage.service';
import { NavController,  AlertController, ToastController } from '@ionic/angular';
import { ToastService } from 'src/app/providers/toast.service';

@Component({
  selector: 'app-search-gestionar-estadia',
  templateUrl: './search-gestionar-estadia.page.html',
  styleUrls: ['./search-gestionar-estadia.page.scss'],
})
export class SearchGestionarEstadiaPage implements OnInit {

  public estadia: any = null;
  public estadiaInvitado: any = null;
  private currentUsuario;
  private idUsuarioLogueado: number;
  private createdCode;
  public mostrar;
  public nombreUsuario = null;
  public traerEstadiaInvitado = false;

  constructor(
    private estadiaService: EstadiaService,
    private storage: StorageService,
    private navController: NavController,
    private alertController: AlertController,
    public toastController: ToastController,
    private toastService: ToastService,
  ) { 
    this.loadCurrentUsuario();
  }

  ngOnInit() {
  }

  goBack() {
    this.navController.navigateRoot('/home');
  }

  doRefresh(event) {
    
    this.resetDatos();
    this.loadCurrentUsuario();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  resetDatos() {
    this.estadia = null;
    this.estadiaInvitado = null;
    this.currentUsuario = null;
    this.idUsuarioLogueado = 0;
    this.nombreUsuario = null;
    this.traerEstadiaInvitado = false;
  }

  async loadCurrentUsuario() {
    await this.storage.getCurrentUsuario()
    .then((data) => {
      this.currentUsuario = data;
      this.nombreUsuario = this.currentUsuario.rolUsuario;
      this.idUsuarioLogueado =  this.currentUsuario.id; //Si this.idUsuarioLogueado == -1, es usuario invitado
      this.getEstadiaUsrLogueado();
    });
  }

  createCode() {
    console.log('Creando QR');
    if (this.idUsuarioLogueado !== -1) { // Si NO es Usuario Invitado
      this.createdCode = btoa( this.estadia.tokenEstadia );
    }
    else {
      this.createdCode = btoa( this.estadiaInvitado.tokenEstadia );
    }
  }

  async getEstadiaUsrLogueado() {
    if (this.idUsuarioLogueado !== -1) { // Si NO es Usuario Invitado
      await this.estadiaService.getEstadiasPorUsuario(this.idUsuarioLogueado)
      .then((res: any) => {
        if ( res && res.tipo == 1 ){
          this.estadia =  res.data;
          this.createCode();
        } else {
          console.timeLog("Verificar por Estadía Unida");
          // Verificar si se ha unido a alguna estadía
          let idEstadia = null;
          this.storage.getOneObject("estadia")
          .then(async (est: any) => {
            if (est != null && est != "") {
              idEstadia = est.idReservaEstadia;
              await this.estadiaService.getEstadia(idEstadia)
              .then((est: any) => {
                console.log("est: ", est);
                let idEstadoEstadia = est.estadiaestados[0].estadoestadium.idEstadoEstadia;
                if (est && idEstadoEstadia != 2 && idEstadoEstadia != 3) { // idEstadoEstadia != "Finalizada" AND idEstadoEstadia != "Anulada"
                  this.estadia =  est;
                  this.createCode();
                } else {
                  this.storage.delOneItem("estadia");
                  this.storage.delOneItem("comensalEstadia");
                }
              })
            }
            else {
              console.timeLog("NO ESTA EN UNA ESTADIA");
            }
          });
        }
      });
    }
    else {
      let idEstadia = null;
      await this.storage.getOneObject("estadia")
      .then(async (est: any) => {
        if (est != null && est != "") {
          idEstadia = est.idReservaEstadia;
          await this.estadiaService.getEstadia(idEstadia)
          .then((est: any) => {
            console.log("est: ", est);
            let idEstadoEstadia = est.estadiaestados[0].estadoestadium.idEstadoEstadia;
            if (est && idEstadoEstadia != 2 && idEstadoEstadia != 3) { // idEstadoEstadia != "Finalizada" AND idEstadoEstadia != "Anulada"
              this.estadiaInvitado =  est;
              this.createCode();
            } else {
              this.storage.delOneItem("estadia");
              this.storage.delOneItem("comensalEstadia");
            }
          })
        }
        else {
          console.log("sin estadia Invitado");
        }
      });
    }
  }

  realizarPedido(item) {
    let idEstadia = item.idEstadia;
    this.navController.navigateForward([`/seleccion-comensal/estadia/${idEstadia}/edicion`])
  }

  verListaPago(item) {
    let idEstadia = item.idEstadia;
    this.navController.navigateForward([`/lista-pago/${idEstadia}`])
  }

  unirseEstadia() {
    console.log("unirseEstadia");
    this.navController.navigateForward(['/unirse-reserva-estadia' ]);
  }

  consultarEstadia( idEstadia: number) {
    console.log("Consultar Estadia", idEstadia);
    this.navController.navigateForward(['/consulta-gestionar-estadia', idEstadia ]);
  }

  verQrReserva(pIdReserva: number) {
    console.log("Ver QR Reserva", pIdReserva);
    this.navController.navigateForward(['/ver-qr-reserva', pIdReserva ]);
  }

  async toastSuccess(pMensaje: string) {
    const toast = await this.toastController.create({
      message: pMensaje,
      duration: 3000,
      color: 'success',
      position: 'middle',
      translucent: true
    });
    toast.present();
  }

  async toastError(pMensaje: string) {
    const toast = await this.toastController.create({
      message: pMensaje,
      duration: 3000,
      color: 'danger',
      position: 'middle',
      translucent: true
    });
    toast.present();
  }
}
