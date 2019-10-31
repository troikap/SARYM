import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoMonedaService } from 'src/app/services/tipo-moneda/tipo-moneda.service';
import { TipoMoneda } from 'src/app/model/tipo-moneda/tipo-moneda.model';

@Component({
  selector: 'app-crud-tipomoneda',
  templateUrl: './crud-tipomoneda.component.html',
  styleUrls: ['./crud-tipomoneda.component.scss']
})
export class CrudTipomonedaComponent implements OnInit {

  form: FormGroup;
  tipoMonedaEncontrada: boolean;
  idTipoMoneda: string = "";
  accionGet;

  private newForm = {};
  private tipoMoneda: TipoMoneda;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tipoMonedaService: TipoMonedaService,
    private router: Router,
  ) { 
    this.form = new FormGroup({
      'id': new FormControl({value: '', disabled: true}),
      'simbolo': new FormControl('', Validators.required),
      'nombre': new FormControl('',  [Validators.required, Validators.pattern(/^([A-ZÑÁÉÍÓÚ]{1})[a-zñáéíóú]+((\s)([A-ZÑÁÉÍÓÚ]{1})[a-zñáéíóú]+)*$/)]),
    })

    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);

      this.accionGet  = params.accion;
      this.idTipoMoneda = params.id;
      
      if (this.accionGet !== "crear") {
        this.tipoMonedaEncontrada = true;
        this.traerTipoMoneda();
      }
      else {
        this.tipoMonedaEncontrada = false;
      }

      if (this.accionGet == "eliminar") {
        this.form.disable();
      }
      
    });
  }

  ngOnInit() {}

  traerTipoMoneda() {
    // console.log("Funcion 'traerTipoMoneda()', ejecutada");
    // console.log("valro de idTipoMoneda: ---->", this.idTipoMoneda);

    if (this.idTipoMoneda !== "0" && this.idTipoMoneda !== "") {
      this.tipoMonedaService.getTipoMoneda(this.idTipoMoneda)
        .subscribe((data: any) => { // Llamo a un Observer
          console.log(data);
          if (data != null) {
            // console.log("RESULT ----------------->", data);
          
            this.tipoMoneda = data;
    
            this.newForm = {
              id: this.tipoMoneda['idTipoMoneda'],
              simbolo:  this.tipoMoneda['simboloTipoMoneda'],
              nombre:  this.tipoMoneda['nombreTipoMoneda']
            }
  
            this.form.setValue(this.newForm);
            console.log("FORM" , this.form);
          }
      });
    }
  }

  reemplazarTipoMoneda(): TipoMoneda {
    console.log("Funcion 'reemplazarTipoMoneda()', ejecutada");

    let tipMon = null;
    if( this.tipoMoneda && this.tipoMoneda.idTipoMoneda) {
      console.log("SETEO DE ID :", this.tipoMoneda)
      tipMon = this.tipoMoneda.idTipoMoneda;
    } 

    let rempTipoMoneda: TipoMoneda = {
      idTipoMoneda: tipMon,
      simboloTipoMoneda:  this.form.value['simbolo'],
      nombreTipoMoneda:  this.form.value['nombre']
    }
    return rempTipoMoneda;
  }

  guardar() {
    console.log(this.form);

    //Variables para mensajes//
    let _this = this; //Asigno el contexto a una variable, ya que se pierde al ingresar a la función de mensajeria
    const titulo = "Confirmación";
    const mensaje = `¿Está seguro que desea ${this.accionGet} el elemento seleccionado?`;
    ///////////////////////////


    if (this.tipoMonedaEncontrada && this.accionGet === "editar") {



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
                  
                  
                  let unidadMed = _this.reemplazarTipoMoneda();
                  _this.tipoMonedaService.updateTipoMoneda( unidadMed )
                  .then( (response) => {
                    console.log("ACTUALIZADO", response);
            
                    const titulo = "Éxito";
                    const mensaje = "Se ha actualizado el registro de Tipo de Moneda de forma exitrosa";
                    
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
                                _this.router.navigate( ['/tipomoneda/']);
            
            
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
    else if (this.tipoMonedaEncontrada && this.accionGet === "eliminar") {
      
      
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
                  
                  

                  let unidadMed = _this.reemplazarTipoMoneda();
                  // console.log("Datos A enviar: " + unidadMed);
                  _this.tipoMonedaService.deleteTipoMoneda( unidadMed )
                  .then( (response) => {
                    console.log("BORRADO", response);
                    
                    if (response.tipo == 2) {
                      const titulo = "Error";
                      const mensaje = "No se ha podido eliminar el Tipo de Moneda ingresado. El mismo ya está siendo utilizado en otro elemento.";
                      
                      ($ as any).confirm({
                        title: titulo,
                        content: mensaje,
                        type: 'red',
                        typeAnimated: true,
                        theme: 'material',
                        buttons: {
                            aceptar: {
                                text: 'Aceptar',
                                btnClass: 'btn-red',
                                action: function(){
              
                                  //ACCION
                                  _this.router.navigate( ['/tipomoneda/']);
              
                                }
                            }
                        }
                      });
                    }
                    else {
                      const titulo = "Éxito";
                      const mensaje = "Se ha eliminado el registro de Tipo de Moneda de forma exitosa";
                      
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
                                  _this.router.navigate( ['/tipomoneda/']);
              
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
                  
                  

                  let unidadMed = _this.reemplazarTipoMoneda();
                  // console.log("----------------------------- :", unidadMed)
                  _this.tipoMonedaService.createTipoMoneda( unidadMed )
                  .then( (response) => {
                    
                    if (response.tipo !== 2) { //TODO CORRECTO

                      console.log("CREADO", response);
                    
                      const titulo = "Éxito";
                      const mensaje = "Se ha Creado un nuevo registro de Tipo de Moneda de forma exitosa";
                    
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
                                  _this.router.navigate( ['/tipomoneda/']);
              
                                }
                            }
                        }
                      });




                    }
                    else {
                      console.log("ERROR", response);
                      
                      ($ as any).confirm({
                        title: "Error",
                        content: `Ya existe el registro. No es posible realizar esta acción`, 
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
