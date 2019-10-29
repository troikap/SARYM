import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, ValidationErrors} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartamentoService, Departamento } from '../../../services/departamento/departamento.service';
import { RolService, Rol } from '../../../services/rol/rol.service';
import { EstadoUsuarioService, EstadoUsuario } from '../../../services/estadousuario/estadousuario.service';
import { Usuario } from '../../../model/usuario/usuario.model';
import { UsuarioService } from '../../../services/usuario/usuario.service';

@Component({
  selector: 'app-crud-usuario',
  templateUrl: './crud-usuario.component.html',
  styleUrls: ['./crud-usuario.component.scss']
})
export class CrudUsuarioComponent implements OnInit {
  
  form: FormGroup;
  private departamentos: Departamento[];
  private roles: Rol[];
  private estadosusuarios: EstadoUsuario[];
  private usuarioEncontrado: boolean; 
  private idUsuario: number = null;
  private usuario: Usuario;
  private newForm = {};
  private countEditarPass = 0;

  accionGet;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private departamnetoservicio: DepartamentoService,
    private rolservicio: RolService,
    private estadousuarioservicio: EstadoUsuarioService,
    private usuarioservicio: UsuarioService
  ) {
    this.form = new FormGroup({
      'idUsuario': new FormControl({value: '', disabled: true}),
      'nombreUsuario': new FormControl('', [Validators.required, Validators.pattern(/^([A-ZÑÁÉÍÓÚ]{1})[a-zñáéíóú]+((\s)([A-ZÑÁÉÍÓÚ]{1})[a-zñáéíóú]+)*$/)]),
      'apellidoUsuario': new FormControl('',  [Validators.required, Validators.pattern(/^([A-ZÑÁÉÍÓÚ]{1})[a-zñáéíóú]+((\s)([A-ZÑÁÉÍÓÚ]{1})[a-zñáéíóú]+)*$/)]),
      'contrasenaUsuario': new FormControl(''),
      'contrasenaUsuarioRepeat': new FormControl(''),
      'cuitUsuario': new FormControl('', [Validators.required, Validators.pattern(/^((20)|(23)|(24)|(25)|(26)|(27)|(30))[0-9]{9}$/)]),
      'dniUsuario': new FormControl('', Validators.required),
      'domicilioUsuario': new FormControl('', Validators.required),
      'emailUsuario': new FormControl('',  [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),      
      'idDepartamento': new FormControl('', Validators.required),
      'nroCelularUsuario': new FormControl('', [Validators.required, Validators.pattern(/^[0-9\-]{9,12}$/)]),
      'nroTelefonoUsuario': new FormControl('', [Validators.required, Validators.pattern(/^[0-9\-]{9,12}$/)]),
      'idRol': new FormControl('', Validators.required),
      'idEstadoUsuario': new FormControl('', Validators.required)
    });
    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);
      this.accionGet  = params.accion;
      this.idUsuario = params.id;

      if (this.accionGet !== "crear") { // editar, eliminar
        this.usuarioEncontrado = true;
        this.traerUsuario();
      }
      else {
        this.usuarioEncontrado = false;
      }

      if (this.accionGet == "crear") {
        this.form.get('contrasenaUsuario').setValidators([
          Validators.required, 
          Validators.minLength(5), 
          Validators.maxLength(25)
        ]);
        this.form.get('contrasenaUsuario').updateValueAndValidity();
        
        this.form.get('contrasenaUsuarioRepeat').setValidators(Validators.required);
        this.form.get('contrasenaUsuarioRepeat').updateValueAndValidity();
        
        this.setValueChangeContraseñaRepeat();
      }
      if (this.accionGet == "eliminar") {
        this.form.disable();
      }
    });

    
  }

  ngOnInit() {
    this.traerDepartamentos();
    this.traerRoles();
    this.traerEstadosUsuarios();
  }

  setValidatorsDNI () {
    if (this.accionGet != "eliminar") {

      let cuitUsr = this.form.value.cuitUsuario;
      cuitUsr = cuitUsr.toString().slice(2,10);
      console.log("cuitUsr: ", cuitUsr);

      this.form.get('dniUsuario').valueChanges
      .subscribe( ( resp ) => {
        if ( resp == cuitUsr ) {
          this.form.controls.dniUsuario.setErrors(null)
        } else {
          this.form.controls.dniUsuario.setErrors({not_equal: true})
        }
      });
    }
  }

  setValidateContraseniaEditar() {
    if (this.accionGet == "editar") {

      this.form.get('contrasenaUsuario').valueChanges
      .subscribe( ( resp ) => {
        if (this.countEditarPass == 0) {
          
          this.form.get('contrasenaUsuario').setValidators([
            Validators.required, 
            Validators.minLength(5), 
            Validators.maxLength(25)
          ]);
          // this.form.get('contrasenaUsuario').updateValueAndValidity();

          this.setValueChangeContraseñaRepeat();
          this.form.get('contrasenaUsuarioRepeat').setValidators(Validators.required);
          // this.form.get('contrasenaUsuarioRepeat').updateValueAndValidity();
        }

        this.countEditarPass ++;

        if (resp == "") {
          this.countEditarPass = 0;
          this.form.get('contrasenaUsuario').setValidators(null);
          // this.form.get('contrasenaUsuario').updateValueAndValidity();

          this.form.get('contrasenaUsuarioRepeat').setValidators(null);
          // this.form.get('contrasenaUsuarioRepeat').updateValueAndValidity();

          this.form.controls['contrasenaUsuarioRepeat'].setValue(null);
        }
        
      });
    }
  }

  traerUsuario() {
    console.log("Funcion 'traerUsuario()', ejecutada");
    console.log(this.idUsuario);

    if (this.idUsuario !== 0) {
      this.usuarioservicio.getUsuario(this.idUsuario)
      .then((res) => {
        console.log("USUARIO TRAIDO: ", res)
        if ( res['tipo'] == 2) {
          console.log("Raro")
        } else {
        if (res) {
          this.usuario = res['Usuario'];
          this.newForm = {
            idUsuario: this.usuario['idUsuario'],
            cuitUsuario:  this.usuario['cuitUsuario'],
            nombreUsuario:  this.usuario['nombreUsuario'],
            apellidoUsuario:  this.usuario['apellidoUsuario'],
            dniUsuario:  this.usuario['dniUsuario'],
            domicilioUsuario:  this.usuario['domicilioUsuario'],
            emailUsuario:  this.usuario['emailUsuario'],
            idDepartamento:  this.usuario['idDepartamento'],
            contrasenaUsuario: null,
            contrasenaUsuarioRepeat: null,
            nroCelularUsuario: this.usuario['nroCelularUsuario'],
            nroTelefonoUsuario: this.usuario['nroTelefonoUsuario'],
            idRol: this.usuario['rolusuarios'][0].rol.idRol,
            idEstadoUsuario: this.usuario['usuarioestados'][0].estadousuario.idEstadoUsuario
          }
          this.form.setValue(this.newForm)
          console.log("FORM" , this.form);

          this.setValidatorsDNI();
          this.setValidateContraseniaEditar();
        }
      }
      });
    }
  }

  reemplazarUsuario(): Usuario {
    console.log("Funcion 'reemplazarUsuario()', ejecutada");
    let us = null;
    if( this.usuario && this.usuario.idUsuario) {
      console.log("SETEO DE ID :", )
      us = this.usuario.idUsuario;
    } 
    let rempUsuario: Usuario = {
      idUsuario: us,
      cuitUsuario:  this.form.value['cuitUsuario'],
      nombreUsuario:  this.form.value['nombreUsuario'],
      apellidoUsuario:  this.form.value['apellidoUsuario'],
      dniUsuario:  this.form.value['dniUsuario'],
      domicilioUsuario:  this.form.value['domicilioUsuario'],
      emailUsuario:  this.form.value['emailUsuario'],
      idDepartamento:  this.form.value['idDepartamento'],
      nroCelularUsuario: this.form.value['nroCelularUsuario'],
      nroTelefonoUsuario: this.form.value['nroTelefonoUsuario'],
      contrasenaUsuario: this.form.value['contrasenaUsuario'],
      idRol: this.form.value['idRol'],
      idEstadoUsuario: this.form.value['idEstadoUsuario'],
      
    }
    return rempUsuario;
  }

  guardar() {
    console.log(this.form);

    //Variables para mensajes//
    let _this = this; //Asigno el contexto a una variable, ya que se pierde al ingresar a la función de mensajeria
    const titulo = "Confirmación";
    const mensaje = `¿Está seguro que desea ${this.accionGet} el elemento seleccionado?`;
    ///////////////////////////
    
    if (this.usuarioEncontrado && this.accionGet === "editar") {
      
      
      
      ($ as any).confirm({
        title: titulo,
        content: mensaje,
        type: 'blue',
        typeAnimated: true,
        theme: 'material',
        buttons: {
            aceptar: {
                text: 'Aceptar',
                btnClass: 'btn-blue',
                action: function(){
                  
                  
                  let user = _this.reemplazarUsuario();
                  _this.usuarioservicio.updateUsuario( user )
                  .then( (response) => {
                    console.log("ACTUALIZADO", response);
            
                    const titulo = "Éxito";
                    const mensaje = "Se ha actualizado el registro de usuario de forma exitrosa";
                    
                    ($ as any).confirm({
                      title: titulo,
                      content: mensaje,
                      type: 'green',
                      typeAnimated: true,
                      theme: 'material',
                      buttons: {
                          aceptar: {
                              text: 'Aceptar',
                              btnClass: 'btn-green',
                              action: function(){
            
                                //ACCION
                                _this.router.navigate( ['/usuario/']);
            
            
                              }
                          }
                      }
                    });
            
            
                  })



                }
            },
            cerrar: {
              text: 'Cerrar',
              action: function(){
                console.log("Edición Cancelada");
              }
          }
        }
      });



    } 
    else if (this.usuarioEncontrado && this.accionGet === "eliminar") {
      
      
      ($ as any).confirm({
        title: titulo,
        content: mensaje,
        type: 'blue',
        typeAnimated: true,
        theme: 'material',
        buttons: {
            aceptar: {
                text: 'Aceptar',
                btnClass: 'btn-blue',
                action: function(){
                  
                  

                  let user = _this.reemplazarUsuario();
                  // console.log("Datos A enviar: " + user);
                  _this.usuarioservicio.deleteUsuario( user )
                  .then( (response) => {
                    console.log("BORRADO", response);
            
                    const titulo = "Éxito";
                    const mensaje = "Se ha eliminado el registro de usuario de forma exitosa";
                    
                    ($ as any).confirm({
                      title: titulo,
                      content: mensaje,
                      type: 'green',
                      typeAnimated: true,
                      theme: 'material',
                      buttons: {
                          aceptar: {
                              text: 'Aceptar',
                              btnClass: 'btn-green',
                              action: function(){
            
                                //ACCION
                                _this.router.navigate( ['/usuario/']);
            
                              }
                          }
                      }
                    });
            
                  })




                }
            },
            cerrar: {
              text: 'Cerrar',
              action: function(){
                console.log("Eliminación cancelada");
              }
          }
        }
      });
      
      
      
    } else {
      
      
      
      ($ as any).confirm({
        title: titulo,
        content: "¿Confirma la creación de un nuevo registro?",
        type: 'blue',
        typeAnimated: true,
        theme: 'material',
        buttons: {
            aceptar: {
                text: 'Aceptar',
                btnClass: 'btn-blue',
                action: function(){
                  
                  

                  let unidadMed = _this.reemplazarUsuario();
                  console.log("----------------------------- :", unidadMed)
                  _this.usuarioservicio.setUsuario( unidadMed )
                  .then( (response) => {
                    
                    if (response.tipo !== 2) { //TODO CORRECTO

                      console.log("CREADO", response);
                    
                      const titulo = "Éxito";
                      const mensaje = "Se ha Creado un nuevo registro de usuario de forma exitosa";
                    
                      ($ as any).confirm({
                        title: titulo,
                        content: mensaje,
                        type: 'green',
                        typeAnimated: true,
                        theme: 'material',
                        buttons: {
                            aceptar: {
                                text: 'Aceptar',
                                btnClass: 'btn-green',
                                action: function(){
              
                                  //ACCION
                                  _this.router.navigate( ['/usuario/']);
              
                                }
                            }
                        }
                      });




                    }
                    else {
                      console.log("ERROR", response);
                      
                      ($ as any).confirm({
                        title: "Error",
                        content: `${response.title}. No es posible realizar esta acción`, 
                        type: 'red',
                        typeAnimated: true,
                        theme: 'material',
                        buttons: {
                            aceptar: {
                                text: 'Aceptar',
                                btnClass: 'btn-red',
                                action: function(){
                                  console.log("Mensaje de error aceptado");
                                }
                            }
                        }
                      });
                      



                    }

                    
            
                    
                  })




                }
            },
            cerrar: {
              text: 'Cerrar',
              action: function(){
                console.log("Creación Cancelada");
              }
          }
        }
      });
      
      
      
      
    }
  }

  setValueChangeContraseñaRepeat () {
    this.form.get('contrasenaUsuarioRepeat').valueChanges
    .subscribe( ( resp ) => {
      // console.log("RESPUESTA :",resp)
      if ( resp == this.form.value.contrasenaUsuario ) {
        this.form.controls.contrasenaUsuarioRepeat.setErrors(null)
      } else {
        this.form.controls.contrasenaUsuarioRepeat.setErrors({not_equal: true})
      }
    })
  }

  traerDepartamentos() {
    this.departamnetoservicio.getDepartamentos()
      .then((res) => {
        console.log("Departamentos:", res);
        this.departamentos = res;
      })
  }
  traerRoles() {
    this.rolservicio.getRoles()
      .then((res) => {
        this.roles = res;
      })
  }
  traerEstadosUsuarios() {
    this.estadousuarioservicio.getEstadosUsuarios()
      .then((res) => {
        this.estadosusuarios = res;
      })
  }
}
