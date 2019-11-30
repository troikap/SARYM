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

  public nombreUsuario;

  //Datos de Reserva a mostrar
  public horaEntradaReserva;
  public horaSalidaReserva;
  public horaEntradaCortada;
  public horaSalidaCortada;

  public fechaReserva;
  public cantPersonasReserva;

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
      cantPersonas: ['', Validators.required],
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

  ngOnInit() {
    if (this.origenDatos == "estadia" || this.origenDatos == "salon") {
      this.tratarFecha();
      this.loadCurrentUsuario();
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

  // TODO: Al generar Estadía, cambiar el estado de las mesas.

  // TODO: Al finalizar estadía, cambiar estado de las mesas.

  // TODO: No permitir Confirmar Reserva si horario es antes 30min o después 30min de la hora de Entrada de la reserva.

  // TODO: No permitir generar Estadía (o editar), si existen estadías en misma fecha, mismo rango horario y misma mesa.

  // TODO: No permitir generar Estadía (o editar), si existen reservas para esa misma fecha, mismo rango horario (+30min -30min, hora de entrada de Reserva) y misma mesa.

  // TODO: No permitir generar Estadía (o editar), para un mismo usuario, misma fecha, mismo rango horario

  // TODO: Al generar, editar o confirmar Reserva, verificar Reservas para la fecha y hora actual-con Hora Entrada Reserva, en estado Generada (es decir, NO confirmadas). Aquellas Estadías que superen los 30min desde su Entrada de Reserva comparado con la fecha y hora actual, ANULARLA y colocar detalle que la misma fue anulada por no haber sido confirmada.
  verificarEstadoReserva() {
    console.log("idReserva: ", this.idReserva);
    this.reservaservicio.getReserva(this.idReserva)
    .then((resp: any) => {
      console.log("resp: ", resp);
      let estadoReserva = resp.reservaestados[0].estadoreserva.idEstadoReserva;
      if (estadoReserva == 1) { // Generada
        this.tratarFecha();
        this.loadCurrentUsuario();
        this.cargaInicial();
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
  
  loadCurrentUsuario() {
    this.storage.getCurrentUsuario().then((data) => {
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
    console.log("Validar Existencia")
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
            else if (this.origenDatos == "estadia" && this.accionGet == "editar") {
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
            if (this.origenDatos == "estadia" && this.accionGet == "editar") { //Verificar Pedidos de Estadía
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
    if ((this.origenDatos == "estadia" && this.accionGet == "crear") || (this.origenDatos == "confReserva")) {
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
        mesas.push({'idDetalleReservaMesa': item.idDetalleReservaMesa, 'baja': true})
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
    let encuentraUsr = false;
    for (let comensal of comensales) {
      if (comensal.idUsuario != null) {
        estadia['idUsuario'] = comensal.idUsuario;
        estadia['cuitUsuario'] = comensal.cuitUsuario;
        encuentraUsr = true;
        break;
      }
    }

    if (!encuentraUsr) {
      estadia['idUsuario'] = this.currentUsuario.id; //Setea al Mozo, en caso de no existir usuario entre los comensales
      estadia['cuitUsuario'] = this.currentUsuario.cuit;
    }
    
    let estadiaConCodigo = await this.agregarCodigoEstadia( estadia );
    if (this.origenDatos == "estadia" && this.accionGet == "crear") {
      this.generarComensalesClientes();
      this.enviarEstadiaCrear( estadiaConCodigo , comensales, mesas); 
    }
    else if (this.origenDatos == "estadia" && this.accionGet == "editar") {
      this.enviarEstadiaEditar( estadia , comensales, mesas); 
    }
    else if (this.origenDatos == "confReserva") {
      estadiaConCodigo['idReserva'] = this.idReserva;
      this.generarComensalesClientes();
      console.log("mesas: ", mesas);
      //this.confirmarReserva( estadiaConCodigo , comensales, mesas);
    }
  }

  generarMesasCambioEstado(mesas) {
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
        this.estadiaServicio.updateEstadia( data )
        .then( update => {
          if ( update && update.tipo == 1) {
            let pathComensales= {};
            pathComensales['detalle'] = comensales;
            pathComensales['idEstadia'] = res.id;
            this.estadiaServicio.setComensalesEstadia( pathComensales )
            .then(async resp => {
              if ( resp && resp.tipo == 1 ){

                await this.actualizarPedidos(res.id);
               
                let pathMesas= {};
                pathMesas['detalle'] = mesas;
                pathMesas['idEstadia'] = res.id;
                this.estadiaServicio.setMesasEstadia( pathMesas )
                .then( respo1 => {
                  let pathClienteComensal = {};
                  pathClienteComensal['idEstadia'] = res.id;
                  pathClienteComensal['detalle'] = this.comensalesClientes;
                  this.estadiaServicio.setClienteEstadia(pathClienteComensal)
                  .then( respo2 => {
                    if ( respo2 && respo2.tipo == 1 ){
                      let pathReserva = {};
                      pathReserva['idReserva'] = this.idReserva;
                      pathReserva['idEstadoReserva'] = 3; // Confirmar Reserva
                      this.reservaservicio.cambiarEstado(pathReserva)
                      .then( respo3 => {
                        if ( respo3 && respo3.tipo == 1 ){
                          for (let mesa of this.mesasCambioEstado) {
                            let pathMesa = {}
                            pathMesa['idMesa'] = mesa.idMesa;
                            pathMesa['idEstadoMesa'] = mesa.idEstadoMesa;
                            this.mesaservicio.cambiarEstado(pathMesa)
                            .then(respo4 => {
                              if (respo4.tipo != 2) {
                                this.toastService.toastSuccess(`Estadia Creada Satisfactoriamente. N° ${res.id}`, 2000);
                                setTimeout(()=>{
                                  this.navController.navigateForward([`/seleccion-comensal/estadia/${res.id}/creacion`]);
                                }, 2000);
                              }
                              else {
                                this.toastService.toastError("No se ha podido actualizar el estado de la Mesa Nro " + mesa.idMesa + " Error: " + respo4.title, 2500);
                              }
                            });
                          }
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

  async enviarEstadiaEditar(estadia, comensales, mesas) {
    console.log("enviarEstadiaEditar, estadia: ", estadia);
    console.log("comensales", comensales);
    console.log("mesas", mesas);
    this.estadiaServicio.updateEstadia( estadia )
    .then( update => {
      if ( update && update.tipo == 1) {
        let pathComensales= {};
        pathComensales['detalle'] = comensales;
        pathComensales['idEstadia'] = this.idEstadia;
        this.estadiaServicio.setComensalesEstadia( pathComensales )
        .then( resp => {
          if ( resp && resp.tipo == 1 ){
            let pathMesas= {};
            pathMesas['detalle'] = mesas;
            pathMesas['idEstadia'] = this.idEstadia;
            this.estadiaServicio.setMesasEstadia( pathMesas )
            .then( respo => {
              for (let mesa of this.mesasCambioEstado) {
                let pathMesa = {}
                pathMesa['idMesa'] = mesa.idMesa;
                pathMesa['idEstadoMesa'] = mesa.idEstadoMesa;
                this.mesaservicio.cambiarEstado(pathMesa)
                .then(respo2 => {
                  if (respo2.tipo != 2) {
                    this.toastService.toastSuccess(`Estadia N° ${this.idEstadia}, actualizada satisfactoriamente.`, 2500);
                    setTimeout(()=>{
                      this.navController.navigateRoot(['/consulta-gestionar-estadia', this.idEstadia ]);
                    }, 2500);
                  }
                  else {
                    this.toastService.toastError("No se ha podido actualizar el estado de la Mesa Nro " + mesa.idMesa + " Error: " + respo2.title, 2500);
                  }
                });
              }
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
        this.estadiaServicio.updateEstadia( data )
        .then( update => {
          if ( update && update.tipo == 1) {
            let pathComensales= {};
            pathComensales['detalle'] = comensales;
            pathComensales['idEstadia'] = res.id;
            this.estadiaServicio.setComensalesEstadia( pathComensales )
            .then( resp => {
              if ( resp && resp.tipo == 1 ){
                let pathMesas= {};
                pathMesas['detalle'] = mesas;
                pathMesas['idEstadia'] = res.id;
                this.estadiaServicio.setMesasEstadia( pathMesas )
                .then( respo => {
                  let pathClienteComensal = {};
                  pathClienteComensal['idEstadia'] = res.id;
                  pathClienteComensal['detalle'] = this.comensalesClientes;
                  this.estadiaServicio.setClienteEstadia(pathClienteComensal)
                  .then( respo1 => {
                    if ( respo1 && respo1.tipo == 1 ){
                      for (let mesa of this.mesasCambioEstado) {
                        let pathMesa = {}
                        pathMesa['idMesa'] = mesa.idMesa;
                        pathMesa['idEstadoMesa'] = mesa.idEstadoMesa;
                        this.mesaservicio.cambiarEstado(pathMesa)
                        .then(respo4 => {
                          if (respo4.tipo != 2) {
                            this.toastService.toastSuccess(`Estadia Creada Satisfactoriamente. N° ${res.id}`, 2000);
                            setTimeout(()=>{
                              this.navController.navigateForward([`/seleccion-comensal/estadia/${res.id}/creacion`]);
                            }, 2000);
                          }
                          else {
                            this.toastService.toastError("No se ha podido actualizar el estado de la Mesa Nro " + mesa.idMesa + " Error: " + respo4.title, 2500);
                          }
                        });
                      }
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

  tratarFecha(){
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let mm2 = date.getMonth() + 1 + 5;
    let yy = date.getFullYear();
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
    this.fechaHasta = `${año}-${mes2}-${dia}`;
  }

}
