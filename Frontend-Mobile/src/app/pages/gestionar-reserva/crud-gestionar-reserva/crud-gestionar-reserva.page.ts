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

@Component({
  selector: 'app-crud-gestionar-reserva',
  templateUrl: './crud-gestionar-reserva.page.html',
  styleUrls: ['./crud-gestionar-reserva.page.scss'],
})
export class CrudGestionarReservaPage implements OnInit {

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
  private idReserva = 0;
  private reserva: Reserva;
  private newForm = {};

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
  ) {
    
    this.loadCurrentUsuario();
    this.form = this.formBuilder.group({
      edadComensal: ['', Validators.required],
      fechaReserva: ['', Validators.required],
      horaEntrada: ['', Validators.required],
      horaSalida: ['', Validators.required],
      cantidadComensal: ['', Validators.required],
      idMesa: [null, Validators.required],
    });

    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);
      this.accionGet  = params.accion;
      this.idReserva = params.id;
      this.traerMesas();
    });
   }

  ngOnInit() {
    this.tratarFecha();
    this.setValidatorsHours();
  }

prueba() {
  let  fechaReserva =  this.form.value['fechaReserva'];
  console.log(this.form);
  console.log("FECHAS RESERVA ", fechaReserva )
  let fechaReservaTratada = this.tratarFechaProvider.traerDate( this.form.value['fechaReserva'] );
  let horaEntradaTratada = this.tratarFechaProvider.traerTime( this.form.value['horaEntrada'] );
  let horaSalidaTratada = this.tratarFechaProvider.traerTime( this.form.value['horaSalida'] );

  console.log("----------------------"+fechaReservaTratada+ horaEntradaTratada+horaSalidaTratada)
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
          this.newForm = {
            edadComensal: edadUsrLogueado,
            fechaReserva: this.reserva.fechaReserva, // this.getFechaFormateada(this.reserva.fechaReserva),
            horaEntrada: this.reserva.horaEntradaReserva,
            horaSalida: this.reserva.horaSalidaReserva,
            cantidadComensal: this.reserva.cantPersonas,
            idMesa: null     
          }
          this.form.setValue(this.newForm)
          // Mesas
          let cuenta = 0;
          let valid = false;
          for (let item of res.detallereservamesas) {
            for (let element of this.checkBoxList ) {
              if ( item.idMesa == element.value ) {
                this.checkBoxList[cuenta].isChecked = true;
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

  loadCurrentUsuario() {
    this.storage.getCurrentUsuario().then((data) => {
      this.currentUsuario = data;
      console.log("USUARIO ", this.currentUsuario)
      // let comensa = ;
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
    console.log("EDAD ",valor.target.value)
    this.comensales[0].edadComensal = Number(valor.target.value)
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

      console.log("traerMesas: ", this.checkBoxList);

      if (this.accionGet == "crear") {
        console.log("CREANDO")
        this.resetComensal();
      }
      else if (this.accionGet == "editar") {
        console.log("EDITANDO")
        this.traerReserva();
        this.resetComensal();
      }
    })
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

  validarExistenciaUsuario(){
    console.log("Validar Existencia")
    const cuit = this.form2.value.cuitUsuario;
    console.log(cuit)
    if (cuit != null) {
      this.usuarioservicio.validarExistenciaUsuario( cuit )
      .then( (res) => {
        console.log("RESPUESTA ", res)
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
          this.toastComensalAgregado()
        } else {
          this.existenciaUsuario = false;
          this.mensajeExistenciaUsuario = res.descripcion;
          this.form2.controls.cuitUsuario.setErrors({pattern: true});
          this.form2.markAsTouched();
          this.toastNoExisteUsuario(); 
        }
      });
    } else {
      this.comensal = {
        aliasComensal: this.form2.value.aliasComensal,
        edadComensal: this.form2.value.edadComensal
      }
      this.comensales.push(this.comensal);
      this.resetComensal();
      this.toastComensalAgregado();
    }
  }

  nuevoComensal() {
    this.validarExistenciaUsuario();
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

  eliminarComensal( num: number){
    this.comensales.splice(num,1);
    this.toastEliminarComensal();
  }

  async crearEditarReserva() {
    let reserva;
    let fechaReservaTratada = this.tratarFechaProvider.traerDate( this.form.value['fechaReserva'] );
    let horaEntradaTratada = this.tratarFechaProvider.traerTime( this.form.value['horaEntrada'] );
    let horaSalidaTratada = this.tratarFechaProvider.traerTime( this.form.value['horaSalida'] );
    if (this.accionGet == "crear") {
      reserva = {
        fechaReserva: fechaReservaTratada,
        horaEntradaReserva: horaEntradaTratada,
        horaSalidaReserva: horaSalidaTratada,
        cantPersonas: this.form.value['cantidadComensal']
      }
    }
    else  if (this.accionGet == "editar") {
      reserva = {
        idReserva: this.idReserva,
        fechaReserva: fechaReservaTratada,
        horaEntradaReserva: horaEntradaTratada,
        horaSalidaReserva: horaSalidaTratada,
        cantPersonas: this.form.value['cantidadComensal']
      }
    }
    const mesas = []
    for (let item of this.checkBoxList) {
      if (item.isChecked) {
        mesas.push({'idMesa': item.value})
      }
    }
    console.log("crearEditarReserva - MESAS", this.checkBoxList);
    const comensales = this.comensales;
    reserva['idUsuario'] = this.currentUsuario.id;
    let reservaConCodigo = await this.agregarCodigoReserva( reserva );

    // if (this.accionGet == "crear") {
    //   this.enviarReservaCrear( reservaConCodigo , comensales, mesas); 
    // }
    // else if (this.accionGet == "editar") {
    //   this.enviarReservaEditar( reserva , comensales, mesas); 
    // }
  }

  agregarCodigoReserva( data ) {
    let codReserva = `${this.currentUsuario.id}-${this.currentUsuario.cuit}-${data.fechaReserva}/${data.horaEntradaReserva}`;
    data['codReserva'] = codReserva;
    return data
  }

  agregarTokenReserva( data, reserva ) {
    console.log("DATA ",reserva)
    let tokenReserva = `${data.id}-${this.currentUsuario.id}-${reserva.fechaReserva}/${reserva.horaEntradaReserva}`;
    return tokenReserva
  }

  async enviarReservaCrear(reserva, comensales, mesas) {

    console.log("Datos Reserva a Enviar en enviarReservaCrear", reserva);

    await this.reservaservicio.setReserva( reserva )
    .then( async res => {
      if( res.tipo == 1) {
        let tokenReserva = await this.agregarTokenReserva(res, reserva)
        let data = { 'idReserva': res.id ,tokenReserva}
        this.reservaservicio.updateReserva( data )
        .then( update => {
          if (update.tipo == 1) {
            let pathComensales= {};
            pathComensales['detalle'] = comensales;
            pathComensales['idReserva'] = res.id;
            this.reservaservicio.setComensalesReserva( pathComensales )
            .then( resp => {
              if (resp.tipo == 1 ){
                let pathMesas= {};
                pathMesas['detalle'] = mesas;
                pathMesas['idReserva'] = res.id;
                this.reservaservicio.setMesasReserva( pathMesas )
                .then( respo => {
                  if (respo.tipo == 1 ){
                    this.toastReservaCreada(res);
                    let id = res.id;
                    this.navController.navigateRoot(['/consulta-gestionar-reserva', id ]);
                  } else {
                    console.log("RESPUESTA DE MESAS FALLIDA")
                  }
                })
              } else {
                console.log("RESPUESTA DE COMENSALES FALLIDA")
              }
            })
          } else {
          console.log("RESPUESTA DE UPDATE FALLIDA")
          }
        })
      } else {
        console.log("RESPUESTA DE RESERVA",res.title)
      }
    })
  }

  async enviarReservaEditar(reserva, comensales, mesas) {
    
    console.log("enviarReservaEditar, reserva: ", reserva);
    console.log("comensales", comensales);
    console.log("mesas", mesas);

    this.reservaservicio.updateReserva( reserva )
    .then( update => {
      if (update.tipo == 1) {
        let pathComensales= {};
        pathComensales['detalle'] = comensales;
        pathComensales['idReserva'] = this.idReserva;
        this.reservaservicio.setComensalesReserva( pathComensales )
        .then( resp => {
          if (resp.tipo == 1 ){
            let pathMesas= {};
            pathMesas['detalle'] = mesas;
            pathMesas['idReserva'] = this.idReserva;
            this.reservaservicio.setMesasReserva( pathMesas )
            .then( respo => {
              if (respo.tipo == 1 ){
                this.toastReservaActualizada();
                // this.navController.navigateRoot(['/consulta-gestionar-reserva', this.idReserva ]);
              } else {
                console.log("RESPUESTA DE MESAS FALLIDA")
              }
            })
          } else {
            console.log("RESPUESTA DE COMENSALES FALLIDA")
          }
        })
      } else {
      console.log("RESPUESTA DE UPDATE FALLIDA")
      }
    })
      
  }

  async toastReservaCreada( reserva ) {
      const toast = await this.toastController.create({
        message: `Reserva Creada Satisfactoriamente. N° ${reserva.data.idReserva}`,
        duration: 3000,
        color: 'success',
        position: 'middle',
        translucent: true
      });
      toast.present();
  }

  async toastReservaActualizada() {
    const toast = await this.toastController.create({
      message: `Reserva N° ${this.idReserva}, actualizada satisfactoriamente.`,
      duration: 3000,
      color: 'success',
      position: 'middle',
      translucent: true
    });
    toast.present();
}

  setValidatorsHours() {
    this.form.get('horaEntrada').valueChanges
      .subscribe( respuesta => {
        const horaSalida = this.form.get('horaSalida').value || 0;
        const nuevaHoraEntrada = respuesta;
        let horaSalidaTratado = this.tratarFechaProvider.traerTime(horaSalida)
        let horaEntradaTratado = this.tratarFechaProvider.traerTime(nuevaHoraEntrada)
        if (  horaSalidaTratado < ( this.addTimes(horaEntradaTratado , '00:30') )) {
          this.form.controls.horaEntrada.setErrors({pattern: true});
        } else {
          this.form.controls.horaEntrada.setErrors(null);
          this.form.controls.horaSalida.setErrors(null);
        }
    });

    this.form.get('horaSalida').valueChanges
    .subscribe( respuesta => {
      const horaEntrada = this.form.get('horaEntrada').value || 0;
      const nuevaHoraSalida = respuesta;
      let horaSalidaTratado = this.tratarFechaProvider.traerTime(nuevaHoraSalida)
      let horaEntradaTratado = this.tratarFechaProvider.traerTime(horaEntrada)
      if ( this.addTimes(horaEntradaTratado , '00:30') > horaSalidaTratado ) {
        this.form.controls.horaSalida.setErrors({pattern: true});
      } else {
        this.form.controls.horaSalida.setErrors(null);
        this.form.controls.horaEntrada.setErrors(null);
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

  // getFechaFormateada(pFecha){
  //   let date = pFecha;
  //   let dd = date.getDate();
  //   let mm = date.getMonth() + 1;
  //   let yy = date.getFullYear();
  //   let dia;
  //   let mes;
  //   if ((dd >= 0) && (dd < 10)) {  
  //     dia = "0" + String(dd);
  //   } else {
  //     dia = dd;
  //   }
  //   if ((mm >= 0) && (mm < 10)) {  
  //     mes = "0" + String(mm);
  //   } else {
  //     mes = mm;
  //   }
  //   let fechaFormateada = `${yy}-${mes}-${dia}`;
  //   console.log("fechaFormateada: ", fechaFormateada);
  //   return fechaFormateada;
  // }

  async toastNoExisteUsuario() {
    const toast = await this.toastController.create({
      message: 'Cuit de Usuario ingresado es incorrecto',
      duration: 3000,
      color: 'warning',
      position: 'middle',
      translucent: true
    });
    toast.present();
  }
  async toastComensalAgregado() {
    const toast = await this.toastController.create({
      message: 'Comensal Agregado',
      duration: 2000,
      color: 'success',
      position: 'middle',
      translucent: true
    });
    toast.present();
  }
  async toastEliminarComensal() {
    const toast = await this.toastController.create({
      message: 'Comensal Eliminado',
      duration: 2000,
      color: 'success',
      position: 'middle',
      translucent: true
    });
    toast.present();
  }
}