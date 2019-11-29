import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { StorageService, Log } from '../../services/storage/storage.service';
import { ToastController } from '@ionic/angular';
import * as CustomValidator from '../../utils/custom-validators.util';
import { NavController } from '@ionic/angular';
import { ToastService } from '../../providers/toast.service';

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.page.html',
  styleUrls: ['./recuperar-contrasenia.page.scss'],
})
export class RecuperarContraseniaPage implements OnInit {

  public form: FormGroup;
  public token;
  public idUsuario;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioservicio: UsuarioService,
    public activatedRoute: ActivatedRoute,
    private storage: StorageService,
    public toastController: ToastController,
    private navController: NavController,
    private toastService: ToastService
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
        if (this.token != null) {
          this.recuperarInfoToken(params["token"]);
        } else {
          this.toastService.toastError('Acceso no Autorizado.',2000);
          this.navController.navigateRoot('/logueo')
        }
      });
  }

  guardar() {
    let usuario = { idUsuario: this.idUsuario, contrasenaUsuario: this.form.value.contrasenaUsuario_group.contrasenaUsuario}
    this.usuarioservicio.updateUsuario(usuario)
      .then((resp) => {
        this.toastService.toastSuccess('Contraseña guardada correctamente.',2000);
        this.navController.navigateRoot('/logueo');
      })
      .catch((err) => {
        this.toastService.toastError('Ha ocurrido un error al intentar actualizar la contraseña: ' + err, 3000);
        this.navController.navigateRoot('/logueo');
      })
  }

  recuperarInfoToken( token ) {
    this.usuarioservicio.recuperarDatosToken( token )
      .then((res) => {
        if ( res != null ) {
          this.idUsuario = res.data.idUsuario;
        } else {
          this.toastService.toastError('El tiempo para Recuperar Contraseña ha Caducado.', 3000);
          this.navController.navigateRoot('/logueo');
        }
      })
  }

  async presentToast(data) {
    console.log("data" ,data)
    if ( data && data.tipo == 1) {
      const toast = await this.toastController.create({
        message: data.title.descripcion,
        duration: 3000,
        color: 'success',
        position: 'middle',
        translucent: true
      });
      toast.present();
    }
    if ( data && data.tipo == 2) {
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