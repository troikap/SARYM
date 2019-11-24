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
import { TratarFechaProvider } from '../../../providers/tratarFecha.provider';
import { AlertService } from '../../../providers/alert.service';
import { ToastService } from '../../../providers/toast.service';
import { LoaderService } from '../../../providers/loader.service';
import { Comensal, Reserva, Estadia } from '../../../models/modelos';
import { EstadiaService } from 'src/app/services/estadia/estadia.service';

@Component({
  selector: 'app-crud-generar-estadia',
  templateUrl: './crud-generar-estadia.page.html',
  styleUrls: ['./crud-generar-estadia.page.scss'],
})
export class CrudGenerarEstadiaPage implements OnInit {
  
  private form: FormGroup;
  private form2: FormGroup;
  private comensal: Comensal;
  private comensales: Comensal[] = [];
  private mensajeExistenciaUsuario: string = null;
  private existenciaUsuario: boolean = false;
  private currentUsuario;
  private mesas: Mesa[];
  checkBoxList = [];
  private fechaDesde;
  private fechaHasta;
  public accionGet;
  public idReserva = 0;
  public idEstadia = 0;
  public tipo;
  public reserva: Reserva;
  public estadia: Estadia;
  private newForm = {};
  private origenDatos;

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
    private toastService: ToastService,
    private loaderService: LoaderService
  ) { 
    
    this.form = this.formBuilder.group({
      cantPersonas: ['', Validators.required],
      idMesa: [null, Validators.required],
    });

    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);
      this.accionGet  = params.accion;
      this.origenDatos = params.tipo;
      if (this.origenDatos == "confReserva") { //Confirmar Reserva
        this.idReserva = params.id;
      }
      else if (this.origenDatos == "estadia") {
        this.idEstadia = params.id;
      }
      
      this.loadCurrentUsuario();
      this.traerMesas();
    });
  }

  ngOnInit() {
    this.tratarFecha();
  }
  
  loadCurrentUsuario() {
    this.storage.getCurrentUsuario().then((data) => {
      this.currentUsuario = data;
      // if (this.origenDatos == "confReserva" || (this.origenDatos == "estadia" && this.accionGet == "crear")) {
      //   this.comensales.push({
      //     aliasComensal: `${this.currentUsuario.nombreUsuario} ${this.currentUsuario.apellidoUsuario}`,
      //     edadComensal: 20,
      //     idUsuario: this.currentUsuario.id,
      //     cuitUsuario: this.currentUsuario.cuit
      //   })
      // }
    })
  }

  traerMesas(){
    this.mesaservicio.getMesas()
    .then(  resp => {
      this.mesas =  resp['data'];
      for (let mesa of  resp['data']) {
        this.checkBoxList.push({ 
          'value': mesa.idMesa,
          'descripcion': `Mesa: N° ${mesa.nroMesa} - Cap: ${mesa.capacidadMesa}p - Sec: ${mesa.sector.nombreSector}`,
          'isChecked': false
        })
      }
      if (this.accionGet == "crear") {
        console.log("CREANDO");
        this.resetComensal();
      }
      else if (this.accionGet == "editar") {
        console.log("EDITANDO");
        if (this.origenDatos == "confReserva") {
          this.traerReserva();
        }
        else {
          this.traerEstadia();
          this.resetComensal();
        }
      }
    })
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
          let comensal;
          console.log("COMENSALES" , res.comensals)
          for (let i = 0; i < res.comensals.length; i++) {
            comensal = {};
            comensal = res.comensals[i];
            if (res.comensals[i].usuario) {
              comensal['cuitUsuario'] = res.comensals[i].usuario.cuitUsuario;
            }
            this.comensales.push(comensal);
          }
          // Fechas
          // this.horaEntradaReserva = this.reserva.horaEntradaReserva;
          // this.horaSalidaReserva = this.reserva.horaSalidaReserva;
          // this.horaEntradaCortada =  String(this.horaEntradaReserva).slice(0,5);
          // this.horaSalidaCortada =  String(this.horaSalidaReserva).slice(0,5);

          // this.fechaReserva = this.reserva.fechaReserva;
          // this.cantPersonasReserva = this.reserva.cantPersonas;
          
          this.newForm = {
            // fechaReserva: this.reserva.fechaReserva, 
            // horaEntrada: String(this.horaEntradaCortada),
            // horaSalida: String(this.horaSalidaCortada),
            cantPersonas: this.reserva.cantPersonas,
            idMesa: null     
          }
          this.form.setValue(this.newForm)
          // Mesas
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
        if ( res['tipo'] == 2) {
          console.log("No se pudo obtener Estadia con id Nro ", this.idEstadia);
        } else {
          // Estadia
          this.estadia = res;
          console.log("TrearEstadia: ", this.estadia);

          // Comensales
          let comensal;
          console.log("COMENSALES" , res.comensals)
          for (let i = 0; i < res.comensals.length; i++) {
            comensal = {};
            comensal = res.comensals[i];
            if (res.comensals[i].usuario) {
              comensal['cuitUsuario'] = res.comensals[i].usuario.cuitUsuario;
            }
            this.comensales.push(comensal);
          }
          this.newForm = {
            cantPersonas: this.estadia.cantPersonas,
            idMesa: null     
          }
          this.form.setValue(this.newForm)
          // Mesas
          let cuenta = 0;
          let valid = false;
          for (let element of this.checkBoxList ) {
            for (let item of res.detalleestadiamesas) {
              // console.log("DETALLE ECUENTA ", cuenta)

              // console.log("DETALLE ESTADIA MESA ", item)
              if ( item.idMesa == element.value ) {
              // console.log("ENTRO ---------------------------- ")
                
                this.checkBoxList[cuenta].isChecked = true;
                this.checkBoxList[cuenta].idDetalleEstadiaMesa = item.idDetalleEstadiaMesa;
                valid = true;
              }
            }
            cuenta += 1;
          }
          console.log("this checkbox ", this.checkBoxList)
          if (valid) {
            this.form.controls.idMesa.setValue(true)
          } else {
            this.form.controls.idMesa.setValue(null)
          }
        }
      });
    }
  }

  checkEvent( position ){
    this.checkBoxList[position].isChecked = ! this.checkBoxList[position].isChecked ;
    let valid = false;
    for (let item of this.checkBoxList) {
      if (item.isChecked) {
        valid = true;
      }
    }
    if (valid) {
      this.form.controls.idMesa.setValue(true)
    } else {
      this.form.controls.idMesa.setValue(null)
    }
  }

  validarCantidadComensales() {
    this.form.get('cantPersonas').valueChanges
    .subscribe( respuesta => {
    });
  }

  validarEdadComensal() {
    this.form.get('edadComensal').valueChanges
    .subscribe( edad => {
      if (edad > 150){
        this.form.controls.edadComensal.setErrors({
          edad_maxima: true
        });
      }
      else {
        this.form.get("edadComensal").setValidators([ Validators.required, 
          Validators.pattern(/^([0-9]{3})+$/)]);
        this.form.get("edadComensal").updateValueAndValidity();
      }
    });
  }

  resetComensal() {
    this.form2 = this.formBuilder.group({
      aliasComensal: ['', Validators.required],
      edadComensal: [null, Validators.required],
      cuitUsuario: [null]
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

  validarExistenciaUsuario(){
    console.log("Validar Existencia")
    const cuit = this.form2.value.cuitUsuario;
    console.log(cuit)
    if (cuit != null) {
      this.usuarioservicio.validarExistenciaUsuario( cuit )
      .then( (res) => {
        if (res.tipo == 2) {
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

  eliminarComensal( num: number){
    if (  this.comensales[num].idComensal ) {
      this.comensales[num].baja = true;
    } else {
      this.comensales.splice(num,1);
    }
    this.toastService.toastSuccess("Comensal Eliminado", 2000);
  }

  async crearEditarEstadia() {
    let estadia;
    let cantPersonas = this.form.value['cantPersonas']; 
    if (this.origenDatos == "estadia" && this.accionGet == "crear") {
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
    const comensales = this.comensales;
    estadia['idUsuario'] = this.currentUsuario.id;
    let estadiaConCodigo = await this.agregarCodigoEstadia( estadia );
    if (this.origenDatos == "estadia" && this.accionGet == "crear") {
      this.enviarEstadiaCrear( estadiaConCodigo , comensales, mesas); 
    }
    else if (this.origenDatos == "estadia" && this.accionGet == "editar") {
      this.enviarEstadiaEditar( estadia , comensales, mesas); 
    }
    else if (this.origenDatos == "confReserva") {
      this.confirmarReserva( estadiaConCodigo , comensales, mesas);
    }
  }

  agregarCodigoEstadia( data ) {
    let codEstadia = `${this.currentUsuario.id}-${this.currentUsuario.cuit}-ESTADIA`;
    data['codEstadia'] = codEstadia;
    return data
  }

  // TOKEN Estadia
  agregarTokenEstadia( data, estadia ) {
    let tokenEstadia = `ESTADIA-${data.id}-${this.currentUsuario.id}`;
    return tokenEstadia
  }

  async enviarEstadiaCrear(estadia, comensales, mesas) {
    await this.estadiaServicio.setEstadia( estadia )
    .then( async res => {
      if( res.tipo == 1) {
        let tokenEstadia = await this.agregarTokenEstadia(res, estadia)
        let data = { 'idEstadia': res.id ,tokenEstadia}
        this.estadiaServicio.updateEstadia( data )
        .then( update => {
          if (update.tipo == 1) {
            let pathComensales= {};
            pathComensales['detalle'] = comensales;
            pathComensales['idEstadia'] = res.id;
            this.estadiaServicio.setComensalesEstadia( pathComensales )
            .then( resp => {
              if (resp.tipo == 1 ){
                let pathMesas= {};
                pathMesas['detalle'] = mesas;
                pathMesas['idEstadia'] = res.id;
                this.estadiaServicio.setMesasEstadia( pathMesas )
                .then( respo => {
                  this.toastService.toastSuccess(`Estadia Creada Satisfactoriamente. N° ${res.id}`, 2000);
                  setTimeout(()=>{
                    this.navController.navigateForward([`/seleccion-comensal/estadia/${res.id}`]);
                    }, 2000);
                })
              } else {
                this.toastService.toastError("No se han podido crear los comensales:" + resp.title, 2500);
              }
            })
          } else {
            this.toastService.toastError("No se han podido crear los datos de la estadia:" + update.title, 2500);
          }
        })
      } else {
        this.toastService.toastError("Error:" + res.title, 2500);
      }
    })
  }

  async enviarEstadiaEditar(estadia, comensales, mesas) {
    console.log("enviarEstadiaEditar, estadia: ", estadia);
    console.log("comensales", comensales);
    console.log("mesas", mesas);
    this.estadiaServicio.updateEstadia( estadia )
    .then( update => {
      if (update.tipo == 1) {
        let pathComensales= {};
        pathComensales['detalle'] = comensales;
        pathComensales['idEstadia'] = this.idEstadia;
        this.estadiaServicio.setComensalesEstadia( pathComensales )
        .then( resp => {
          if (resp.tipo == 1 ){
            let pathMesas= {};
            pathMesas['detalle'] = mesas;
            pathMesas['idEstadia'] = this.idEstadia;
            this.estadiaServicio.setMesasEstadia( pathMesas )
            .then( respo => {
                this.toastService.toastSuccess(`Estadia N° ${this.idEstadia}, actualizada satisfactoriamente.`, 2500);
                setTimeout(()=>{
                  this.navController.navigateRoot(['/consulta-gestionar-estadia', this.idEstadia ]);
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

  async confirmarReserva(estadia, comensales, mesas) {
    await this.estadiaServicio.setEstadia( estadia )
    .then( async res => {
      if( res.tipo == 1) {
        let tokenEstadia = await this.agregarTokenEstadia(res, estadia)
        let data = { 'idEstadia': res.id ,tokenEstadia}
        this.estadiaServicio.updateEstadia( data )
        .then( update => {
          if (update.tipo == 1) {
            let pathComensales= {};
            pathComensales['detalle'] = comensales;
            pathComensales['idEstadia'] = res.id;
            this.estadiaServicio.setComensalesEstadia( pathComensales )
            .then( resp => {
              if (resp.tipo == 1 ){
                let pathMesas= {};
                pathMesas['detalle'] = mesas;
                pathMesas['idEstadia'] = res.id;
                this.estadiaServicio.setMesasEstadia( pathMesas )
                .then( respo => {
                  this.toastService.toastSuccess(`Estadia Creada Satisfactoriamente. N° ${res.id}`, 2000);
                  setTimeout(()=>{
                    this.navController.navigateForward([`/seleccion-comensal/estadia/${res.id}`]);
                    }, 2000);
                })
              } else {
                this.toastService.toastError("No se han podido crear los comensales:" + resp.title, 2500);
              }
            })
          } else {
            this.toastService.toastError("No se han podido crear los datos de la estadia:" + update.title, 2500);
          }
        })
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
