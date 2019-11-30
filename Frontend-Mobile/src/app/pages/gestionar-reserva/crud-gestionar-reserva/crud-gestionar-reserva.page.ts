import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { ReservaService } from '../../../services/reserva/reserva.service';
import { MesaService } from '../../../services/mesa/mesa.service';
import { StorageService, Log } from '../../../services/storage/storage.service';
import { Mesa } from '../../../services/mesa/mesa.model';
import { ActivatedRoute } from '@angular/router';
import { Reserva, Comensal } from 'src/app/models/modelos';
import { TratarFechaProvider } from '../../../providers/tratarFecha.provider';
import { AlertService } from '../../../providers/alert.service';
import { ToastService } from '../../../providers/toast.service';
import { LoaderService } from '../../../providers/loader.service';


@Component({
  selector: 'app-crud-gestionar-reserva',
  templateUrl: './crud-gestionar-reserva.page.html',
  styleUrls: ['./crud-gestionar-reserva.page.scss'],
})
export class CrudGestionarReservaPage implements OnInit {

  public form: FormGroup;
  public form2: FormGroup;
  public comensal: Comensal;
  public comensales: Comensal[] = [];
  public mensajeExistenciaUsuario: string = null;
  public existenciaUsuario: boolean = false;
  public currentUsuario;
  public mesas: Mesa[];
  public checkBoxList = [];
  public fechaDesde;
  public fechaHasta;
  public accionGet;
  public idReserva = 0;
  public reserva: Reserva;
  public newForm = {};
  public mostrar5 = false;
  public mostrarMensajeConsideracion = 0;
  
  constructor(
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private navController: NavController,
    private usuarioservicio: UsuarioService,
    private storage: StorageService,
    private reservaservicio: ReservaService,
    private mesaservicio: MesaService,
    private activatedRoute: ActivatedRoute,
    private tratarFechaProvider: TratarFechaProvider,
    private alertService: AlertService,
    private toastService: ToastService,
    private loaderService: LoaderService
  ) {
    
    this.loadCurrentUsuario();
    this.form = this.formBuilder.group({
      edadComensal: ['',[ Validators.required, Validators.pattern(/^(([1][2-9])|([2-9][0-9]))$/)]],
      fechaReserva: ['', Validators.required],
      horaEntrada: ['', Validators.required],
      horaSalida: ['', Validators.required],
      cantidadComensal: ['', Validators.required],
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
      this.idReserva = params.id;
      this.cargaInicial();
      this.validarCantidadComensales();

      this.mostrar5 = false;
    });
   }

   // TODO: No poder realizar nunguna acción sobre reservas en estado distinto a GENERADA

  ngOnInit() {
    this.tratarFecha();
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
          let edadUsrLogueado;

          // Comensales
          let comensal;
          console.log("COMENSALES" , res.comensals)
          for (let i = 0; i < res.comensals.length; i++) {
            if (i == 0) {
              edadUsrLogueado = res.comensals[i].edadComensal;
            }
            comensal = {};
            comensal = res.comensals[i];
            if (res.comensals[i].usuario) {
              comensal['cuitUsuario'] = res.comensals[i].usuario.cuitUsuario;
            }
            this.comensales.push(comensal);
          }
          // Fechas
          let horaEntradaReserva = this.reserva.horaEntradaReserva;
          let horaSalidaReserva = this.reserva.horaSalidaReserva;
          let horaEntradaCortada =  String(horaEntradaReserva).slice(0,5);
          let horaSalidaCortada =  String(horaSalidaReserva).slice(0,5);
          this.newForm = {
            edadComensal: edadUsrLogueado,
            fechaReserva: this.reserva.fechaReserva, 
            horaEntrada: String(horaEntradaCortada),
            horaSalida: String(horaSalidaCortada),
            cantidadComensal: this.reserva.cantPersonas,
            idMesa: null     
          }
          this.form.setValue(this.newForm);
        }
        this.setValidatorsHours();
      });
    }
  }

  validarEdadComensal() {
    console.log("validarEdadComensal");
    this.form.get('edadComensal').valueChanges
    .subscribe( edad => {
      console.log("form, edad comensal: ", edad);
      if (edad > 150){
        this.form.controls.edadComensal.setErrors({edad_maxima: true});
      }
      else {
        this.form.get("edadComensal").setValidators([ Validators.required, Validators.pattern(/^[0-9]{1,3}$/)]);
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

   validarCantidadComensales() {
    this.form.get('cantidadComensal').valueChanges
    .subscribe(respuesta => {
      this.form.controls.idMesa.markAsUntouched();
      this.actualizarMesas();
    });
  }

  async actualizarMesas() {
    await this.mesaservicio.getMesas()
    .then(  resp => {
      this.checkBoxList = [];
      this.mesas =  resp['data'];
      for (let mesa of  resp['data']) {
        this.checkBoxList.push({ 
          'value': mesa.idMesa,
          'descripcion': `Mesa: N° ${mesa.nroMesa} - Cap: ${mesa.capacidadMesa}p - Sec: ${mesa.sector.nombreSector}`,
          'isChecked': false,
          'capacidad': mesa.capacidadMesa
        })
      }
      if (this.accionGet == "editar") {
        this.cargarMesasReserva();
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

  loadCurrentUsuario() {
    this.storage.getCurrentUsuario().then((data) => {
      this.currentUsuario = data;
      if ( this.accionGet == 'crear') {
        this.comensales.push({
          aliasComensal: `${this.currentUsuario.nombreUsuario} ${this.currentUsuario.apellidoUsuario}`,
          edadComensal: 20,
          idUsuario: this.currentUsuario.id,
          cuitUsuario: this.currentUsuario.cuit
        })
      }
    })
  }

  cambiarEdadComensal( valor ){
    this.comensales[0].edadComensal = Number(valor.target.value)
  }

  cargaInicial(){
    if (this.accionGet == "crear") {
      console.log("CREANDO")
      this.actualizarMesas();
      this.resetComensal();
      this.setValidatorsHours();
    }
    else if (this.accionGet == "editar") {
      console.log("EDITANDO")
      this.traerReserva();
      this.resetComensal();
    }
  }

  checkEvent( position ){
    this.form.controls.idMesa.markAsTouched();

    let cantidadComensales = this.form.value.cantidadComensal;
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

  validarExistenciaUsuario(){
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
          this.comensales.push(this.comensal);
          this.resetComensal();
          this.toastService.toastSuccess("Comensal Agregado", 2500);
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
      this.comensales.push(this.comensal);
      this.resetComensal();
      this.toastService.toastSuccess("Comensal Agregado", 2500);
    }
  }

  nuevoComensal() {
    this.validarExistenciaUsuario();
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

  eliminarComensal( num: number){
    if (  this.comensales[num].idComensal ) {
      this.comensales[num].baja = true;
    } else {
      this.comensales.splice(num,1);
    }
    this.toastService.toastSuccess("Comensal Eliminado", 2000);
  }

  async crearEditarReserva() {
    let reserva;
    let horaEntrada = this.form.value['horaEntrada'];
    let horaSalida = this.form.value['horaSalida'];
    let fechaReservaTratada = this.tratarFechaProvider.traerDate( this.form.value['fechaReserva'] );
    let horaEntradaTratada = this.tratarFechaProvider.verificarTime( horaEntrada );
    let horaSalidaTratada = this.tratarFechaProvider.verificarTime( horaSalida );
    let cantidadComensales = this.form.value['cantidadComensal']; 
    if (this.accionGet == "crear") {
      reserva = {
        fechaReserva: fechaReservaTratada,
        horaEntradaReserva: horaEntradaTratada,
        horaSalidaReserva: horaSalidaTratada,
        cantPersonas: cantidadComensales
      }
    }
    else  if (this.accionGet == "editar") {
      reserva = {
        idReserva: this.idReserva,
        fechaReserva: fechaReservaTratada,
        horaEntradaReserva: horaEntradaTratada,
        horaSalidaReserva: horaSalidaTratada,
        cantPersonas: cantidadComensales
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
    const comensales = this.comensales;
    reserva['idUsuario'] = this.currentUsuario.id;
    let reservaConCodigo = await this.agregarCodigoReserva( reserva );

    this.validarCreacionReserva(reserva, mesas, comensales, reservaConCodigo);
  }

  agregarCodigoReserva( data ) {
    let codReserva = `${this.currentUsuario.id}-${this.currentUsuario.cuit}-${data.fechaReserva}/${data.horaEntradaReserva}-RESERVA`;
    data['codReserva'] = codReserva;
    return data
  }

  // TOKEN RESERVA
  agregarTokenReserva( data, reserva ) {
    let tokenReserva = `RESERVA-${data.id}-${this.currentUsuario.id}-${reserva.fechaReserva}/${reserva.horaEntradaReserva}`;
    return tokenReserva
  }

  async validarCreacionReserva(reserva, mesas, comensales, reservaConCodigo) {
    await this.reservaservicio.getReservasPorEstado("generada")
    .then((res:any) => {
      if ( res && res.tipo != 2) {
        let reservasTodas = res.data;
        // console.log("reserva: ",reserva);
        // console.log("reservaConCodigo: ",reservaConCodigo);
        // console.log("mesas: ",mesas);
        // console.log("comensales: ",comensales);
        // console.log("reservasTodas: ", reservasTodas);
        
        let fechaReservaActual = reserva.fechaReserva;
        let horaEntradaActual = reserva.horaEntradaReserva + ":00";
        let horaSalidaActual = reserva.horaSalidaReserva + ":00";
        let idUsuariosActual = [];
        let idMesasActual = [];
        for (let comenActual of comensales) {
          let idUsrAct = comenActual.idUsuario;
          if (idUsrAct != null && idUsrAct != "" && idUsrAct != "undefined") {
            idUsuariosActual.push(idUsrAct);
          }
        }
        for (let mesasActual of mesas) {
          let mesaAct = mesasActual.idMesa;
          if (mesaAct != "" && mesaAct != null && mesaAct != "undefined") {
            idMesasActual.push(mesaAct);
          }
        }
        
        let errorRangoUsr = false;
        let errorRangoMesa = false;
        // console.log("----------------------------------------------------");
        // console.log("------------TODAS---------------");

        for (let todas of reservasTodas) {
          let fechaReservaTodas = todas.fechaReserva;
          let horaEntradaTodas = todas.horaEntradaReserva;
          let horaSalidaTodas = todas.horaSalidaReserva;
          let idUsuariosTodas = [];
          let idMesasTodas = [];
          for (let comenTodas of todas.comensals) {
            let idUsrTod = comenTodas.idUsuario;
            if (idUsrTod != null && idUsrTod != "" && idUsrTod != "undefined") {
              idUsuariosTodas.push(idUsrTod);
            }
          }
          for (let mesasTodas of todas.detallereservamesas) {
            let mesaToda = mesasTodas.mesa.idMesa;
            if (mesaToda != "" && mesaToda != null && mesaToda != "undefined") {
              idMesasTodas.push(mesaToda);
            }
          }
                    
          if (fechaReservaTodas == fechaReservaActual) {
            // Validar: No permitir generar reservas para un mismo usuario, misma fecha, dentro de un rango de horario parecido
            for (let usuarioActual of idUsuariosActual) {
              let usrAct = usuarioActual;
              for (let usuarioTodas of idUsuariosTodas) {
                let usrTodas = usuarioTodas;
                if (usrAct == usrTodas) {
                  errorRangoUsr = this.validarRangoHorarioReserva(horaEntradaTodas, horaEntradaActual, horaSalidaTodas, horaSalidaActual);
                  // console.log("Error de Rango horario, fecha y usuario: ¿? ", errorRangoUsr);
                }
              } 
            }
            // Validar: No permitir generar reservas para una misma fecha, misma mesa,rango horario parecido
            for(let mesaTodas of idMesasTodas) {
              let mesaToda = mesaTodas;
              for (let mesaActual of idMesasActual) {
                let mesaAct = mesaActual;
                if (mesaToda == mesaAct) {
                  errorRangoMesa = this.validarRangoHorarioReserva(horaEntradaTodas, horaEntradaActual, horaSalidaTodas, horaSalidaActual);
                  // console.log("Error de Rango horario, fecha y Mesa: ¿? ", errorRangoMesa);
                }
              }
            }
          }
          // console.log("fechaReservaTodas", fechaReservaTodas);
          // console.log("horaEntradaTodas", horaEntradaTodas);
          // console.log("horaSalidaTodas", horaSalidaTodas);
          // console.log("idUsuariosTodas", idUsuariosTodas);
          // console.log("idMesasTodas", idMesasTodas);
          
          // console.log("-------------------------------");

        }
        // console.log("----------------------------------------------------");
        // console.log("------------ACTUAL-------------");

        // console.log("fechaTofechaReservaActualdas", fechaReservaActual);
        // console.log("horaEntradaActual", horaEntradaActual);
        // console.log("horaSalidaActual", horaSalidaActual);
        // console.log("idUsuariosActual", idUsuariosActual);
        // console.log("idMesasActual", idMesasActual);
        
        if (!errorRangoUsr && !errorRangoMesa) {
          if (this.accionGet == "crear") {
            this.enviarReservaCrear( reservaConCodigo , comensales, mesas); 
          }
          else if (this.accionGet == "editar") {
            this.enviarReservaEditar( reserva , comensales, mesas); 
          }
        }
        else {
          if (errorRangoUsr) {
            let msg = "Ya existe una reserva a su nombre o a nombre de otro cliente, que comparte misma fecha y rango horario.";
            this.toastService.toastError(msg, 5000);
          }
          else if (errorRangoMesa) {
            let msg = "Ya existe una reserva para al menos una mesa seleccionada, que comparte misma fecha y rango horario.";
            this.toastService.toastError(msg, 5000);
          }
        }
      }
      else { // Si da error tipo 2, es porque no encuentra reservas generadas
        if (this.accionGet == "crear") {
          this.enviarReservaCrear( reservaConCodigo , comensales, mesas); 
        }
        else if (this.accionGet == "editar") {
          this.enviarReservaEditar( reserva , comensales, mesas); 
        }
      }
    });
  }

  validarRangoHorarioReserva(horaEntradaTodas, horaEntradaActual, horaSalidaTodas, horaSalidaActual) {
    let errorRango = false;
    if (horaEntradaTodas <= horaEntradaActual && horaEntradaActual < horaSalidaTodas) {
      // console.log("1");
      // console.log(horaEntradaTodas, "<=", horaEntradaActual, "&&", horaEntradaActual, "<", horaSalidaTodas);
      errorRango = true;
    }
    if (horaEntradaTodas < horaSalidaActual && horaSalidaActual <= horaSalidaTodas) {
      // console.log("2");
      // console.log(horaEntradaTodas, "<", horaSalidaActual, "&&", horaSalidaActual, "<=", horaSalidaTodas);
      errorRango = true;
    }
    if (horaEntradaActual <= horaEntradaTodas && horaSalidaTodas <= horaSalidaActual) {
      // console.log("3");
      // console.log(horaEntradaActual, "<=", horaEntradaTodas, "&&", horaSalidaTodas, "<=", horaSalidaActual);
      errorRango = true;
    }
    return errorRango;
  }

  async enviarReservaCrear(reserva, comensales, mesas) {
    await this.reservaservicio.setReserva( reserva )
    .then( async res => {
      if( res && res.tipo == 1) {
        let tokenReserva = await this.agregarTokenReserva(res, reserva)
        let data = { 'idReserva': res.id ,tokenReserva}
        this.reservaservicio.updateReserva( data )
        .then( update => {
          if ( update && update.tipo == 1) {
            let pathComensales= {};
            pathComensales['detalle'] = comensales;
            pathComensales['idReserva'] = res.id;
            this.reservaservicio.setComensalesReserva( pathComensales )
            .then( resp => {
              console.log("COMENSALES ",resp)
              if ( resp && resp.tipo == 1 ){
                let pathMesas= {};
                pathMesas['detalle'] = mesas;
                pathMesas['idReserva'] = res.id;
                this.reservaservicio.setMesasReserva( pathMesas )
                .then( respo => {
                  this.toastService.toastSuccess(`Reserva Creada Satisfactoriamente. N° ${res.id}`, 2500);
                  setTimeout(()=>{
                    this.navController.navigateForward([`/seleccion-comensal/reserva/${res.id}/creacion`]);
                    }, 2500);
                })
              } else {
                this.toastService.toastError("No se han podido crear los comensales:" + resp.title, 2500);
              }
            })
          } else {
            this.toastService.toastError("No se han podido crear los datos de la reserva:" + update.title, 2500);
          }
        })
      } else {
        this.toastService.toastError("Error:" + res.title, 2500);
      }
    })
  }

  async enviarReservaEditar(reserva, comensales, mesas) {
    console.log("enviarReservaEditar, reserva: ", reserva);
    console.log("comensales", comensales);
    console.log("mesas", mesas);
    this.reservaservicio.updateReserva( reserva )
    .then( update => {
      if ( update && update.tipo == 1) {
        let pathComensales= {};
        pathComensales['detalle'] = comensales;
        pathComensales['idReserva'] = this.idReserva;
        this.reservaservicio.setComensalesReserva( pathComensales )
        .then( resp => {
          if ( resp && resp.tipo == 1 ){
            let pathMesas= {};
            pathMesas['detalle'] = mesas;
            pathMesas['idReserva'] = this.idReserva;
            this.reservaservicio.setMesasReserva( pathMesas )
            .then( respo => {
                this.toastService.toastSuccess(`Reserva N° ${this.idReserva}, actualizada satisfactoriamente.`, 2500);
                setTimeout(()=>{
                  this.navController.navigateRoot(['/consulta-gestionar-reserva', this.idReserva ]);
                }, 2500);
            })
          } else {
            this.toastService.toastError("No se han podido actualizar los comensales:" + resp.title, 2500);
          }
        })
      } else {
        this.toastService.toastError("Error:" + update.title, 2500);
      }
    })
  }

  setValidatorsHours() {
    this.form.get('horaEntrada').valueChanges
      .subscribe( respuesta => {
        const horaSalida = this.form.get('horaSalida').value || 0;
        const nuevaHoraEntrada = respuesta;
        if (this.accionGet == "crear") {
          let horaSalidaTratado = this.tratarFechaProvider.traerTime(horaSalida);
          let horaEntradaTratado = this.tratarFechaProvider.traerTime(nuevaHoraEntrada);

          if (  horaSalidaTratado < ( this.addTimes(horaEntradaTratado , '00:30') )) {
            this.form.controls.horaEntrada.setErrors({pattern: true});
          } else {
            if (horaEntradaTratado < "10:00") {
              this.form.controls.horaEntrada.setErrors({horaentrada_minima: true});
            }
            else {
              this.form.controls.horaEntrada.setErrors(null);
              this.form.controls.horaSalida.setErrors(null);
            }
          }
          if (horaEntradaTratado < "10:00") {
            this.form.controls.horaEntrada.setErrors({horaentrada_minima: true});
          }
          else {
            if (  horaSalidaTratado < ( this.addTimes(horaEntradaTratado , '00:30') )) {
              this.form.controls.horaEntrada.setErrors({pattern: true});
            }
            else {
              this.form.controls.horaEntrada.setErrors(null);
              this.form.controls.horaSalida.setErrors(null);
            }
          }
        }
        else {
          if (  horaSalida < ( this.addTimes(nuevaHoraEntrada , '00:30') )) {
            this.form.controls.horaEntrada.setErrors({pattern: true});
          } else {
            if (nuevaHoraEntrada < "10:00") {
              this.form.controls.horaEntrada.setErrors({horaentrada_minima: true});
            }
            else {
              this.form.controls.horaEntrada.setErrors(null);
              this.form.controls.horaSalida.setErrors(null);
            }
          }
          if (nuevaHoraEntrada < "10:00") {
            this.form.controls.horaEntrada.setErrors({horaentrada_minima: true});
          }
          else {
            if (  horaSalida < ( this.addTimes(nuevaHoraEntrada , '00:30') )) {
              this.form.controls.horaEntrada.setErrors({pattern: true});
            }
            else {
              this.form.controls.horaEntrada.setErrors(null);
              this.form.controls.horaSalida.setErrors(null);
            }
          }
        }
    });

    this.form.get('horaSalida').valueChanges
    .subscribe( respuesta => {
      const horaEntrada = this.form.get('horaEntrada').value || 0;
      const nuevaHoraSalida = respuesta;
      if (this.accionGet == "crear") {
        let horaSalidaTratado = this.tratarFechaProvider.traerTime(nuevaHoraSalida)
        let horaEntradaTratado = this.tratarFechaProvider.traerTime(horaEntrada)

        if ( this.addTimes(horaEntradaTratado , '00:30') > horaSalidaTratado ) {
          this.form.controls.horaSalida.setErrors({pattern: true});
        } else {
          if (horaSalidaTratado > "23:59") {
            this.form.controls.horaSalida.setErrors({horasalida_maxima: true});
          }
          else {
            this.form.controls.horaSalida.setErrors(null);
            this.form.controls.horaEntrada.setErrors(null);
          }
        }
        if (horaSalidaTratado > "23:59") {
          this.form.controls.horaSalida.setErrors({horasalida_maxima: true});
        }
        else {
          if ( this.addTimes(horaEntradaTratado , '00:30') > horaSalidaTratado ) {
            this.form.controls.horaSalida.setErrors({pattern: true});
          } else {
            this.form.controls.horaSalida.setErrors(null);
            this.form.controls.horaEntrada.setErrors(null);
          }
        }
      }
      else {
        if ( this.addTimes(horaEntrada , '00:30') > nuevaHoraSalida ) {
          this.form.controls.horaSalida.setErrors({pattern: true});
        } else {
          if (nuevaHoraSalida > "23:59") {
            this.form.controls.horaSalida.setErrors({horasalida_maxima: true});
          }
          else {
            this.form.controls.horaSalida.setErrors(null);
            this.form.controls.horaEntrada.setErrors(null);
          }
        }
        if (nuevaHoraSalida > "23:59") {
          this.form.controls.horaSalida.setErrors({horasalida_maxima: true});
        }
        else {
          if ( this.addTimes(horaEntrada , '00:30') > nuevaHoraSalida ) {
            this.form.controls.horaSalida.setErrors({pattern: true});
          } else {
            this.form.controls.horaSalida.setErrors(null);
            this.form.controls.horaEntrada.setErrors(null);
          }
        }
      }
    });
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