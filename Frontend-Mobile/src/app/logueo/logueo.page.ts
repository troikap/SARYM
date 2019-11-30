import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { StorageService, Log } from '../services/storage/storage.service';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { ToastService } from '../providers/toast.service'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-logueo',
  templateUrl: './logueo.page.html',
  styleUrls: ['./logueo.page.scss'],
})

export class LogueoPage implements OnInit {
  private contadorIntentoContrasenia = environment.contRecPass;

  public form: FormGroup;
  private logueo: Log;
  private invalidotitle = 'Datos Inválidos';
  private invalidomsj = 'Combinación de Usuario y Contraseña incorrectos.';
  private susptitle = 'Usuario Suspendido';
  private suspmsj = 'El Usuario ingresado se encuentra Suspendido o dado de Baja.';
  private valtitle = 'Bienvenido';
  private valmsj = 'Le damos la bienvenida ';
  private error = "Error"
  private errormsj = "Ud. no tiene permisos para acceder al sistema mobile"; 
  private algo = null;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private usuarioservicio: UsuarioService,
    private storage: StorageService,
    public alertController: AlertController,
    private menu: MenuController,
    private navController: NavController, 
    private toastService: ToastService,
    ) { 
      this.menu.enable(false)
      this.loadLog();
      this.form = this.formBuilder.group({
        cuitUsuario: ['', Validators.compose([Validators.required])],
        contrasenaUsuario: ['', Validators.required],
        checkRecordar: false
      });
    }

  ngOnInit() {

  }

  loadLog() {
    this.storage.getLog().then(logs => {
      this.logueo = logs;
      if (logs) {
      this.form.setValue( {
        cuitUsuario: logs[0].cuit, 
        contrasenaUsuario: logs[0].pass,
        checkRecordar: false} )
      }
    })
  }

  loguear() {
    this.usuarioservicio.loguear(this.form.value.cuitUsuario , this.form.value.contrasenaUsuario )
    .then(logueado => {
      console.log("DEVOLVIENDO ESTO ", logueado)
      this.algo = logueado;
      if (logueado && logueado.tipo == 1) {
        let activado = logueado.UsuarioEstado.activadoUsuario;
        if ( activado == true ){ 
          let rol = logueado.rol.idRol;
          if ( rol == "Cliente" || rol == "Mozo" || rol == "Administrador" ) {
            let fecha = new Date();
            this.logueo = {cuit: this.form.value.cuitUsuario, pass: this.form.value.contrasenaUsuario, id: logueado.usuario , date: fecha}
            console.log("TOKEN ",logueado.token)
            this.storage.setOneObject( 'token',logueado.token)
            if (this.form.value.checkRecordar){
              this.actualizarLog(this.logueo);
            }
            if ( rol == "Mozo" ) {
              //servicio que cree instancia de clase intermedia Mozo-Estadia      ----    se cambio por ... solo se crea clase cuando se genera estadia..
              //verificar que cuando se desloguee un mozo, termine esta instancia.  ---- no va mas... no se inunda mas!!!
            }
  
            this.logueo['rolUsuario'] = this.algo.rol.idRol;
            this.logueo['idRolUsuario'] = this.algo.rol.nombreRol;
            this.logueo['nombreUsuario'] = this.algo.UsuarioEstado.nombreUsuario;
            this.logueo['apellidoUsuario'] = this.algo.UsuarioEstado.apellidoUsuario;
            this.storage.setOneObject( 'currentUsuario', this.logueo)
            this.alertar();
            this.menu.enable(true);
            this.navController.navigateRoot('/home')
          } else {
            this.alertRol();
          }
        } else {
          this.toastService.toastWarning('Debería verificar su correo y activar su cuenta.', 3000)
        }

      } else {
        if (logueado && logueado.tipo == 2){
          console.log("INVALIDOS")
          this.toastService.toastWarning('.', 3000)
        } else if (logueado && logueado.tipo == 3) {
          console.log("SUSPENDIDO INHAVILITAD")
          this.toastService.toastWarning('Su cuenta esta suspendida.', 3000)
        } else {
          this.toastService.toastWarning('No se pudo realizar la conexión.', 3000)
        }
        this.alertar();
      }
    })
  }

  actualizarLog(log: Log) {
    log.date = new Date();
    this.storage.actualizarLog(log)
      .then( res => {
        if (!res) {
          console.log("No Actualizo Log")
        } else {
          console.log("Actualizo Log")
        }
      })
  }

  goTo(key: string) {
    let page;
    switch (key) {
      case 'home':
        page = '/home';
        break;
      case 'registro-usuario':
        page = '/registro-usuario/0';
        break;
      case 'home':
        page = '/home';
        break;
    }
    this.navController.navigateForward(page);
  }

  async alertar() {
    if (this.algo && this.algo.tipo == 1) {
      const alert = await this.alertController.create({
        header: this.valtitle,
        message: `${this.valmsj} ${this.algo.UsuarioEstado.nombreUsuario} ${this.algo.UsuarioEstado.apellidoUsuario}`,
        buttons: ['OK'],
        cssClass: 'alert',
      });
      await alert.present();
    } 
    if (this.algo && this.algo.tipo == 2) {
      const alert = await this.alertController.create({
        header: this.invalidotitle,
        message: this.invalidomsj,
        buttons: ['OK'],
        cssClass: 'alert',
      });
      await alert.present();
    } 
    if (this.algo && this.algo.tipo == 3){
      const alert = await this.alertController.create({
        header: this.susptitle,
        message: this.suspmsj,
        buttons: ['OK'],
        cssClass: 'alert',
      });
      await alert.present();
    }
  }

  async alertRol() {
      const alert = await this.alertController.create({
        header: this.error,
        message: this.errormsj,
        buttons: ['OK'],
        cssClass: 'alert',
      });
      await alert.present();
    } 

  iniciarInvitado() {
    let logear = {
      cuit: -1,
      pass: "Invitado",
      id: -1,
      date: new Date(),
      rolUsuario: "Invitado",
      idRolUsuario: -1,
      nombreUsuario: "Invitado",
      apellidoUsuario: "Invitado"
    }
    this.storage.setOneObject('token',"libre")
    this.storage.setOneObject('currentUsuario', logear)
    this.menu.enable(true);
    this.navController.navigateRoot('/home');
    // this.navController.navigateRoot('/home-invitado');
  }

  recuperarContrasenia() {
    console.log("Recuperando")
    if (this.contadorIntentoContrasenia > 0 ) {
      this.confirmarRecuperacion();
    } else {
      this.solicitarAyuda();
    }
  }

  async confirmarRecuperacion() {
    const alert = await this.alertController.create({
      header: 'Recuperación de Contraseña',
      message: 'Esta seguro de que desea recuperar su contraseña?. De ser correcto, digite su N° de cuit y le enviaremos un Email a su correo.',
      inputs: [
        {
          name: 'cuit',
          type: 'number',
          placeholder: 'Ingrese su cuit',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Recuperar',
          handler: ( resp ) => {
            if ( resp.cuit.length == 11 ) {
              this.usuarioservicio.validarExistenciaUsuario(resp.cuit)
              .then( resp => {
                if (resp && resp.tipo == 2 ) {
                  this.usuarioservicio.envioEmail(resp.data, 'recuperar')
                  .then( respuesta => {
                    if (respuesta['tipo'] == 1 ) {
                      this.toastService.toastSuccess('Se ha enviado un Email al correo asociado.', 2500)
                    } else {
                      this.toastService.toastError('Se produjo un error al intentar enviar el Email.', 2000)
                    }
                  })
                } else {
                  this.toastService.toastWarning('No hemos podido encontrar el Usuario.', 1500)
                  this.contadorIntentoContrasenia -= 1;
                }
              })
            } else {
              this.toastService.toastError('Cuit Ingresado es incorrecto.', 1500)
            }
          }
        }
      ],
      cssClass: 'alertPrimary',
    });
    await alert.present();
  } 

  async solicitarAyuda() {
    const alert = await this.alertController.create({
      header: 'Excesos de Ingresos',
      message: 'Usted ha superado el limite de intentos. Por favor, comuniquese a nuestro correo de Email: sarymresto@gmail.com',
      buttons: [
        {
          text: 'Ok',
        }, 
      ],
      cssClass: 'alertError',
    });
    await alert.present();
  } 

  configurar() {
    this.navController.navigateForward('/configuracion');
  }

}
