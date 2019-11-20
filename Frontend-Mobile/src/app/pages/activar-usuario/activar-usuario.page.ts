import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ToastController } from '@ionic/angular';
import { NavController, AlertController } from '@ionic/angular';
import { ToastService } from '../../providers/toast.service';

@Component({
  selector: 'app-activar-usuario',
  templateUrl: './activar-usuario.page.html',
  styleUrls: ['./activar-usuario.page.scss'],
})
export class ActivarUsuarioPage implements OnInit {
  
    private token;
    private idUsuario;
    private usuario;
  
    constructor(
      private router: Router,
      private usuarioservicio: UsuarioService,
      public activatedRoute: ActivatedRoute,
      public toastController: ToastController,
      private navController: NavController,
      private toastService: ToastService,
      private alertController: AlertController
    ) {
      this.activatedRoute.params.subscribe(params => {
        this.token = params.token;
        this.recuperarInfoToken(params.token)
      });
    }
  
    ngOnInit() {
    }
  
    recuperarInfoToken( token ) {
      this.usuarioservicio.recuperarDatosToken( token )
        .then((res) => {
          if ( res != null ) {
            this.idUsuario = res.data.idUsuario;
            this.usuario = res.data;
            this.confirmarActivacion();
          } else {
            this.toastService.toastError('No se ha permitido esta acción.', 3000);
            this.navController.navigateRoot('/logueo');
          }
        })
    }

    async confirmarActivacion() {
      const alert = await this.alertController.create({
        header: 'Activar Cuenta de Usuario?',
        message: `Está a un paso de Activar su cuenta a nombre de ${this.usuario.nombreUsuario} ${this.usuario.apellidoUsuario} con cuit ${this.usuario.cuitUsuario}.`,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: ( resp ) => {
              this.navController.navigateRoot('/logueo')
            }
          }, {
            text: 'Activar',
            handler: (  ) => {
              this.usuarioservicio.activarUsuario({ idUsuario: this.idUsuario})
              .then( resp => {
                if (resp.tipo == 1 ) {
                    this.toastService.toastSuccess('Se realizó la activación de su Usuario.', 2500)
                    this.navController.navigateRoot('/logueo')
                  } else {
                    this.toastService.toastError('No se pudo activar su cuenta.', 2000)
                    this.navController.navigateRoot('/logueo')
                }
              })
            }
          }
        ],
        cssClass: 'alertPrimary',
      });
      await alert.present();
    } 
  }