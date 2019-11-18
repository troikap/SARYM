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

  private form: FormGroup;
  private token;
  private idUsuario;


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
    this.prueba()
  }

  ngOnInit() {
    this.recuperarToken();
  }

  recuperarToken() {
    this.activatedRoute.params
      .subscribe(params => {
        this.token = params["token"];
        if (this.token != null) {
          console.log("Buscando Usuario")
          this.recuperarInfoToken(params["token"]);
        } else {
          console.log("NO TRAJO TOKEN")
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
        console.log("ERROR ", err)
      })
  }

  recuperarInfoToken( token ) {
    this.usuarioservicio.recuperarDatosToken( token )
      .then((res) => {
        this.idUsuario = res.data.idUsuario;
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