import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UnidadMedidaService } from '../../../services/unidad-medida/unidad-medida.service';
import { UnidadMedida } from 'src/app/model/unidad-medida/unidad-medida.model';

@Component({
  selector: 'app-abm-unidadmedida-crud',
  templateUrl: './abm-unidadmedida-crud.component.html',
  styleUrls: ['./abm-unidadmedida-crud.component.scss']
})
export class AbmUnidadmedidaCreateComponent implements OnInit {
  form: FormGroup;
  unidadMedidaEncontrada: boolean;
  idUnidadMedida: string = "";
  accionGet;

  private newForm = {};
  private unidadMedida: UnidadMedida;

  constructor(
    private activatedRoute: ActivatedRoute,
    private unidadMedidaService :UnidadMedidaService,
    private router: Router,
  ) { 
    this.form = new FormGroup({
      'id': new FormControl({value: '', disabled: true}),
      'codigo': new FormControl('', [Validators.required, Validators.pattern(/^([A-Z]+|[0-9]+)+$/)]),
      'nombre': new FormControl('', [Validators.required, Validators.pattern(/^([A-ZÑÁÉÍÓÚ]{1})[a-zñáéíóú0-9]+[/]*[a-zñáéíóú0-9]*$/)]),
      'caracter': new FormControl('', [Validators.required, Validators.pattern(/^([A-ZÑÁÉÍÓÚ]{1})[a-zñáéíóú0-9]+$/)]),
      'descripcion': new FormControl('', Validators.required)
    })

    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);

      this.accionGet  = params.accion;
      this.idUnidadMedida = params.id;
      
      if (this.accionGet !== "crear") {
        this.unidadMedidaEncontrada = true;
        this.traerUnidadMedida();
      }
      else {
        this.unidadMedidaEncontrada = false;
      }
      
    });
  }

  ngOnInit() {}

  traerUnidadMedida() {
    // console.log("Funcion 'traerUnidadMedida()', ejecutada");
    // console.log("valro de idUnidadMedida: ---->", this.idUnidadMedida);

    if (this.idUnidadMedida !== "0" && this.idUnidadMedida !== "") {
      this.unidadMedidaService.getUnidadMedida(this.idUnidadMedida)
        .subscribe((data: any) => { // Llamo a un Observer
          console.log(data);
          if (data != null) {
            // console.log("RESULT ----------------->", data);
          
            this.unidadMedida = data;
    
            this.newForm = {
              id: this.unidadMedida['idUnidadMedida'],
              codigo:  this.unidadMedida['codUnidadMedida'],
              nombre:  this.unidadMedida['nombreUnidadMedida'],
              caracter:  this.unidadMedida['caracterUnidadMedida'],
              descripcion:  this.unidadMedida['descripcionUnidadMedida']
            }
  
            this.form.setValue(this.newForm);
            console.log("FORM" , this.form);
          }
      });
    }
  }

  reemplazarUnidadMedida(): UnidadMedida {
    console.log("Funcion 'reemplazarUnidadMedida()', ejecutada");

    let um = null;
    if( this.unidadMedida && this.unidadMedida.idUnidadMedida) {
      console.log("SETEO DE ID :", this.unidadMedida)
      um = this.unidadMedida.idUnidadMedida;
    } 

    let rempUnidadMedida: UnidadMedida = {
      idUnidadMedida: um,
      codUnidadMedida:  this.form.value['codigo'],
      nombreUnidadMedida:  this.form.value['nombre'],
      caracterUnidadMedida:  this.form.value['caracter'],
      descripcionUnidadMedida:  this.form.value['descripcion']
      
    }
    return rempUnidadMedida;
  }

  guardar() {
    console.log(this.form);

    //Variables para mensajes//
    let _this = this; //Asigno el contexto a una variable, ya que se pierde al ingresar a la función de mensajeria
    const titulo = "Confirmación";
    const mensaje = `¿Está seguro que desea ${this.accionGet} el elemento seleccionado?`;
    ///////////////////////////


    if (this.unidadMedidaEncontrada && this.accionGet === "editar") {



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
                  
                  
                  let unidadMed = _this.reemplazarUnidadMedida();
                  _this.unidadMedidaService.updateUnidadMedida( unidadMed )
                  .then( (response) => {
                    console.log("ACTUALIZADO", response);
            
                    const titulo = "Éxito";
                    const mensaje = "Se ha actualizado el registro de Unidad de Medida de forma exitrosa";
                    
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
                                _this.router.navigate( ['/unidadmedida/']);
            
            
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
    else if (this.unidadMedidaEncontrada && this.accionGet === "eliminar") {
      
      
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
                  
                  

                  let unidadMed = _this.reemplazarUnidadMedida();
                  // console.log("Datos A enviar: " + unidadMed);
                  _this.unidadMedidaService.deleteUnidadMedida( unidadMed )
                  .then( (response) => {
                    console.log("BORRADO", response);
            
                    const titulo = "Éxito";
                    const mensaje = "Se ha eliminado el registro de Unidad de Medida de forma exitosa";
                    
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
                                _this.router.navigate( ['/unidadmedida/']);
            
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
                  
                  

                  let unidadMed = _this.reemplazarUnidadMedida();
                  // console.log("----------------------------- :", unidadMed)
                  _this.unidadMedidaService.createUnidadMedida( unidadMed )
                  .then( (response) => {
                    
                    if (response.tipo !== 2) { //TODO CORRECTO

                      console.log("CREADO", response);
                    
                      const titulo = "Éxito";
                      const mensaje = "Se ha Creado un nuevo registro de Unidad de Medida de forma exitosa";
                    
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
                                  _this.router.navigate( ['/unidadmedida/']);
              
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


}
