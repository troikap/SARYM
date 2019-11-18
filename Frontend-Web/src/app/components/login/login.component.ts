import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UsuarioService } from "../../services/usuario/usuario.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from 'src/environments/environment';
import { FechaArgentinaProvider } from '../../providers/fechaArgentina.provider';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

  private contadorIntentoContrasenia = environment.contRecPass;

  private form: FormGroup;
  private logueo: any;
  private rol: string;
  private nombreUsuarioLog: string;
  private apellidoUsuarioLog: string;
  private idUsuario: string;

  private invalidotitle = "Datos Inválidos";
  private invalidomsj = "Combinación de Usuario y Contraseña incorrectos.";
  private susptitle = "Usuario Suspendido";
  private suspmsj = "El Usuario ingresado se encuentra Suspendido o dado de Baja.";
  private valtitle = "Bienvenido";
  private valmsj = "Le damos la bienvenida ";
  private algo = null;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioservicio: UsuarioService,
    private router: Router,
    private fechaArgentinaProvider: FechaArgentinaProvider,
  ) {
    this.form = this.formBuilder.group({
      cuitUsuario: ["", Validators.required],
      contrasenaUsuario: ["", Validators.required],
      checkRecordar: false
    });
  }

  ngOnInit() {
    console.log("FECHA ", new Date())
    console.log('fecha Argentina ', this.fechaArgentinaProvider.getFechaArgentina()) // ESTO HERNAN USALO CON LA LINEA 32 y 5
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
    let _this = this;
    ($ as any).confirm({
      title: "Recuperación de Contraseña",
      content: '' +
      '<form action="" class="formName">' +
      '<div class="form-group">' +
      '<label>¿Esta seguro de que desea recuperar su contraseña?. De ser correcto, digite su N° de cuit y le enviaremos un Email a su correo.</label>' +
      '<input type="text" placeholder="Cuit" class="cuit form-control" required />' +
      '</div>' +
      '</form>',
      buttons: {
          formSubmit: {
              text: 'Aceptar',
              btnClass: 'btn-blue',
              action: function () {
                  var cuit = this.$content.find('.cuit').val();
                  if(!cuit){
                    ($ as any).confirm({
                      title: "Error",
                      content: "Debe ingresar el CUIT para poder continuar",
                      type: 'red',
                      typeAnimated: true,
                      theme: 'material',
                      buttons: {
                          aceptar: {
                              text: 'Aceptar',
                              btnClass: 'btn-red',
                              action: function(){}
                          }
                      }
                    });
                  }
                  else if ( cuit.length == 11 ) {
                    _this.usuarioservicio.validarExistenciaUsuario(cuit)
                    .then( resp => {
                      console.log("resp: ", resp);
                      if (resp.tipo == 2 ) {
                        _this.usuarioservicio.envioEmail(resp)
                        .then( respuesta => {
                          if (respuesta['tipo'] == 1 ) {

                            ($ as any).confirm({
                              title: "Éxito",
                              content: "Se ha enviado un Email al correo asociado",
                              type: 'green',
                              typeAnimated: true,
                              theme: 'material',
                              buttons: {
                                  aceptar: {
                                      text: 'Aceptar',
                                      btnClass: 'btn-green',
                                      action: function(){}
                                  }
                              }
                            });
                          } else {
                            ($ as any).confirm({
                              title: "Error",
                              content: "Se produjo un error al intentar enviar el Email",
                              type: 'red',
                              typeAnimated: true,
                              theme: 'material',
                              buttons: {
                                  aceptar: {
                                      text: 'Aceptar',
                                      btnClass: 'btn-red',
                                      action: function(){}
                                  }
                              }
                            });
                          }
                        })
                      } else {
                        ($ as any).confirm({
                          title: "Alerta",
                          content: "No hemos podido encontrar el Usuario",
                          type: 'orange',
                          typeAnimated: true,
                          theme: 'material',
                          buttons: {
                              aceptar: {
                                  text: 'Aceptar',
                                  btnClass: 'btn-orange',
                                  action: function(){
                                    _this.contadorIntentoContrasenia -= 1;
                                  }
                              }
                          }
                        });
                      }
                    })
                  } else {
                    ($ as any).confirm({
                      title: "Error",
                      content: "Cuit Ingresado es incorrecto",
                      type: 'red',
                      typeAnimated: true,
                      theme: 'material',
                      buttons: {
                          aceptar: {
                              text: 'Aceptar',
                              btnClass: 'btn-red',
                              action: function(){}
                          }
                      }
                    });
                  }
              }
          },
          cancelar: function () {
              //close
          },
      },
      onContentReady: function () {
          // bind to events
          var jc = this;
          this.$content.find('form').on('submit', function (e) {
              // if the user submits the form by pressing enter in the field.
              e.preventDefault();
              jc.$$formSubmit.trigger('click'); // reference the button and click it
          });
        }
    });
  } 

  async solicitarAyuda() {
    ($ as any).confirm({
      title: "Excesos de Ingresos",
      content: "Usted ha superado el limite de intentos. Por favor, comuniquese a nuestro correo de Email: sarymresto@gmail.com",
      type: 'red',
      typeAnimated: true,
      theme: 'material',
      buttons: {
          aceptar: {
              text: 'Aceptar',
              btnClass: 'btn-red',
              action: function(){}
          }
      }
    });
  } 

  loguear() {
    this.usuarioservicio
      .loguear(this.form.value.cuitUsuario, this.form.value.contrasenaUsuario)
      .then( algo => {
        if ( algo.tipo != null ) {
          if (algo.tipo == 2) {
            let titulo = `${this.invalidotitle}`;
            let mensaje = `${this.invalidomsj}`;
            ($ as any).confirm({
              title: titulo,
              content: mensaje,
              type: "red",
              typeAnimated: true,
              theme: "material",
              buttons: {
                aceptar: {
                  text: "Aceptar",
                  btnClass: "btn-red",
                }
              }
            });
          } else if (algo.tipo == 1) {
            this.logueo = {
              cuit: this.form.value.cuitUsuario,
              pass: this.form.value.contrasenaUsuario,
              id: algo.Usuario,
              date: null
            };
            localStorage.setItem("token", algo.token);
            this.nombreUsuarioLog = algo.UsuarioEstado.nombreUsuario;
            this.apellidoUsuarioLog = algo.UsuarioEstado.apellidoUsuario;
            this.rol = algo.rol.idRol;
            this.idUsuario = algo.UsuarioEstado.idUsuario;
            localStorage.setItem("rolUsuario", this.rol);
            localStorage.setItem("idUsuario", this.idUsuario);

            let _this = this;

            if (this.rol == "Administrador" || this.rol == "Encargado" || this.rol == "Cocinero") {
              let titulo = `${this.valtitle}`;
              let mensaje = `${this.valmsj} ${_this.nombreUsuarioLog} ${_this.apellidoUsuarioLog} `;
              ($ as any).confirm({
                title: titulo,
                content: mensaje,
                type: "blue",
                typeAnimated: true,
                theme: "material",
                buttons: {
                  aceptar: {
                    text: "Aceptar",
                    btnClass: "btn-blue",
                    action: function () {
                      _this.router.navigate([`/home`]);
                    }
                  }
                }
              });
            } else {
              //Error, se logeo con otro idRol distinto a los anteriores
              ($ as any).confirm({
                title: "Error",
                content: "Ud. no tiene acceso al sistema",
                type: "red",
                typeAnimated: true,
                theme: "material",
                buttons: {
                  aceptar: {
                    text: "Aceptar",
                    btnClass: "btn-red",
                  }
                }
              });
            }
          } else {
            //algo.tipo==3 usuario suspendido
            ($ as any).confirm({
              title: `${this.susptitle}`,
              content: `${this.suspmsj}`,
              type: "orange",
              typeAnimated: true,
              theme: "material",
              buttons: {
                aceptar: {
                  text: "Aceptar",
                  btnClass: "btn-orange",
                }
              }
            });
          }
        } else {
          //NO SE PUDO CONECTAR CON LA BASE DE DATOS
          ($ as any).confirm({
            title: "Error",
            content: "Error de base de datos.",
            type: 'red',
            typeAnimated: true,
            theme: 'material',
            buttons: {
              aceptar: {
                text: 'Aceptar',
                btnClass: 'btn-red',
              }
            }
          });
        }
      });
  }
}
