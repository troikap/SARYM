import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { StorageService, Log } from '../services/storage/storage.service';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-logueo',
  templateUrl: './logueo.page.html',
  styleUrls: ['./logueo.page.scss'],
})
export class LogueoPage implements OnInit {

  private form: FormGroup;
  private logueo: Log;
  private invalidotitle = 'Datos Inválidos';
  private invalidomsj = 'Combinación de Usuario y Contraseña incorrectos.';
  private susptitle = 'Usuario Suspendido';
  private suspmsj = 'El Usuario ingresado se encuentra Suspendido o dado de Baja.';
  private valtitle = 'Bienvenido';
  private valmsj = 'Le damos la bienvenida ';
  private algo = null;  

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private usuarioservicio: UsuarioService,
    private storage: StorageService,
    public alertController: AlertController,
    private menu: MenuController
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
    .then(algo => {
    this.algo = algo;
      if (algo.title.tipo == 1) {
        console.log("LOGUEADO")
        this.logueo = {cuit: this.form.value.cuitUsuario, pass: this.form.value.contrasenaUsuario, id: algo.title.idUsuario , date: null}
        this.storage.setOneObject( 'token',algo.title.token)
        if (this.form.value.checkRecordar){
          this.actualizarLog(this.logueo);
        }
        this.storage.setOneObject( 'currentUsuario', this.logueo)
        this.alert();
        this.menu.enable(true);
         this.router.navigate(["/home"])
      } else {
        if (algo.title.tipo == 2){
          console.log("INVALIDOS")
        } else {
          console.log("SUSPENDIDO INHAVILITAD")
        }
        this.alert();
      }
    })
  }

  actualizarLog(log: Log) {
     log.date = new Date();
    this.storage.actualizarLog(log)
      .then( res => {
        if (!res) {
          console.log("NO HIZO NADA ")
        } else {
          console.log("ACTUALIZATION !!! ")
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
    this.router.navigateByUrl(page);
  }

  async alert() {
    if (this.algo.title.tipo == 1) {
      // console.log("CORROBORANDO2 :", ((this.algo.UsuarioEstado[0].nombreUsuario) || (this.algo.UsuarioEstado.nombreUsuario) ))
      const alert = await this.alertController.create({
        header: this.valtitle,
        message: `${this.valmsj} ${this.algo.UsuarioEstado.nombreUsuario} ${this.algo.UsuarioEstado.apellidoUsuario}`,
        buttons: ['OK'],
        cssClass: 'alert',
      });
      await alert.present();
    } 
    if (this.algo.title.tipo == 2) {
      const alert = await this.alertController.create({
        header: this.invalidotitle,
        message: this.invalidomsj,
        buttons: ['OK'],
        cssClass: 'alert',
      });
      await alert.present();
    } 
    if (this.algo.title.tipo == 3){
      const alert = await this.alertController.create({
        header: this.susptitle,
        message: this.suspmsj,
        buttons: ['OK'],
        cssClass: 'alert',
      });
      await alert.present();
    }
  }

}
