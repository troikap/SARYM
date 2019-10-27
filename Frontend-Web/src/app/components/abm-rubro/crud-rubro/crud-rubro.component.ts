import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RubroService } from '../../../services/rubro/rubro.service';
import { Rubro } from 'src/app/model/rubro/rubro.model';

@Component({
  selector: 'app-crud-rubro',
  templateUrl: './crud-rubro.component.html',
  styleUrls: ['./crud-rubro.component.scss']
})
export class CrudRubroComponent implements OnInit {
  form: FormGroup;
  RubroEncontrado: boolean;
  idRubro: string = "";
  accionGet;

  private newForm = {};
  private Rubro: Rubro;

  constructor(
    private activatedRoute: ActivatedRoute,
    private RubroService :RubroService,
    private router: Router,
  ) { 
    this.form = new FormGroup({
      'id': new FormControl({value: '', disabled: true}),
      'codigo': new FormControl('', [Validators.required, Validators.pattern(/^([A-Z]+|[0-9]+)+$/)]),
      'nombre': new FormControl('', [Validators.required, Validators.pattern(/^([A-ZÑÁÉÍÓÚ]{1})[a-zñáéíóú0-9]+$/)]),
      'descripcion': new FormControl('', Validators.required)
    })

    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);

      this.accionGet  = params.accion;
      this.idRubro = params.id;
      
      if (this.accionGet !== "crear") {
        this.RubroEncontrado = true;
        this.traerRubro();
      }
      else {
        this.RubroEncontrado = false;
      }
      
    });
  }

  ngOnInit() {}

  traerRubro() {
    // console.log("Funcion 'traerRubro()', ejecutada");
    // console.log("valro de idRubro: ---->", this.idRubro);

    if (this.idRubro !== "0" && this.idRubro !== "") {
      this.RubroService.getRubro(this.idRubro)
        .subscribe((data: any) => { // Llamo a un Observer
          console.log(data);
          if (data != null) {
            // console.log("RESULT ----------------->", data);
          
            this.Rubro = data;
    
            this.newForm = {
              id: this.Rubro['idRubro'],
              codigo:  this.Rubro['codRubro'],
              nombre:  this.Rubro['nombreRubro'],
              descripcion:  this.Rubro['descripcionRubro']
            }
  
            this.form.setValue(this.newForm);
            console.log("FORM" , this.form);
          }
      });
    }
  }

  reemplazarRubro(): Rubro {
    console.log("Funcion 'reemplazarRubro()', ejecutada");

    let rubr = null;
    if( this.Rubro && this.Rubro.idRubro) {
      console.log("SETEO DE ID :", this.Rubro)
      rubr = this.Rubro.idRubro;
    } 

    let rempRubro: Rubro = {
      idRubro: rubr,
      codRubro:  this.form.value['codigo'],
      nombreRubro:  this.form.value['nombre'],
      descripcionRubro:  this.form.value['descripcion']
      
    }
    return rempRubro
  }

  guardar() {
    console.log(this.form);

    //Variables para mensajes//
    let _this = this; //Asigno el contexto a una variable, ya que se pierde al ingresar a la función de mensajeria
    const titulo = "Confirmación";
    const mensaje = `¿Está seguro que desea ${this.accionGet} el elemento seleccionado?`;
    ///////////////////////////


    if (this.RubroEncontrado && this.accionGet === "editar") {



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
                  
                  
                  let unidadMed = _this.reemplazarRubro();
                  _this.RubroService.updateRubro( unidadMed )
                  .then( (response) => {
                    console.log("ACTUALIZADO", response);
            
                    const titulo = "Éxito";
                    const mensaje = "Se ha actualizado el registro de Rubro de forma exitrosa";
                    
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
                                _this.router.navigate( ['/rubro/']);
            
            
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
    else if (this.RubroEncontrado && this.accionGet === "eliminar") {
      
      
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
                  
                  

                  let unidadMed = _this.reemplazarRubro();
                  // console.log("Datos A enviar: " + unidadMed);
                  _this.RubroService.deleteRubro( unidadMed )
                  .then( (response) => {
                    console.log("BORRADO", response);
            
                    const titulo = "Éxito";
                    const mensaje = "Se ha eliminado el registro de Rubro de forma exitosa";
                    
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
                                _this.router.navigate( ['/rubro/']);
            
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
                  
                  

                  let unidadMed = _this.reemplazarRubro();
                  // console.log("----------------------------- :", unidadMed)
                  _this.RubroService.createRubro( unidadMed )
                  .then( (response) => {
                    
                    if (response.tipo !== 2) { //TODO CORRECTO

                      console.log("CREADO", response);
                    
                      const titulo = "Éxito";
                      const mensaje = "Se ha Creado un nuevo registro de Rubro de forma exitosa";
                    
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
                                  _this.router.navigate( ['/rubro/']);
              
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
