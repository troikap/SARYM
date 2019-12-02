import { Component, OnInit } from '@angular/core';
import { MesaService } from "src/app/services/mesa/mesa.service";
import { NavController, AlertController } from '@ionic/angular';
import { ToastService } from '../../../providers/toast.service';
import { SectorService } from "src/app/services/sector/sector.service";
import { EstadoService } from "src/app/services/estado/estado.service";
import { EstadiaService } from "src/app/services/estadia/estadia.service";
import { StorageService, Log } from '../../../services/storage/storage.service';

@Component({
  selector: 'app-consultar-salon',
  templateUrl: './consultar-salon.page.html',
  styleUrls: ['./consultar-salon.page.scss'],
})
export class ConsultarSalonPage implements OnInit {

  mesas;
  sectores;
  estados = [];
  todoSector = true;
  todoEstado = true;
  filtroSector;
  filtroEstado;
  mias = false;
  currentUsuario;
  estadiasMozo;
  intervalo;
  mostrado = false;

  constructor(
    private mesaService: MesaService,
    private navController: NavController,
    private toastService: ToastService,
    private sectorService: SectorService,
    private estadoService: EstadoService,
    private estadiaService: EstadiaService,
    private alertController: AlertController,
    private storage: StorageService
  ) {
    this.traerSectores()
    this.traerEstados('estadomesa')
    this.loadCurrentUsuario();
    this.iniciarIntervalo();
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    clearInterval(this.intervalo);
  }

  iniciarIntervalo() {
    this.intervalo = setInterval( () => {
      console.log("EJECUTANOD INTERVALO ")
      this.traerMesas();
      this.traerEstadiaMozo();
    },5000);
  }
  
  goBack() {
    this.navController.navigateRoot('/home');
  }

  traerEstadiaMozo() {

    this.estadiaService.getEstadiasPorEstado('generada')
    .then( resp => {
      if ( resp['tipo'] == 1) {
        this.estadiasMozo = resp['data'];
        this.mostrado = false;
      } else {
        if (this.mostrado ==false) {
          this.mostrado = true;
          this.toastService.toastWarning('No se encontró Estadia en proceso.', 2000)
        }
      }
    })
  }

  existeEnEstadia(item): boolean {
    if (this.estadiasMozo) {
      let exist = false;
      for (let elem of this.estadiasMozo) {
        for (let mesa of elem.detalleestadiamesas) {
          if (item.idMesa == mesa.idMesa) {
            exist = true;
          }
        }
      }
      return exist
    } else {
      return false
    }
  }

  loadCurrentUsuario() {
    this.storage.getCurrentUsuario().then((data) => {
      this.currentUsuario = data;
    })
  }

  traerMesas() {
    this.mesaService.getMesas().then( mesas => {
      if ( mesas ) {
        this.mesas = mesas;
      } 
    })
  }

  traerSectores() {
    this.sectorService.getSectores().then( sectores => {
      if ( sectores ) {
        this.sectores = sectores;
      } 
    })
  }

  traerEstados(nombre: string) {
    this.estadoService.getEstados( nombre ).then( estados => {
      if ( estados ) {
        for ( let estado of estados ){
          if (estado.nombreEstadoMesa != 'Inhabilitada') {
            this.estados.push(estado)
          }
        }
      } 
    })
  }

  seleccionSector(item) {
    this.todoSector = false;
    this.filtroSector = item.nombreSector;
  }

  seleccionTodoSector() {
    this.todoSector = true;
    this.filtroSector = null;
  }

  seleccionEstado(item) {
    this.todoEstado = false;
    this.filtroEstado = item.nombreEstadoMesa
  }

  seleccionTodoEstado() {
    this.todoEstado = true;
    this.filtroEstado = null;
  }

  seleccionMesa( item ) {
    let estadoMesa = item.mesaestados[0].estadomesa.nombreEstadoMesa;
    if ( estadoMesa == 'Disponible') {
      console.log("CREAR NUEVA ESTADIA")
      this.navController.navigateForward('/crud-generar-estadia/0/crear/salon')
    } else if ( estadoMesa == 'Ocupada') {
      console.log("VER ESTADIA")
      this.traerEstadiaPorMesa( item.idMesa );
    } else if ( estadoMesa == 'Reservada') {
      console.log("VER RESERVA")
    } else if ( estadoMesa == 'Pendiente de Pago') {
      console.log("VER PENDIENtE DE PAGO")
      this.confirmarFinalizarEstadia(item.idMesa);
    } else {
      console.log("OTRA OPCION")
    }
  }

  traerEstadiaPorMesa( item ) {
    if ( this.existeEnEstadia({idMesa: item}) ) {
      this.estadiaService.getEstadiaPorMesa(item).then( estadia => {
        if (estadia) {
          this.ConfirmarConsultarEditarEstadia(estadia.idEstadia);
        }
      })
    } else {
      this.toastService.toastWarning('Esta mesa no esta asignada a usted', 2000)
    }
  }

  confirmarFinalizarEstadia(idMesa) {
    if ( this.existeEnEstadia({idMesa: idMesa}) ) {
      this.estadiaService.getEstadiaPorMesa(idMesa).then( estadia => {
        if (estadia) {
          this.ConfirmarFinalizarEstadia(estadia.idEstadia);
        }
      })
    } else {
      this.toastService.toastWarning('Esta mesa no esta asignada a usted', 2000)
    }
  } 

  async ConfirmarConsultarEditarEstadia( idEstadia ) {
    const alert = await this.alertController.create({
      header: 'Seleccione una Opción para Estadía',
      buttons: [
        {
          text: 'Consultar',
          cssClass: 'secondary',
          handler: ( ) => {
            this.navController.navigateForward(`/consulta-gestionar-estadia/${idEstadia}`)
          }
        }, {
          text: 'Editar',
          handler: ( ) => {
            this.navController.navigateForward(`/crud-generar-estadia/${idEstadia}/editar/salon`)
          }
        }, 
        {
          text: 'Finalizar Estadia',
          handler: ( ) => {
            this.finalizarEstadia(idEstadia);
            // this.navController.navigateForward(`/crud-generar-estadia/${idEstadia}/editar/salon`)
          }
        }
      ],
      cssClass: 'alertPrimary',
    })
    await alert.present();
  }

  async ConfirmarFinalizarEstadia( idEstadia ) {
    const alert = await this.alertController.create({
      header: 'Desea Finalizar Estadía?',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary',
          role: 'Cancel',
          handler: ( ) => {
          }
        }, {
          text: 'Finalizar',
          handler: ( ) => {
            this.finalizarEstadia(idEstadia);
          }
        }, {
          text: 'Consultar',
          handler: ( ) => {
            this.navController.navigateForward(`/consulta-gestionar-estadia/${idEstadia}`)
          }
        }, 
      ],
      cssClass: 'alertPrimary',
    })
    await alert.present();
  }

  finalizarEstadia(idEstadia) {
    this.cambiarEstadoMesas(idEstadia);
    this.finalizarEstadoEstadia(idEstadia);
  }

  async cambiarEstadoMesas(idEstadia) {
    await this.estadiaService.getEstadia(idEstadia).then( async estadia => {
      if ( estadia ) {
        console.log("~~~~~~~~~~~~~~~~~~~~~~~ ESTADIA ~~~~~~~~~~~~~~ ",estadia)
        let modificarEstado = true;
        for (let pedido of estadia.pedidos) {
          if (pedido.pedidoestados[0].idEstadoPedido != 2 && // Anulado 
            pedido.pedidoestados[0].idEstadoPedido != 6 ) {   // Finalizado
            modificarEstado = false;
          }
        }
        await this.mesaService.getMesa(Number(estadia.detalleestadiamesas[0].idMesa)).then( async response => {
          console.log("MESA ////////// ",response)
          let mesa = response['data'];
          if (response['tipo'] == 1) {
            if (modificarEstado && (mesa.mesaestados[0].idEstadoMesa == 1 || mesa.mesaestados[0].idEstadoMesa == 4 )) {
              for (let mesaACambiar of estadia.detalleestadiamesas) {
                let pathMesa = {
                  idMesa: mesaACambiar.idMesa,
                  idEstadoMesa: 2
                }
                await this.mesaService.cambiarEstado(pathMesa).then( async resp => {
                  if (resp) {
                    if (resp.tipo == 1){
                      console.log(`MESA N° ${mesaACambiar.idMesa} CAMBIADA A PENDIENTE DE PAGO`)
                    } else {
                      console.log(`MESA N° ${mesaACambiar.idMesa} NO CAMBIADA`)
                    }
                  }
                })
              }
              
            }
          }
        })
      }
    })
  }

  finalizarEstadoEstadia(idEstadia){
    let pathEstadoEstadia = {
      idEstadia: idEstadia,
      idEstadoEstadia: 2,
      descripcionEstadiaEstado: 'Finalizada correctamente.'
    }
    this.estadiaService.cambiarEstado( pathEstadoEstadia ).then(resp => {
      if(resp && resp.tipo == 1) {
        this.toastService.toastSuccess(`Estadia N° ${idEstadia} ha sido Finalizada Correctamente`,2000)
      }
    })
  }
}
