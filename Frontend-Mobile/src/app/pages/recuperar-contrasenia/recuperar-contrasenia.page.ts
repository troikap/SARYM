import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { StorageService, Log } from '../../services/storage/storage.service';
import { ToastController } from '@ionic/angular';
import * as CustomValidator from '../../utils/custom-validators.util';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.page.html',
  styleUrls: ['./recuperar-contrasenia.page.scss'],
})
export class RecuperarContraseniaPage implements OnInit {

  private form: FormGroup;
  private token;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioservicio: UsuarioService,
    public activatedRoute: ActivatedRoute,
    private storage: StorageService,
    public toastController: ToastController,
    private navController: NavController
  ) {
    this.form = this.formBuilder.group({
      contrasenaUsuario_group: new FormGroup({
        contrasenaUsuario: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(25)])),
        contrasenaUsuarioRepeat: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(25)]))
      }, { validators: CustomValidator.equalValidator({ first_control_name: 'contrasenaUsuario', second_control_name: 'contrasenaUsuarioRepeat' }) })
    });
  }

  ngOnInit() {
    this.recuperarToken();
  }

  recuperarToken() {
    this.activatedRoute.params
      .subscribe(params => {
        this.token = params["token"];
        if (this.token != 0) {
          console.log("Buscando Usuario")
          this.recuperarInfoToken(this.token);
        } else {
          console.log("NO TRAJO TOKEN")
        }
      });
  }

  guardar() {
    this.storage.getOneObject('token')
      .then((res) => {
        let usuario = this.crearNuevoUsuario();
        if (this.id != 0) {
          this.usuarioservicio.updateUsuario(usuario)
            .then((resp) => {
              this.presentToast(resp);
            })
            .catch((err) => {
              console.log("ERROR ", err)
            })
        } else {
          if (this.id == 0) {
            this.usuarioservicio.setUsuario(usuario)
              .then((resp) => {
                this.presentToast(resp);
                this.navController.navigateRoot('/logueo');
              })
              .catch((err) => {
                console.log("ERROR ", err)
              })
          }
        }
      })
  }

  crearNuevoUsuario() {
    let data = {};
    data = {
      "cuitUsuario": this.form.value.cuitUsuario,
      "nombreUsuario": this.form.value.nombreUsuario,
      "apellidoUsuario": this.form.value.apellidoUsuario,
      "contrasenaUsuario": this.form.value.contrasenaUsuario,
      "dniUsuario": this.form.value.dniUsuario,
      "domicilioUsuario": this.form.value.domicilioUsuario,
      "emailUsuario": this.form.value.emailUsuario,
      "idDepartamento": this.form.value.idDepartamento,
      "nroCelularUsuario": Number(this.form.value.nroCelularUsuario.substr(0, 3) + this.form.value.nroCelularUsuario.substr(4, 3) + this.form.value.nroCelularUsuario.substr(8)),
      "nroTelefonoUsuario": Number(this.form.value.nroTelefonoUsuario.substr(0, 3) + this.form.value.nroTelefonoUsuario.substr(4, 3) + this.form.value.nroTelefonoUsuario.substr(8))
    }
    if (this.id > 0) {
      data['idUsuario'] = Number(this.id);
    } else {
      data['contrasenaUsuario'] = this.form.value['contrasenaUsuario_group']['contrasenaUsuario']
    }
    return data;
  }

  recuperarInfoToken(token) {
    this.usuarioservicio.getUsuario(id)
      .then((res) => {
        this.usuario = res['Usuario'];
        this.transformarForm();
      })
  }

  async presentToast(data) {
    console.log("data" ,data)
    if (data.tipo == 1) {
      const toast = await this.toastController.create({
        message: data.title.descripcion,
        duration: 3000,
        color: 'success',
        position: 'middle',
        translucent: true
      });
      toast.present();
    }
    if (data.tipo == 2) {
      const toast = await this.toastController.create({
        message: data.title.descripcion,
        duration: 3000,
        color: 'warning',
        position: 'middle',
        translucent: true
      });
      toast.present();
    }
  }
  
  prueba() {
    console.log(this.form)
  }
}