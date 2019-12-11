import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { NavController, AlertController } from '@ionic/angular';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { ReservaService } from '../../../services/reserva/reserva.service';
import { MesaService } from '../../../services/mesa/mesa.service';
import { StorageService, Log } from '../../../services/storage/storage.service';
import { Mesa } from '../../../models/modelos';
import { ActivatedRoute } from '@angular/router';
import { TratarFechaProvider } from '../../../providers/tratarFecha.provider';
import { AlertService } from '../../../providers/alert.service';
import { ToastService } from '../../../providers/toast.service';
import { LoaderService } from '../../../providers/loader.service';
import { Comensal, Reserva, Estadia } from '../../../models/modelos';
import { EstadiaService } from 'src/app/services/estadia/estadia.service';
import { PedidoService } from '../../../services/pedido/pedido.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crud-generar-estadia',
  templateUrl: './crud-generar-estadia.page.html',
  styleUrls: ['./crud-generar-estadia.page.scss'],
})
export class CrudGenerarEstadiaPage implements OnInit {

  public form: FormGroup = null;
  public form2: FormGroup = null;
  public comensal: Comensal = null;
  public comensales: Comensal[] = [];
  public mensajeExistenciaUsuario: string = null;
  public existenciaUsuario: boolean = false;
  public currentUsuario;
  public mesas: Mesa[] = [];
  public checkBoxList = [];
  public fechaDesde;
  public fechaHasta;
  public accionGet;
  public idReserva = 0;
  public idEstadia = 0;
  public tipo;
  public reserva: Reserva = null;
  public estadia: Estadia = null;
  public newForm = {};
  public origenDatos;
  private comensalesClientes = [];
  private pedidosReserva = [];
  public mostrarMensajeConsideracion = 0;
  public mostrar5 = false;
  private mesasCambioEstado = [];
  private mesasInicial = [];

  public nombreUsuario;

  //Datos de Reserva a mostrar
  public horaEntradaReserva;
  public horaSalidaReserva;
  public horaEntradaCortada;
  public horaSalidaCortada;

  public fechaReserva;
  public cantPersonasReserva;

  private fechaActual;
  private horaActual;

  private errorRangoReserva;
  private errorRangoUsr;
  private errorRangoMesa;
  private errorConfReservaPrematura;
  private errorEstadoMesa;

  constructor(
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private navController: NavController,
    private usuarioservicio: UsuarioService,
    private storage: StorageService,
    private reservaservicio: ReservaService,
    private estadiaServicio: EstadiaService,
    private mesaservicio: MesaService,
    private activatedRoute: ActivatedRoute,
    private tratarFechaProvider: TratarFechaProvider,
    private alertService: AlertService,
    private alertController: AlertController,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private pedidoSercice: PedidoService
  ) { 
    this.form = this.formBuilder.group({
      cantPersonas: ['', [Validators.required, Validators.pattern(/^([0-9]|([1-5][0-9])|([6][0-2]))$/)]],
      idMesa: [null, Validators.required],
    });
    this.form2 = this.formBuilder.group({
      aliasComensal: ['',[ Validators.required]],
      edadComensal:['',[ Validators.required, Validators.pattern(/^(([1][2-9])|([2-9][0-9]))$/)]],
      cuitUsuario: ['', [Validators.pattern(/^((20)|(23)|(24)|(25)|(26)|(27)|(30))[0-9]{9}$/)]]
    });
    
    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);
      this.accionGet  = params.accion;
      this.origenDatos = params.tipo;
      if (this.origenDatos == "confReserva") { //Confirmar Reserva
        this.idReserva = params.id;
        this.verificarEstadoReserva();
        this.validarCantidadComensales();
      } else if (this.origenDatos == "estadia") {
        this.idEstadia = params.id;
      } else if (this.origenDatos == "salon") {
        this.idEstadia = params.id;
      }

      this.mostrar5 = false;
    });
  }

  async ngOnInit() {
    if (this.origenDatos == "estadia" || this.origenDatos == "salon") {
      await this.tratarFecha();
      await this.traerHoraActual();
      await this.loadCurrentUsuario();
      this.cargaInicial();
      this.validarCantidadComensales();
    }
  }

  goBack() {
    if ( this.origenDatos == 'confReserva' ) {
      this.navController.navigateRoot('/home');
    } else if (this.origenDatos == "estadia") {
      this.navController.navigateRoot('/home');
    } else if (this.origenDatos == "salon") {
      this.navController.navigateBack('/consultar-salon');
    } else {
      this.navController.navigateRoot('/home');
    }
  }
  // TODO: Hacer Loading en todas las páginas

  // TODO: Al finalizar estadía, cambiar estado de las mesas.
  
  
  async verificarEstadoReserva() {
    this.errorConfReservaPrematura = false;

    console.log("idReserva: ", this.idReserva);
    await this.reservaservicio.getReserva(this.idReserva)
    .then(async (resp: any) => {
      console.log("resp: ", resp);
      let estadoReserva = resp.reservaestados[0].estadoreserva.idEstadoReserva;
      if (estadoReserva == 1) { // Generada
        
        await this.tratarFecha();
        await this.traerHoraActual();
        await this.loadCurrentUsuario();

        await this.validarConfirmarReserva();
        console.log("errorConfReservaPrematura: ", this.errorConfReservaPrematura);
        
        if(!this.errorConfReservaPrematura) {
          this.cargaInicial();
        }
        else {
          let msg = `No puede confirmar una reserva con una anticipación mayor a ${environment.rangoHoraMaxReservaLabel}.`;
          this.toastService.toastError(msg, 5000);
          setTimeout(()=>{
            this.navController.navigateForward([`/home`]);
          }, 3000);
        }
      }
      else if (estadoReserva == 3) { // Reserva ya confirmada
        this.toastService.toastWarning("La reserva ingresada ya ha sido confirmada", 2000);
        setTimeout(()=>{
          this.navController.navigateForward([`/home`]);
        }, 2000);
      }
      else if (estadoReserva == 2) { // Reserva Anulada
        this.toastService.toastError("La reserva ingresada se encuentra Anulada", 2000);
        setTimeout(()=>{
          this.navController.navigateForward([`/home`]);
        }, 2000);
      }
    });
  }
  
  async loadCurrentUsuario() {
    await this.storage.getCurrentUsuario().then((data) => {
      this.currentUsuario = data;
    })
  }

  cargaInicial(){
    if (this.accionGet == "crear") {
      console.log("CREANDO");
      this.actualizarMesas();
    }
    else if (this.accionGet == "editar") {
      console.log("EDITANDO");
      if (this.origenDatos == "confReserva") {
        this.traerReserva();
      }
      else {
        this.traerEstadia();
      }
    }
    this.resetComensal();
  }

  traerComensales(comensales) {
    this.comensales = [];
    let comensal;
    for (let i = 0; i < comensales.length; i++) {
      comensal = {};
      comensal = comensales[i];
      if (comensales[i].usuario) {
        comensal['cuitUsuario'] = comensales[i].usuario.cuitUsuario;
      }
      if (comensales[i].idComensal != 0) {
        comensal['idComensal'] = comensales[i].idComensal;
      }
      this.comensales.push(comensal);
    }
  }

  generarPedidosReserva(pedidos) {
    this.pedidosReserva = [];
    for (let pedido of pedidos) {
      let pedObj = {};
      pedObj["idPedido"] = pedido.idPedido;
      pedObj["idComensal"] = pedido.idComensal;
      this.pedidosReserva.push(pedObj);
    }
  }
  
  traerReserva() {
    console.log("Funcion 'traerReserva()', ejecutada");
    if (this.idReserva !== 0) {
      this.reservaservicio.getReserva(this.idReserva)
      .then( res => {
        console.log("Reserva obtenida: ", res)
        if ( res['tipo'] == 2) {
          console.log("No se pudo obtener Reserva con id Nro ", this.idReserva);
        } else {
          // Reserva
          this.reserva = res;
          console.log("TrearReserva: ", this.reserva);

          // Comensales
          console.log("COMENSALES" , res.comensals);
          this.traerComensales(res.comensals);
          this.actualizarComensales();
          this.newForm = {
            cantPersonas: this.reserva.cantPersonas,
            idMesa: null     
          }
          this.form.setValue(this.newForm);
        }
      });
    }
  }

  traerEstadia() {
    console.log("Funcion 'traerEstadia()', ejecutada");
    if (this.idEstadia !== 0) {
      this.estadiaServicio.getEstadia(this.idEstadia)
      .then( res => {
        console.log("Estadia obtenida: ", res.fechaYHoraInicioEstadia)
        // Estadia
        this.estadia = res;
        console.log("TrearEstadia: ", this.estadia);

        // Comensales
        console.log("COMENSALES" , res.comensals);
        this.traerComensales(res.comensals);

        this.newForm = {
          cantPersonas: this.estadia.cantPersonas,
          idMesa: null     
        }
        this.form.setValue(this.newForm);
      });
    }
  }

  
  checkEvent( position ){
    this.form.controls.idMesa.markAsTouched();

    let cantidadComensales = this.form.value.cantPersonas;
    let xCapacidadTotalMesas = 0;
    this.checkBoxList[position].isChecked = ! this.checkBoxList[position].isChecked;
    let valid = false;
    for (let item of this.checkBoxList) {
      if (item.isChecked) {
        xCapacidadTotalMesas += item.capacidad;
        valid = true;
      }
    }
    if (valid) {
      if (cantidadComensales != "" && cantidadComensales != null) {
        if (cantidadComensales > xCapacidadTotalMesas) {
          this.form.controls.idMesa.setErrors({cant_minima_comensales: true});
          valid = false;
        }
        else {
          this.form.controls.idMesa.setValue(true);
          this.form.controls.idMesa.setErrors(null);
        }
      }
      else {
        this.form.controls.idMesa.setErrors({cant_comensales: true});
        valid = false;
      }
    } else {
      this.form.controls.idMesa.setValue(null);
    }

    if (valid && (cantidadComensales < xCapacidadTotalMesas)) {
      this.mostrarMensajeConsideracion = 1;
    }
    else {
      this.mostrarMensajeConsideracion = 0;
    }
  }

  validarCantidadComensales() {
    this.form.get('cantPersonas').valueChanges
    .subscribe(respuesta => {
      this.form.controls.idMesa.markAsUntouched();
      this.actualizarMesas();
    });
  }

  async actualizarMesas() {
    console.log("ACTUALIZAR MESAS")
    await this.mesaservicio.getMesas()
    .then( resp => {
      this.checkBoxList = [];
      this.mesas = resp;
      for (let mesa of resp) {
        this.checkBoxList.push({ 
          'value': mesa.idMesa,
          'descripcion': `Mesa: N° ${mesa.nroMesa} - Cap: ${mesa.capacidadMesa}p - Sec: ${mesa.sector.nombreSector}`,
          'isChecked': false,
          'capacidad': mesa.capacidadMesa
        })
      }
      if (this.origenDatos == "confReserva") {
        this.cargarMesasReserva();
      } else if (this.origenDatos == "estadia" && this.accionGet == "editar" ) {
        this.cargarMesasEstadia();
      } else if (this.origenDatos == "salon" && this.accionGet == "editar" ) {
        this.cargarMesasEstadia();
      }
      
    });
  }

  async cargarMesasReserva() {
    await this.reservaservicio.getReserva(this.idReserva)
    .then( res => {
      let cuenta = 0;
      let valid = false;
      for (let element of this.checkBoxList ) {
        for (let item of res.detallereservamesas) {
          if ( item.idMesa == element.value ) {
            this.checkBoxList[cuenta].isChecked = true;
            this.checkBoxList[cuenta].idDetalleReservaMesa = item.idDetalleReservaMesa;
            valid = true;
          }
        }
        cuenta += 1;
      }

      if (valid) {
        this.form.controls.idMesa.setValue(true)
      } else {
        this.form.controls.idMesa.setValue(null)
      }

      for (let item of this.checkBoxList) {
        let mesaPath = {};
        mesaPath['value'] = item.value;
        mesaPath['descripcion'] = item.descripcion;
        mesaPath['isChecked'] = item.isChecked;
        mesaPath['capacidad'] = item.capacidad;
        mesaPath['idDetalleReservaMesa'] = item.idDetalleReservaMesa;
        this.mesasInicial.push(mesaPath);
      }

    });
  }

  async cargarMesasEstadia() {
    await this.estadiaServicio.getEstadia(this.idEstadia)
    .then( res => {
      let cuenta = 0;
      let valid = false;
      for (let element of this.checkBoxList ) {
        for (let item of res.detalleestadiamesas) {
          if ( item.idMesa == element.value ) {
            this.checkBoxList[cuenta].isChecked = true;
            this.checkBoxList[cuenta].idDetalleEstadiaMesa = item.idDetalleEstadiaMesa;
            valid = true;
          }
        }
        cuenta += 1;
      }
      if (valid) {
        this.form.controls.idMesa.setValue(true)
      } else {
        this.form.controls.idMesa.setValue(null)
      }
    });
  }
  
  validarComensalNuevo() {
    console.log("validarComensalNuevo", this.form2.value.edadComensal);
    this.form2.get('edadComensal').valueChanges
    .subscribe( edad => {
      console.log("form2, edidad comensal: ", edad);
      if (edad > 150){
        this.form2.controls.edadComensal.setErrors({edad_maxima: true});
      }
      else {
        this.form2.get("edadComensal").setValidators([ Validators.required, Validators.pattern(/^[0-9]{1,3}$/)]);
      }
    });
  }

  resetComensal() {
    this.form2 = this.formBuilder.group({
      aliasComensal: ['',[ Validators.required]],
      edadComensal:['',[ Validators.required, Validators.pattern(/^(([1][2-9])|([2-9][0-9]))$/)]],
      cuitUsuario: ['', [Validators.pattern(/^((20)|(23)|(24)|(25)|(26)|(27)|(30))[0-9]{9}$/)]]
    });
    this.comensal = {
      aliasComensal: '',
      edadComensal: null,
      cuitUsuario: null,
      idUsuario: null
    }
  }

  cambiarEdadComensal( valor ){
    this.comensales[0].edadComensal = Number(valor.target.value)
  }

  agregarNuevoComensal(){
    console.log("Validar Existencia");
    
    let aliasComensalArray = [];
    let existeAlias = false;
    for (let comensal of this.comensales) {
      aliasComensalArray.push(comensal.aliasComensal);
    }
    const alias = this.form2.value.aliasComensal;
    if (aliasComensalArray.includes(alias)) { 
      this.toastService.toastError("Ya existe el Alias del Comensal que está intentando agregar.", 2500);
      existeAlias = true;
    }
    if (!existeAlias) {
      const cuit = this.form2.value.cuitUsuario;
      console.log(cuit)
      if (cuit != null && cuit != "" && cuit != "undefined") {
        this.usuarioservicio.validarExistenciaUsuario( cuit )
        .then( (res) => {
          if ( res && res.tipo == 2) {
            this.existenciaUsuario = true;
            this.comensal = {
              aliasComensal: this.form2.value.aliasComensal,
              edadComensal: this.form2.value.edadComensal,
              cuitUsuario: this.form2.value.cuitUsuario,
              idUsuario: res.data.idUsuario
            }
  
            if(this.origenDatos == "confReserva") {
              this.crearComensalReserva();
            }
            else { //es estadia
              this.crearComensalEstadia();
            }
          } else {
            this.existenciaUsuario = false;
            this.mensajeExistenciaUsuario = res.descripcion;
            this.form2.controls.cuitUsuario.setErrors({pattern: true});
            this.form2.markAsTouched();
            this.toastService.toastWarning("Cuit de Usuario ingresado es incorrecto", 2500);
          }
        });
      } else {
        this.comensal = {
          aliasComensal: this.form2.value.aliasComensal,
          edadComensal: this.form2.value.edadComensal
        }
  
        if(this.origenDatos == "confReserva") {
          this.crearComensalReserva();
        }
        else { //es estadia
          this.crearComensalEstadia();
        }
      }
    }    
  }

  crearComensalReserva() {
    let comenz = [];
    comenz.push(this.comensal);

    let pathComensales= {};
    pathComensales['detalle'] = comenz;
    pathComensales['idReserva'] = this.idReserva;

    this.reservaservicio.setComensalesReserva( pathComensales )
    .then( resp => {
      console.log("COMENSALES ",resp)
      if ( resp && resp.tipo == 1 ){
        // this.comensales.push(this.comensal);
        this.resetComensal();
        this.toastService.toastSuccess("Comensal Agregado", 2500);

        this.actualizarComensales();
      }
      else {
        this.toastService.toastWarning("Ha ocurrido un error al crear al Comensal en la Reserva", 2500);
      }
    });
  }
  crearComensalEstadia() {
    let comenz = [];
    comenz.push(this.comensal);

    let pathComensales= {};
    pathComensales['detalle'] = comenz;
    
    if (this.accionGet == "editar") { // Creo Comensal

      pathComensales['idEstadia'] = this.idEstadia;

      this.estadiaServicio.setComensalesEstadia( pathComensales )
      .then( resp => {
        if ( resp && resp.tipo == 1 ){
          // this.comensales.push(this.comensal);
          this.resetComensal();
          this.toastService.toastSuccess("Comensal Agregado", 2500);

          this.actualizarComensales();
        }
        else {
          this.toastService.toastWarning("Ha ocurrido un error al crear al Comensal en la Estadía", 2500);
        }
      });
    }
    else { // this.accionGet == "crear" --> No creo Comensal.
      this.comensales.push(this.comensal);
      this.resetComensal();
      this.toastService.toastSuccess("Comensal Agregado", 2500);
    }
  }

  async actualizarComensales() {
    this.comensales = [];
    
    if (this.idEstadia != 0) {
      await this.estadiaServicio.getEstadia(this.idEstadia)
      .then( res => {
        // Comensales
        console.log("COMENSALES" , res.comensals);
        this.traerComensales(res.comensals);
      });
    }
    else if (this.idReserva != 0) {
      await this.reservaservicio.getReserva(this.idReserva)
      .then( res => {
        // Comensales
        console.log("COMENSALES" , res.comensals);
        this.traerComensales(res.comensals);
        this.generarPedidosReserva(res.pedidos);
      });
    }
  }

  nuevoComensal() {
    this.agregarNuevoComensal();
  }

  eliminarComensal( num: number, idComensal){
    this.confirmarEliminado(num, idComensal);
  }

  cargarPedido(num: number) {
    if (this.origenDatos == "confReserva") { //Pedidos para Reserva
      this.navController.navigateForward([`/lista-pedido/reserva/${this.idReserva}/comensal/${num}`]);
    }
    else { // Pedidos para Estadía
      this.navController.navigateForward([`/lista-pedido/estadia/${this.idEstadia}/comensal/${num}`]);
    }    
  }

  async confirmarEliminado(num: number, idComensal) {

    console.log("idComensal: ", idComensal);

    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: `¿Desea Eliminar el comensal seleccionado?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: ( resp ) => {
            // no hacer nada
          }
        }, {
          text: 'Eliminar Comensal',
          handler: () => {
            if (this.origenDatos == "confReserva") {
              let pathComensal = { 
                idReserva: this.idReserva,
                detalle: [ 
                  { 
                    idComensal: idComensal, 
                    baja: true
                  }
                ]
              };
              this.reservaservicio.setComensalesReserva(pathComensal)
              .then( respuesta => {
                if ( respuesta && respuesta.tipo == 1){
                  this.toastService.toastSuccess('Comensal eliminado correctamente.', 1500)
                  this.actualizarComensales();
                } else {
                  this.ConfirmarEliminarComensalAsociado('Confirmar Eliminado', 'El Comensal posee pedidos asociados. ¿Desea eliminar el Comensal con todos sus Pedidos?', pathComensal, idComensal);
                }
              }).catch( error => {
                console.log("ERROR ", error)
              });
            }
            else if ((this.origenDatos == "estadia" || this.origenDatos == "salon") && this.accionGet == "editar") {
              let pathComensal = { 
                idEstadia: this.idEstadia,
                detalle: [ 
                  { 
                    idComensal: idComensal, 
                    baja: true
                  }
                ]
              };
              this.estadiaServicio.setComensalesEstadia(pathComensal)
              .then( respuesta => {
                if ( respuesta && respuesta.tipo == 1){
                  this.toastService.toastSuccess('Comensal eliminado correctamente.', 1500)
                  this.actualizarComensales();
                } else {
                  this.ConfirmarEliminarComensalAsociado('Confirmar Eliminado', 'El Comensal posee pedidos asociados. ¿Desea eliminar el Comensal con todos sus Pedidos?', pathComensal, idComensal);
                }
              }).catch( error => {
                console.log("ERROR ", error)
              });
            }
            else { // this.origenDatos == "estadia" && this.accionGet == "crear"
              if ( this.comensales[num].idComensal ) {
                this.comensales[num].baja = true;
              } else {
                this.comensales.splice(num,1);
              }
              this.toastService.toastSuccess("Comensal Eliminado", 2000);
            }
          }
        }
      ],
      cssClass: 'alertWarning',
    });
    await alert.present();
  } 

  async ConfirmarEliminarComensalAsociado(pTitulo: string, pMensaje: string, pathComensal, idComensal: number) {
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
          text: 'Eliminar',
          handler: ( info ) => {
            if ((this.origenDatos == "estadia" || this.origenDatos == "salon") && this.accionGet == "editar") { //Verificar Pedidos de Estadía
              if (this.verificarEliminarComensalEstadia(idComensal)) {
                console.log("Obligar eliminacion de comensal con pedidos asociados", pathComensal)
                this.estadiaServicio.setComensalesEstadia(pathComensal, true)
                .then( respuesta => {
                  if ( respuesta && respuesta.tipo == 1 ){
                    this.toastService.toastSuccess(`Comensal eliminado Correctamente con todos sus Pedidos asociados.`, 2500)
                    this.actualizarComensales();
                  }
                })
              }
              else {
                this.toastService.toastError(`No se ha podido eliminar el Comensal. El mismo posee Pedidos Finalizados o Pendientes de Pago.`, 3000)
              }
            }
            else {
              console.log("Obligar eliminacion de comensal con pedidos asociados")
              this.reservaservicio.setComensalesReserva(pathComensal, true)
              .then( respuesta => {
                if ( respuesta && respuesta.tipo == 1 ){
                  this.toastService.toastSuccess(`Comensal eliminado Correctamente con todos sus Pedidos asociados.`, 2500)
                  this.actualizarComensales();
                }
              })
            }
          }
        }
      ],
      cssClass: 'alertWarning',
    })
    await alert.present();
  }

  verificarEliminarComensalEstadia (idComensal: number): boolean { 
    //Si al menos un pedido se encuentra en ciertos estados, NO permitir eliminar Comensal
    for (let item of this.estadia.pedidos) {
      if (idComensal == item.idComensal) {
        let estadoPedido = item['pedidoestados'][0].estadopedido.idEstadoPedido;
        console.log("Estado Pedido: ", estadoPedido);
        if (estadoPedido == 5 || estadoPedido == 6 || estadoPedido == 7 ) { // Que no permite si estado es: Finalizado, Finalizado Sin Pagar, Pendiente de Pago
          return false;
        }
      }
    }
    return true;
  }
  
  async crearEditarEstadia() {
    let estadia;
    let cantPersonas = this.form.value['cantPersonas']; 
    console.log("cantPersonas del formulario: ", cantPersonas);
    if (((this.origenDatos == "estadia" || this.origenDatos == "salon") && this.accionGet == "crear") || (this.origenDatos == "confReserva")) {
      estadia = {
        cantPersonas: cantPersonas
      }
    }
    else  if (this.accionGet == "editar") {
      estadia = {
        idEstadia: this.idEstadia,
        cantPersonas: cantPersonas
      }
    }
    const mesas = []
    for (let item of this.checkBoxList) {
      if (item.isChecked) {
        mesas.push({'idMesa': item.value})
      } else {
        mesas.push({'idDetalleEstadiaMesa': item.idDetalleEstadiaMesa, 'baja': true})
      }
    }
    const mesasAux = []
    for (let item of this.checkBoxList) {
      if (item.isChecked) {
        mesasAux.push({'idMesa': item.value, 'idDetalleEstadiaMesa': null, 'baja': false})
      } else {
        if (item.idDetalleEstadiaMesa != undefined) {
          mesasAux.push({'idMesa': item.value, 'idDetalleEstadiaMesa': item.idDetalleEstadiaMesa, 'baja': true})
        }
        else {
          mesasAux.push({'idMesa': item.value, 'idDetalleEstadiaMesa': null, 'baja': true})
        }
      }
    }
    this.generarMesasCambioEstado(mesasAux);

    const comensales = this.comensales;   
    estadia['idUsuario'] = this.currentUsuario.id; //Setea al Mozo en la estadía
    estadia['cuitUsuario'] = this.currentUsuario.cuit;
    
    let estadiaConCodigo = await this.agregarCodigoEstadia( estadia );
    await this.validarCreacionEstadia(estadia, mesas, comensales, estadiaConCodigo);
    
  }

  async validarCreacionEstadia(estadia, mesas, comensales, estadiaConCodigo) {
    this.errorRangoMesa = false;
    this.errorRangoReserva = false;
    this.errorRangoUsr = false;
    this.errorEstadoMesa = false;

    await this.validarReservasGeneradasRango(mesas);
    await this.validarEstadiasGeneradasRango(mesas, comensales);
    
    console.log("errorRangoMesa: ", this.errorRangoMesa, ", errorRangoReserva: ", this.errorRangoReserva, ", errorRangoUsr: ", this.errorRangoUsr,", this.errorEstadoMesa: ", this.errorEstadoMesa );

    if (!this.errorRangoMesa && !this.errorRangoReserva && !this.errorRangoUsr && !this.errorEstadoMesa) {
      if ((this.origenDatos == "estadia" || this.origenDatos == "salon") && this.accionGet == "crear") {
        this.generarComensalesClientes();
        this.enviarEstadiaCrear( estadiaConCodigo , comensales, mesas); 
      }
      else if ((this.origenDatos == "estadia" || this.origenDatos == "salon") && this.accionGet == "editar") {
        this.enviarEstadiaEditar( estadia , comensales, mesas); 
      }
      else if (this.origenDatos == "confReserva") {
        estadiaConCodigo['idReserva'] = this.idReserva;
        this.generarComensalesClientes();
        this.confirmarReserva( estadiaConCodigo , comensales, mesas);
      }
    }
    else {
      if (this.errorRangoReserva) {
        let msg = "Existe una reserva para al menos una de las mesa seleccionadas, sin confirmar.";
        this.toastService.toastError(msg, 5000);
      }
      else if (this.errorRangoMesa) {
        let msg = "Ya existe una estadía con al menos una de las mesa seleccionadas.";
        this.toastService.toastError(msg, 5000);
      }
      else if (this.errorEstadoMesa) { // this.errorEstadoMesa
        let msg = "Existen mesas no disponibles en la reserva que intenta confirmar.";
        this.toastService.toastError(msg, 5000);
      }
      else { // this.errorRangoUsr
        let msg = "Ya existe una estadía a nombre de al menos uno de los clientes ingresados.";
        this.toastService.toastError(msg, 5000);
      }
    }
  }

  async validarConfirmarReserva() {
    //Validación: No permitir Confirmar Reserva, con una antelación mayor a la fecha y hora de ingreso, y el rango 
    //permitido: environment.rangoHoraMaxReserva
    await this.reservaservicio.getReservasPorEstado("generada")
    .then((res:any) => {
      if ( res && res.tipo != 2) {
        let reservasGeneradas = res.data;
        for (let reserva of reservasGeneradas) {
          let fechaReserva = reserva.fechaReserva;
          let horaEntradaReserva = reserva.horaEntradaReserva;
          if (fechaReserva == this.fechaActual) {
            console.log("horaActual: ", this.horaActual);
            console.log("this.lessTimes(horaEntradaReserva , environment.rangoHoraMaxReserva): ", this.lessTimes(horaEntradaReserva , environment.rangoHoraMaxReserva));
            console.log("Se cumple: ?: ", this.horaActual < (this.lessTimes(horaEntradaReserva , environment.rangoHoraMaxReserva)));
            if (
              (this.horaActual < (this.lessTimes(horaEntradaReserva , environment.rangoHoraMaxReserva)))
            ) {
              this.errorConfReservaPrematura = true; 
              break; 
            }
          }
          else {
            // Si fecha no coincide, es porque es una fecha menor a la actual, de lo contrario no llegaría a esta instancia,
            // ya que se verifica (previamente), que la reserva no esté anulada. 
            // Para reservas que se encuentren sin confirmar con fecha y hora inicio de la reserva mayor a la configuración 
            // de rangoHoraMaxReserva, el sistema ya contempla la anulación y liberación de las mesas.
            
            console.log("fechaReserva: ", fechaReserva);
            console.log("this.fechaActual: ", this.fechaActual);

            this.errorConfReservaPrematura = true;
            break;
          }
        }
      }
    });
  }

  async validarReservasGeneradasRango(mesas) {
    await this.reservaservicio.getReservasPorEstado("generada")
    .then((res:any) => {
      if ( res && res.tipo != 2) {
        let reservasGeneradas = res.data;
        for (let reserva of reservasGeneradas) {
          let fechaReserva = reserva.fechaReserva;
          let horaEntradaReserva = reserva.horaEntradaReserva;
          let idMesasReserva = [];
          let idMesasActual = [];
          for (let mesasreserva of reserva.detallereservamesas) {
            let mesaToda = mesasreserva.mesa.idMesa;
            if (mesaToda != "" && mesaToda != null && mesaToda != "undefined") {
              idMesasReserva.push(mesaToda);
            }
          }
          for (let mesasActual of mesas) {
            let mesaAct = mesasActual.idMesa;
            if (mesaAct != "" && mesaAct != null && mesaAct != "undefined") {
              idMesasActual.push(mesaAct);
            }
          }
          
          //Validación: No permitir generar/editar para al menos una mesa de la Estadia, si existen Reservas dentro del rango de la fecha de entrada
          // de la reserva y el mínimo y máximo de confirmación: environment.rangoHoraMaxReserva y environment.rangoHoraMinReserva
          if (fechaReserva == this.fechaActual) {
            for(let mesaReserva of idMesasReserva) {
              for (let mesaActual of idMesasActual) {
                let mesaAct = mesaActual;
                if (mesaReserva == mesaAct) {
                  if (this.origenDatos == "confReserva") {
                    let idReservaTodas = reserva.idReserva
                    if (this.idReserva != idReservaTodas) {
                      if (this.validarRangoHorarioReserva(horaEntradaReserva)) {
                        this.errorRangoReserva = true;    
                        break;    
                      }
                    }
                  }
                  else {
                    if (this.validarRangoHorarioReserva(horaEntradaReserva)) {
                      this.errorRangoReserva = true;    
                      break;    
                    }
                  }
                }
              }
              if (this.errorRangoReserva) {
                break;
              }
            }
          }
          if (this.errorRangoReserva) {
            break;
          }
        }
      }
    });
  }

  validarRangoHorarioReserva(horaEntradaReserva) {
    if (
      (this.horaActual >= (this.lessTimes(horaEntradaReserva , environment.rangoHoraMaxReserva))) && 
      (this.horaActual < (this.addTimes(horaEntradaReserva, environment.rangoHoraMinReserva))) 
    ) {
      return true;       
    }
    else {
      return false;
    }
  }

  async validarEstadiasGeneradasRango(mesas, comensales) {
    await this.estadiaServicio.getEstadiasPorEstado("generada")
    .then((est:any) => {
      if (est.tipo == 1) {
        let estadiasGeneradas = est.data;
        for (let estadias of estadiasGeneradas) {
          let fechaEstadiaYHoraInicioEstadia = estadias.fechaYHoraInicioEstadia;
  
          let fechaEstadia = this.tratarFechaProvider.traerDate(fechaEstadiaYHoraInicioEstadia);
          let idMesasEstadia = [];
          let idMesasActual = [];
          let idUsuariosActual = [];
          let idUsuariosEstadia = [];
          let idEstadiaTodas = estadias.idEstadia;
          for (let mesaEstadia of estadias.detalleestadiamesas) {
            let mesaEst = mesaEstadia.mesa.idMesa;
            if (mesaEst != "" && mesaEst != null && mesaEst != "undefined") {
              idMesasEstadia.push(mesaEst);
            }
          }
          for (let mesasActual of mesas) {
            let mesaAct = mesasActual.idMesa;
            if (mesaAct != "" && mesaAct != null && mesaAct != "undefined") {
              idMesasActual.push(mesaAct);
            }
          }
          for (let comenActual of comensales) {
            let idUsrAct = comenActual.idUsuario;
            if (idUsrAct != null && idUsrAct != "" && idUsrAct != "undefined") {
              idUsuariosActual.push(idUsrAct);
            }
          }
          for (let comenTodas of estadias.comensals) {
            let idUsrTod = comenTodas.idUsuario;
            if (idUsrTod != null && idUsrTod != "" && idUsrTod != "undefined") {
              idUsuariosEstadia.push(idUsrTod);
            }
          }
          //Validación: No permitir generar/editar estadía si existiera al menos una de las mesas en una estadía Activa
          if (fechaEstadia == this.fechaActual) {
            for(let mesaEstadia of idMesasEstadia) {
              console.log("mesaEstadia: ", mesaEstadia);
              for (let mesaActual of idMesasActual) {
                console.log("mesaActual: ", mesaActual);
                console.log("mesaEstadia == mesaActual ?: ", mesaEstadia == mesaActual);
                if (mesaEstadia == mesaActual) {
                  //NO VERIFICO RANGO HORARIO, PUES LAS ESTADIAS EN ESTADO "GENERADA" SIEMPRE SON ACTIVAS
                  if (this.accionGet == "editar") {
                    if (idEstadiaTodas != this.idEstadia) {
                      this.errorRangoMesa = true;
                      break;
                    }
                  } 
                  else {
                    this.errorRangoMesa = true;
                    break;
                  }
                }
              }
              if (this.errorRangoMesa) {
                break;
              }
            }
            if (!this.errorRangoMesa) { //Si no da error de estadía, entonces verifico por usuario
              //Validación: No permitir generar/editar estadía si al menos uno de los comensales de la estadía ya se encuentra 
              //en una estadía activa.
              for(let usuarioActual of idUsuariosActual) {
                for (let usuarioEstadia of idUsuariosEstadia) {
                  //NO VERIFICO RANGO HORARIO, PUES LAS ESTADIAS EN ESTADO "GENERADA" SIEMPRE SON ACTIVAS
                  if (usuarioActual == usuarioEstadia) {
                    if (this.accionGet == "editar") {
                      if (idEstadiaTodas != this.idEstadia) {
                        this.errorRangoUsr = true;
                        break;
                      }
                    } 
                    else {
                      this.errorRangoUsr = true;
                      break;
                    }
                  }                  
                }
                if (this.errorRangoUsr) {
                  break;
                }
              }
            }
          }

          if (!this.errorRangoMesa && !this.errorRangoUsr) {
            //Validación: No permitir Confirmar Reserva, crear o editar una estadía si al menos una de las mesas de la misma NO 
            //se encontrara en estado Disponible o Reservada.
            for (let mesasActual of mesas) {
              let idMesaAct = mesasActual.idMesa;
              if (idMesaAct != "" && idMesaAct != null && idMesaAct != "undefined") {
                this.mesaservicio.getMesa(idMesaAct)
                .then((mesa: any) => {
                  let estadoMesa = mesa.data.mesaestados[0].idEstadoMesa;
                  if (estadoMesa != 2 && estadoMesa != 3) { // Si estadoMesa != "DISPONIBLE" AND estadoMesa != "RESERVADA" 
                    if (this.accionGet == "editar") {
                      if (idEstadiaTodas != this.idEstadia) {
                        this.errorEstadoMesa = true;
                      }
                    } 
                    else {
                      this.errorEstadoMesa = true;
                    }
                  }
                });
              }
              if (this.errorEstadoMesa) {
                break;
              }
            }
          }
          if (this.errorRangoMesa || this.errorRangoUsr || this.errorEstadoMesa) {
            break;
          }
        }
      }
    });
  }

  generarMesasCambioEstado(mesas) {
    this.mesasCambioEstado = [];
    for (let mesasActual of mesas) {
      let idMesaActual = mesasActual.idMesa;
      let idDetalleEstadiaActual = mesasActual.idDetalleEstadiaMesa;
      let baja = mesasActual.baja;
      if (!baja) {
        let mesaCambEst = {};
        mesaCambEst['idMesa'] = idMesaActual;
        mesaCambEst['idEstadoMesa'] = 1; // Estado: Ocupada
        this.mesasCambioEstado.push(mesaCambEst);
      }
      else {
        if (idDetalleEstadiaActual != null) {
          let mesaCambEst = {};
          mesaCambEst['idMesa'] = idMesaActual;
          mesaCambEst['idEstadoMesa'] = 2; // Estado: Disponible
          this.mesasCambioEstado.push(mesaCambEst);
        }
      }
    }
    
    if (this.origenDatos == "confReserva") { //verificar las Mesas eliminadas para cambiar de Estado Reserva (si es que está así) a Libre
      for (let inicial of this.mesasInicial) {
        let idMesaIni = inicial.value;
        let isChecked = inicial.isChecked;
        if (isChecked) {
          for (let actual of mesas) {
            let idMesaAct = actual.idMesa;
            let baja = actual.baja;
            if (idMesaIni == idMesaAct && baja) {
              let mesaCambEst = {};
              mesaCambEst['idMesa'] = idMesaIni;
              mesaCambEst['idEstadoMesa'] = 2; // Estado: Disponible
              this.mesasCambioEstado.push(mesaCambEst);
            }
          }
        }
      }
    }

    console.log("++++++++++++++++++++");
    console.log("this.mesasCambioEstado: ", this.mesasCambioEstado);
  }
  
  generarComensalesClientes() {
    this.comensalesClientes = [];
    for (let item of this.comensales) {
      if (item.idUsuario != null) {
        this.comensalesClientes.push({"idUsuario": item.idUsuario});
      }
    }
    if (this.comensalesClientes.length == 0) { //No hay usuarios en la estadía. Se coloca al Mozo como cliente
      this.comensalesClientes.push({"idUsuario": this.currentUsuario.id});
    }
  }

  agregarCodigoEstadia( data ) {
    let codEstadia = `${data.idUsuario}-${data.cuitUsuario}-ESTADIA`;
    data['codEstadia'] = codEstadia;
    return data
  }

  // TOKEN Estadia
  agregarTokenEstadia( data, estadia ) {
    let tokenEstadia = `ESTADIA-${data.id}-${estadia.idUsuario}`;
    return tokenEstadia
  }

  async actualizarPedidos(idEstadia) {
    let pedidosEstadia = {};
    let pathPedidoEstadia = [];
    for (let pedido of this.pedidosReserva) {
      pedidosEstadia = pedido;
      pedidosEstadia["idEstadia"] = idEstadia;
      pathPedidoEstadia.push(pedidosEstadia);
    }
    for (let item of pathPedidoEstadia) {
      await this.pedidoSercice.updatePedido(item)
      .then( respo => {
        console.log("Pedido asiciado a Estadia: ", item);
      });
    }
  }
  
  async confirmarReserva(estadia, comensales, mesas) {
    await this.estadiaServicio.setEstadia( estadia )
    .then( async res => {
      if( res && res.tipo == 1) {
        let tokenEstadia = await this.agregarTokenEstadia(res, estadia)
        let data = { 'idEstadia': res.id ,tokenEstadia}
        await this.estadiaServicio.updateEstadia( data )
        .then(async update => {
          if ( update && update.tipo == 1) {
            let pathComensales= {};
            pathComensales['detalle'] = comensales;
            pathComensales['idEstadia'] = res.id;
            await this.estadiaServicio.setComensalesEstadia( pathComensales )
            .then(async resp => {
              if ( resp && resp.tipo == 1 ){

                await this.actualizarPedidos(res.id);
               
                let pathMesas= {};
                pathMesas['detalle'] = mesas;
                pathMesas['idEstadia'] = res.id;
                await this.estadiaServicio.setMesasEstadia( pathMesas )
                .then(async respo1 => {
                  let pathClienteComensal = {};
                  pathClienteComensal['idEstadia'] = res.id;
                  pathClienteComensal['detalle'] = this.comensalesClientes;
                  await this.estadiaServicio.setClienteEstadia(pathClienteComensal)
                  .then(async respo2 => {
                    if ( respo2 && respo2.tipo == 1 ){
                      let pathReserva = {};
                      pathReserva['idReserva'] = this.idReserva;
                      pathReserva['idEstadoReserva'] = 3; // Confirmar Reserva
                      await this.reservaservicio.cambiarEstado(pathReserva)
                      .then(async respo3 => {
                        if ( respo3 && respo3.tipo == 1 ){
                          
                          await this.cambiarEstadoMesas();

                          this.toastService.toastSuccess(`Estadia Creada Satisfactoriamente. N° ${res.id}`, 2000);
                          setTimeout(()=>{
                            this.navController.navigateForward([`/seleccion-comensal/estadia/${res.id}/creacion`]);
                          }, 2000);
                        }
                        else {
                          this.toastService.toastError("No se han podido confirmar la Reserva:" + respo3.title, 2500);
                        }
                      });
                    }
                    else {
                      this.toastService.toastError("No se han podido crear la relación Cliente-Comensal:" + respo2.title, 2500);
                    }
                  });                    
                });
              } else {
                this.toastService.toastError("No se han podido crear los comensales:" + resp.title, 2500);
              }
            });
          } else {
            this.toastService.toastError("No se han podido crear los datos de la estadia:" + update.title, 2500);
          }
        });
      } else {
        this.toastService.toastError("Error al Crear Estadía:" + res.title, 2500);
      }
    });
  }

  async cambiarEstadoMesas() {
    for (let mesa of this.mesasCambioEstado) {
      let pathMesa = {}
      pathMesa['idMesa'] = mesa.idMesa;
      pathMesa['idEstadoMesa'] = mesa.idEstadoMesa;
      await this.mesaservicio.cambiarEstado(pathMesa)
      .then(respo4 => {});
    }
  }

  async enviarEstadiaEditar(estadia, comensales, mesas) {
    console.log("enviarEstadiaEditar, estadia: ", estadia);
    console.log("comensales", comensales);
    console.log("mesas", mesas);
    await this.estadiaServicio.updateEstadia( estadia )
    .then(async update => {
      if ( update && update.tipo == 1) {
        let pathComensales= {};
        pathComensales['detalle'] = comensales;
        pathComensales['idEstadia'] = this.idEstadia;
        await this.estadiaServicio.setComensalesEstadia( pathComensales )
        .then(async resp => {
          if ( resp && resp.tipo == 1 ){
            let pathMesas= {};
            pathMesas['detalle'] = mesas;
            pathMesas['idEstadia'] = this.idEstadia;
            await this.estadiaServicio.setMesasEstadia( pathMesas )
            .then(async respo => {

              await this.cambiarEstadoMesas();
      
              this.toastService.toastSuccess(`Estadia N° ${this.idEstadia}, actualizada satisfactoriamente.`, 2500);
              setTimeout(()=>{
                if (this.origenDatos == "estadia") {
                  this.navController.navigateRoot(['/consulta-gestionar-estadia', this.idEstadia ]);
                }
                else if (this.origenDatos == "salon") {
                  this.navController.navigateRoot(['/consultar-salon']);
                }
                else {
                  this.navController.navigateRoot(['/home']);
                }
              }, 2500);

            });
          } else {
            this.toastService.toastError("No se han podido actualizar los comensales:" + resp.title, 2500);
          }
        });
      } else {
        this.toastService.toastError("Error:" + update.title, 2500);
      }
    });
  }

  async enviarEstadiaCrear(estadia, comensales, mesas) {
    await this.estadiaServicio.setEstadia( estadia )
    .then( async res => {
      if( res && res.tipo == 1) {
        let tokenEstadia = await this.agregarTokenEstadia(res, estadia)
        let data = { 'idEstadia': res.id ,tokenEstadia}
        await this.estadiaServicio.updateEstadia( data )
        .then(async update => {
          if ( update && update.tipo == 1) {
            console.log("comensales: ", comensales);
            let pathComensales= {};
            pathComensales['detalle'] = comensales;
            pathComensales['idEstadia'] = res.id;
            await this.estadiaServicio.setComensalesEstadia( pathComensales )
            .then(async resp => {
              if ( resp && resp.tipo == 1 ){
                let pathMesas= {};
                pathMesas['detalle'] = mesas;
                pathMesas['idEstadia'] = res.id;
                await this.estadiaServicio.setMesasEstadia( pathMesas )
                .then(async respo => {
                  let pathClienteComensal = {};
                  pathClienteComensal['idEstadia'] = res.id;
                  pathClienteComensal['detalle'] = this.comensalesClientes;
                  await this.estadiaServicio.setClienteEstadia(pathClienteComensal)
                  .then(async respo1 => {
                    if ( respo1 && respo1.tipo == 1 ){
                      
                      await this.cambiarEstadoMesas();

                      this.toastService.toastSuccess(`Estadia Creada Satisfactoriamente. N° ${res.id}`, 2000);
                      setTimeout(()=>{
                        this.navController.navigateForward([`/seleccion-comensal/estadia/${res.id}/creacion`]);
                      }, 2000);
                    }
                    else {
                      this.toastService.toastError("No se han podido crear la relación Cliente-Comensal:" + respo1.title, 2500);
                    }
                  });
                });
              } else {
                this.toastService.toastError("No se han podido crear los comensales:" + resp.title, 2500);
              }
            });
          } else {
            this.toastService.toastError("No se han podido crear los datos de la estadia:" + update.title, 2500);
          }
        });
      } else {
        this.toastService.toastError("Error:" + res.title, 2500);
      }
    })
  }

  async tratarFecha(){
    let date = new Date();
    let dd = await date.getDate();
    let mm = await date.getMonth() + 1;
    let mm2 = await date.getMonth() + 1 + 5;
    let yy = await date.getFullYear();
    let dia;
    let mes;
    let mes2;
    let año;
    if (mm2 > 12) {
      mm2 = mm2 - 12;
      año = yy + 1;
    }
    if ((dd >= 0) && (dd < 10)) {  
      dia = "0" + String(dd);
    } else {
      dia = dd;
    }
    if ((mm >= 0) && (mm < 10)) {  
      mes = "0" + String(mm);
    } else {
      mes = mm;
    }
    if ((mm2 >= 0) && (mm2 < 10)) {  
      mes2 = "0" + String(mm2);
    } else {
      mes2 = mm2;
    }
    this.fechaDesde = `${yy}-${mes}-${dia}`;
    this.fechaActual = `${yy}-${mes}-${dia}`;
    this.fechaHasta = `${año}-${mes2}-${dia}`;
  }

  addTimes(startTime, endTime) {
    var times = [ 0, 0, 0 ]
    var max = times.length
    var a = ( startTime || '').split(':')
    var b = (endTime || '').split(':')
    // normalize time values
    for (var i = 0; i < max; i++) {
      a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
      b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
    }
    // store time values
    for (var i = 0; i < max; i++) {
      times[i] = a[i] + b[i]
    }
    var hours = times[0]
    var minutes = times[1]
    var seconds = times[2]
    if (seconds >= 60) {
      var m = (seconds / 60) << 0
      minutes += m
      seconds -= 60 * m
    }
    if (minutes >= 60) {
      var h = (minutes / 60) << 0
      hours += h
      minutes -= 60 * h
    }
    return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) 
  }

  lessTimes(startTime, endTime) {
    var times = [ 0, 0, 0 ]
    var max = times.length
    var a = ( startTime || '').split(':')
    var b = (endTime || '').split(':')
    // normalize time values
    for (var i = 0; i < max; i++) {
      a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
      b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
    }
    // store time values
    for (var i = 0; i < max; i++) {
      times[i] = a[i] - b[i];
    }
    var hours = times[0];
    var minutes = times[1];
    var seconds = times[2];

    if (seconds < 0) {
      var m =  60 + seconds; // seconds es negativo, por eso sumo (para restar)
      minutes -= 1
      seconds = m
    }
    if (minutes < 0) {
      var h = 60 + minutes; // minutes es negativo, por eso sumo (para restar)
      hours -= 1;
      minutes = h;
    }
    return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2);
  }

  async traerHoraActual() {
    let date = new Date();
    this.horaActual = await this.tratarFechaProvider.traerTime(date);
    this.horaActual += ":00";
  }
}
