import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, ValidationErrors} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CajaService } from '../../../services/caja/caja.service';
import { Caja } from 'src/app/model/caja/caja.model';
import { EstadoCaja } from 'src/app/model/estadoCaja/estadoCaja.model';
import { Usuario } from '../../../model/usuario/usuario.model';
import { UsuarioService } from '../../../services/usuario/usuario.service';

@Component({
  selector: 'app-caja-usuario',
  templateUrl: './crud-caja.component.html',
  styleUrls: ['./crud-caja.component.scss']
})
export class CrudCajaComponent implements OnInit {
  
  form: FormGroup; 
  private usuarios: Usuario[];
  private estadosCaja: EstadoCaja [];
  private cajaEncontrada: boolean; 
  private idCaja: string = "";  
  private caja: Caja;
  private newForm = {};

  accionGet;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private cajaServicio: CajaService,       
    private usuarioservicio: UsuarioService
  ) {
    this.form = new FormGroup({
      'idCaja': new FormControl({value: '', disabled: true}),
      'nroCaja': new FormControl('', Validators.required),
      'idEstadoCaja': new FormControl('', Validators.required),
      'idUsuario': new FormControl('', Validators.required)
      
    });

    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);
      this.accionGet  = params.accion;
      this.idCaja = params.id;
      if (this.accionGet !== "crear") {
        console.log("editar")
        this.cajaEncontrada = true;
        this.traerCaja();
      }      
      else {
        this.cajaEncontrada = false;
      }
    });
  }

  ngOnInit() {
    this.traerEstadosCaja();
    this.traerUsuarios();    
  }

 /*  verificarValidacionCampo(pNombreCampo: string, arregloValidaciones: string[]) {
    let countValidate = 0;
    for (let validacion of arregloValidaciones) {
      if (validacion === 'valid') {
        if (this.form.controls[pNombreCampo].valid) {
          countValidate ++;
        }
      }
      if (validacion === 'invalid') {
        if (this.form.controls[pNombreCampo].invalid) {
          countValidate ++;
        }
      }
      if (validacion === 'touched') {
        if (this.form.controls[pNombreCampo].touched) {
          countValidate ++;
        }
      }
    }
    if (countValidate === arregloValidaciones.length) {
      return true;
    }
    else {
      return false;
    }
  } */

  traerCaja() {
    if (this.idCaja !== "0" && this.idCaja !== "") {
      this.cajaServicio.getCaja(this.idCaja)
        .subscribe((data: any) => { // Llamo a un Observer
          console.log(data);
          if (data != null) {
            console.log("RESULT ----------------->", data);
          
            this.caja = data;
    
            this.newForm = {
              idCaja: this.caja['idCaja'],
              nroCaja:  this.caja['nroCaja'],
              idEstadoCaja:  this.caja['cajaestados'][0].estadocaja.idEstadoCaja,
              idUsuario: this.caja['cajaestados'][0].usuario.idUsuario
            }
  
            this.form.setValue(this.newForm);
            console.log("FORM" , this.form);
          }
      });
    }
  }

  reemplazarCaja(): Caja {
    console.log("Funcion 'reemplazarCaja()', ejecutada");
    let us = null;
    if( this.caja && this.caja.idCaja) {
      console.log("SETEO DE ID :", )
      us = this.caja.idCaja;
    } 
    let rempCaja: Caja = {
      idCaja: us,
      nroCaja:  this.form.value['nroCaja'],     
      idEstadoCaja: this.form.value['idEstadoCaja'],
      idUsuario: this.form.value['idUsuario']
      
    }
    return rempCaja;
  }

  guardar() {
    console.log(this.form);

    //Variables para mensajes//
    let _this = this; //Asigno el contexto a una variable, ya que se pierde al ingresar a la función de mensajeria
    const titulo = "Confirmación";
    const mensaje = `¿Está seguro que desea ${this.accionGet} el elemento seleccionado?`;
    ///////////////////////////
    
    if (this.cajaEncontrada && this.accionGet === "editar") {
      
      
      
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
                  
                  
                  let caja = _this.reemplazarCaja();
                  _this.cajaServicio.updateCaja( caja )
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
                                _this.router.navigate( ['/caja/']);
            
            
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
    else if (this.cajaEncontrada && this.accionGet === "eliminar") {
      
      
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
                  
                  

                  let caja = _this.reemplazarCaja();
                  // console.log("Datos A enviar: " + user);
                  _this.usuarioservicio.deleteUsuario( caja )
                  .then( (response) => {
                    console.log("BORRADO", response);
            
                    const titulo = "Éxito";
                    const mensaje = "Se ha eliminado el registro de caja de forma exitosa";
                    
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
                                _this.router.navigate( ['/caja/']);
            
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
                  
                  

                  let unidadMed = _this.reemplazarCaja();
                  console.log("----------------------------- :", unidadMed)
                  _this.cajaServicio.setCaja( unidadMed )
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
                                  _this.router.navigate( ['/caja/']);
              
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

  
  traerEstadosCaja() {
    this.cajaServicio.getEstadosCaja()
      .then((res) => {
        this.estadosCaja = res;
      })
  }
  traerUsuarios() {
    this.usuarioservicio.getUsuarios()
      .then((res) => {
        this.usuarios = res;
      })
  }
  
}
