import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.component.html',
  styleUrls: ['./recuperar-contrasenia.component.scss']
})
export class RecuperarContraseniaComponent implements OnInit {
  form: FormGroup;
  private token;
  private idUsuario;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usuarioservicio: UsuarioService,
  ) {
    this.form = new FormGroup({
      contrasenaUsuario: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(25)]),
      contrasenaUsuarioRepeat: new FormControl("",  [Validators.required, Validators.minLength(8), Validators.maxLength(25)]),
    });
    this.activatedRoute.params.subscribe(params => {
      this.token = params["token"];
        if (this.token != null) {
          this.recuperarInfoToken(params["token"]);
        } else {
          let _this = this;
          ($ as any).confirm({
            title: "Error",
            content: "Acceso no autorizado",
            type: 'red',
            typeAnimated: true,
            theme: 'material',
            buttons: {
                aceptar: {
                    text: 'Aceptar',
                    btnClass: 'btn-red',
                    action: function(){
                      _this.router.navigate(["/loguin"]);
                    }
                }
            }
          });
        }
    });

    this.setValueChangeContraseñaRepeat();
   }

  ngOnInit() {
  }

  recuperarInfoToken( token ) {
    this.usuarioservicio.recuperarDatosToken( token )
      .then((res) => {
        if ( res != null ) {
          this.idUsuario = res.data.idUsuario;
        } else {
          let _this = this;
          ($ as any).confirm({
            title: "Error",
            content: "El tiempo para Recuperar Contraseña ha Caducado",
            type: 'red',
            typeAnimated: true,
            theme: 'material',
            buttons: {
                aceptar: {
                    text: 'Aceptar',
                    btnClass: 'btn-red',
                    action: function(){
                      _this.router.navigate(["/loguin"]);
                    }
                }
            }
          });
        }
      })
  }

  setValueChangeContraseñaRepeat() {
    this.form.get("contrasenaUsuarioRepeat").valueChanges.subscribe(resp => {
      if (resp == this.form.value.contrasenaUsuario) {
        this.form.controls.contrasenaUsuarioRepeat.setErrors(null);
      } else {
        this.form.controls.contrasenaUsuarioRepeat.setErrors({ not_equal: true });
      }
    });
  }

  enviar() {
    let _this = this;
    let usuario = { idUsuario: this.idUsuario, contrasenaUsuario: this.form.value.contrasenaUsuario}
    this.usuarioservicio.updateUsuario(usuario)
      .then((resp) => {
        ($ as any).confirm({
          title: "Éxito",
          content: "Contraseña guardada correctamente",
          type: 'green',
          typeAnimated: true,
          theme: 'material',
          buttons: {
              aceptar: {
                  text: 'Aceptar',
                  btnClass: 'btn-green',
                  action: function(){
                    _this.router.navigate(["/loguin"]);
                  }
              }
          }
        });
      })
      .catch((err) => {
        ($ as any).confirm({
          title: "Error",
          content: "Ha ocurrido un error al intentar actualizar la contraseña: " + err,
          type: 'red',
          typeAnimated: true,
          theme: 'material',
          buttons: {
            aceptar: {
                text: 'Aceptar',
                btnClass: 'btn-red',
                action: function(){
                  _this.router.navigate(["/loguin"]);
                }
            }
          }
        });
      })
  }
}