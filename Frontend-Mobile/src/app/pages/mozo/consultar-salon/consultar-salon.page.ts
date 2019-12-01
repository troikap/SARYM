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
  estados;
  todoSector = true;
  todoEstado = true;
  filtroSector;
  filtroEstado;
  mias = false;
  currentUsuario;
  estadiasMozo;

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
    console.log("Constructor Consulta SAlon")
    this.traerMesas();
    this.traerSectores()
    this.traerEstados('estadomesa')
    this.loadCurrentUsuario();
    this.traerEstadiaMozo();
   }

  ngOnInit() {
  }

  traerEstadiaMozo() {
    this.estadiaService.getProductosByAll('generada').then( resp => {
      if ( resp ) {
        this.estadiasMozo = resp;
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
      console.log("MESAS TRAIDAS ", mesas)
      if ( mesas ) {
        this.mesas = mesas;
      } 
    })
  }

  traerSectores() {
    this.sectorService.getSectores().then( sectores => {
      console.log("Sectores TRAIDoS ", sectores)
      if ( sectores ) {
        this.sectores = sectores;
      } 
    })
  }

  traerEstados(nombre: string) {
    this.estadoService.getEstados( nombre ).then( estados => {
      console.log("Estados TRAIDoS ", estados)
      if ( estados ) {
        this.estados = estados;
      } 
    })
  }

  seleccionSector(item) {
    console.log("Selecciono Sector", item)
    this.todoSector = false;
    this.filtroSector = item.nombreSector;
  }

  seleccionTodoSector() {
    console.log("Selecciono Todo")
    this.todoSector = true;
    this.filtroSector = null;
  }

  seleccionEstado(item) {
    console.log("Selecciono Estado", item)
    this.todoEstado = false;
    this.filtroEstado = item.nombreEstadoMesa
  }

  seleccionTodoEstado() {
    console.log("Selecciono Todo")
    this.todoEstado = true;
    this.filtroEstado = null;
  }

  seleccionMesa( item ) {
    console.log("SELECCIONO MESA ", item.mesaestados[0].estadomesa.nombreEstadoMesa)
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
          this.navController.navigateForward(`/seleccion-comensal-pago/${estadia.idEstadia}`)
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
        }
      ],
      cssClass: 'alertPrimary',
    })
    await alert.present();
  }
}
