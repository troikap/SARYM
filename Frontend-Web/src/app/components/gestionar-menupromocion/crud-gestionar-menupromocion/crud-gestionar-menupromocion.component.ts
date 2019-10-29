import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, ValidationErrors} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoMonedaService } from '../../../services/tipo-moneda/tipo-moneda.service';
import { TipoMoneda } from '../../../model/tipo-moneda/tipo-moneda.model';
import { MenuPromocionService } from '../../../services/menu-promocion/menu-promocion.service';
import { MenuPromocion } from 'src/app/model/menu-promocion/menu-promocion.model';
import { TipoMenuPromocion } from '../../../model/tipo-menu-promocion/tipo-menu-promocion.model';
import { TipoMenuPromocionService } from '../../../services/tipo-menu-promocion/tipo-menu-promocion.service';
import { EstadoMenuPromocion } from 'src/app/model/estado-menu-promocion/estado-menu-promocion.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crud-gestionar-menupromocion',
  templateUrl: './crud-gestionar-menupromocion.component.html',
  styleUrls: ['./crud-gestionar-menupromocion.component.scss']
})
export class CrudGestionarMenupromocionComponent implements OnInit {
  
  private form: FormGroup;
  private idMenuPromocion: number;
  private newForm = {};

  menuPromocionEncontrada: boolean;
  tipoMoneda: TipoMoneda;
  tipoMenuPromocion: TipoMenuPromocion;
  estadoMenuPromocion: EstadoMenuPromocion;
  menuPromocion: MenuPromocion;

  idTipoMonedaLoad;
  importePrecioMenuPromocionLoad;
  

  accionGet: string;

  private tipoElementoProducto = "producto";
  private tipoElementoMenuPromocion = "menupromocion";

  public rutaImagenProducto = `${environment.urlNgrok || environment.url}/traerImagen/${this.tipoElementoProducto}/`;
  public rutaImagenMenuPromocion = `${environment.urlNgrok || environment.url}/traerImagen/${this.tipoElementoMenuPromocion}/`;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tipoMonedaService: TipoMonedaService,
    private tipoMenuPromocionSercice: TipoMenuPromocionService,
    private menuPromocionServicio: MenuPromocionService
  ) { 
    this.form = new FormGroup({
      'idMenuPromocion': new FormControl({value: '', disabled: true}),
      'codMenuPromocion': new FormControl('', [Validators.required, Validators.pattern(/^([A-Z]+|[0-9]+)+$/)]),
      'nombreMenuPromocion': new FormControl('', [Validators.required, Validators.pattern(/^([A-ZÑÁÉÍÓÚ]{1})[a-zñáéíóú]+((\s)([A-ZÑÁÉÍÓÚ]{1})[a-zñáéíóú]+)*$/)]),
      'descripcionMenuPromocion': new FormControl('', Validators.required),
      'idTipoMenuPromocion':  new FormControl('', Validators.required),
      'importePrecioMenuPromocion':new FormControl('', [Validators.required, Validators.pattern(/^([0-9]+([.][0-9]{1,2})|[0-9]+)$/)]),
      'idTipoMoneda': new FormControl('',  Validators.required),
      'idEstadoMenuPromocion': new FormControl(''),
      'imgMenuPromocion': new FormControl(''),
      'descripcionCambioEstado': new FormControl('')
    });

    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);
      this.accionGet  = params.accion;
      this.idMenuPromocion = params.id;
      if (this.accionGet !== "crear") {
        this.menuPromocionEncontrada = true;
        this.traerMenuPromocion();
      }
      else {
        this.menuPromocionEncontrada = false;
      }

      if (this.accionGet !== "estado" && this.accionGet !== "crear") {
        this.form.get('idEstadoMenuPromocion').setValidators(Validators.required);
        this.form.get('idEstadoMenuPromocion').updateValueAndValidity();
      }

    });

  }

  ngOnInit() {
    this.getTipoMoneda();
    this.getTipoMenuPromocion();
    this.getEstadoMenuPrmocion();
  }

  traerMenuPromocion() {
    console.log("Funcion 'traerMenuPromocion()', ejecutada");
    console.log("MenuPromocions Obtenidos: ", this.idMenuPromocion);

    if (this.idMenuPromocion !== 0) {
      this.menuPromocionServicio.getMenuPromocion(this.idMenuPromocion)
      .then((res) => {
        console.log("MenuPromocion obtenido: ", res)
        if ( res['tipo'] == 2) {
          console.log("Raro");
        } else {
          this.menuPromocion = res;
          this.newForm = {
            idMenuPromocion: this.menuPromocion.idMenuPromocion,
            codMenuPromocion:  this.menuPromocion.codMenuPromocion,
            nombreMenuPromocion:  this.menuPromocion.nombreMenuPromocion,
            descripcionMenuPromocion:  this.menuPromocion.descripcionMenuPromocion,
            idTipoMenuPromocion:  this.menuPromocion.tipomenupromocion.idTipoMenuPromocion,
            importePrecioMenuPromocion:  this.menuPromocion.preciomenupromocions[0].importePrecioMenuPromocion,
            idTipoMoneda:  this.menuPromocion.preciomenupromocions[0].tipomoneda.idTipoMoneda,
            idEstadoMenuPromocion: this.menuPromocion.menupromocionestados[0].estadomenupromocion.idEstadoMenuPromocion,
            imgMenuPromocion: this.menuPromocion.pathImagenMenuPromocion,
            descripcionCambioEstado: ''
          }
          this.form.setValue(this.newForm)
          console.log("Formulario nuevo: " , this.form);

          if (this.accionGet === "editar") {
            this.idTipoMonedaLoad = this.menuPromocion.preciomenupromocions[0].tipomoneda.idTipoMoneda;
            this.importePrecioMenuPromocionLoad = this.menuPromocion.preciomenupromocions[0].importePrecioMenuPromocion;
          }

        }
      });
    }
  }

  getTipoMoneda() {
    this.tipoMonedaService.getAllTipoMoneda()
    .then((res: any) => {
      console.log("Tipo de Moneda: ", res.data);
      this.tipoMoneda = res.data;
    })
  }

  getTipoMenuPromocion() {
    this.tipoMenuPromocionSercice.getAllTipoMenuPromocion()
    .then((res: any) => {
      console.log("Tipo Menú Prmoción: ", res.data);
      this.tipoMenuPromocion = res.data as TipoMenuPromocion;
    })
  }

  getEstadoMenuPrmocion() {
    this.tipoMenuPromocionSercice.getAllEstadoMenuPromocion()
    .then((res: any) => {
      console.log("Estado MenuPromocions: ", res.data);
      this.estadoMenuPromocion = res.data as EstadoMenuPromocion;
    })
  }

  agregarProductos() {
    this.router.navigate( [`/menupromocion_agregarproducto/${this.menuPromocion.idMenuPromocion}`] );
  }


  getDTOCrearMenuPromocion(): any {
    console.log("Funcion 'getDTOCrearMenuPromocion()', ejecutada");
    let dtoCrearMenuPromocion: any = {
      codMenuPromocion:  this.form.value['codMenuPromocion'],
      nombreMenuPromocion:  this.form.value['nombreMenuPromocion'],
      descripcionMenuPromocion:  this.form.value['descripcionMenuPromocion'],
      idTipoMenuPromocion: this.form.value['idTipoMenuPromocion'],
      importePrecioMenuPromocion:  this.form.value['importePrecioMenuPromocion'],
      idTipoMoneda:  this.form.value['idTipoMoneda'],
      idEstadoMenuPromocion: this.form.value['idEstadoMenuPromocion'],
      imgMenuPromocion: this.form.value['imgMenuPromocion']
    }
    return dtoCrearMenuPromocion;
  }

  getDTOEditarMenuPromocion (): any {
    console.log("Funcion 'getDTOEditarMenuPromocion()', ejecutada");
    let prod = this.menuPromocion.idMenuPromocion;
    
    let dtoEditarMenuPromocion: any = {
      idMenuPromocion: prod,
      codMenuPromocion:  this.form.value['codMenuPromocion'],
      nombreMenuPromocion:  this.form.value['nombreMenuPromocion'],
      descripcionMenuPromocion:  this.form.value['descripcionMenuPromocion'],
      idTipoMenuPromocion: this.form.value['idTipoMenuPromocion'],
      imgMenuPromocion: this.form.value['imgMenuPromocion']
    }
    return dtoEditarMenuPromocion;
  }

  getDTOCambioEstadoEliminarMenuPromocion(accion: string) {
    console.log("Funcion 'getDTOCambioEstadoEliminarMenuPromocion()', ejecutada");
    console.log("Accion: ", accion);

    let idEstado: number;
    if (accion == "eliminar") {
      idEstado = 4; //Estado Eliminado
    }
    else {
      idEstado =  this.form.value['idEstadoMenuPromocion'];
    }

    let prod = this.menuPromocion.idMenuPromocion;
    
    let dtoEditarMenuPromocion: any = {
      idMenuPromocion: prod,
      idEstadoMenuPromocion: idEstado,
      descripcionMenuPromocionEstado:  this.form.value['descripcionCambioEstado'],
      
    }
    return dtoEditarMenuPromocion;
  }

  getDTOCambiarPrecio() {
    console.log("Funcion 'getDTOCambiarPrecio()', ejecutada");
    let prod = this.menuPromocion.idMenuPromocion;
    
    let dtoCambiarPrecio: any = {
      idMenuPromocion: prod,
      importePrecioMenuPromocion: this.form.value['importePrecioMenuPromocion'],
      idTipoMoneda: this.form.value['idTipoMoneda']
    }
    return dtoCambiarPrecio;
  }
  
  goUploadImagen(idMenuPromocion) {
    let nombreImagen = this.form.value['codMenuPromocion'];
    let path = 'menupromocion';
    let retorno = 'menupromocion';

    this.router.navigate( [`/upload/${idMenuPromocion}/${nombreImagen}/${path}/${retorno}`] );
  }

  editarImagenProducto(idProductoImg) {
    this.goUploadImagen(idProductoImg);
  }

  guardar() {
    // console.log("Form Value: ", this.form.value);
    console.log(this.form);

    //Variables para mensajes//
    let _this = this; //Asigno el contexto a una variable, ya que se pierde al ingresar a la función de mensajeria
    const titulo = "Confirmación";
    const mensaje = `¿Está seguro que desea ${this.accionGet} el elemento seleccionado?`;
    ///////////////////////////
    
    if (this.menuPromocionEncontrada && this.accionGet === "editar") {
      
      
      
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
                  
                  
                  let dtoEditarMenuPromocion = _this.getDTOEditarMenuPromocion();
                  _this.menuPromocionServicio.updateMenuPromocion( dtoEditarMenuPromocion )
                  .then( (response) => {
                    
                    console.log("updateMenuPromocion ejecutado: ", response);

                    let importePrecioMenuPromocion = _this.form.value['importePrecioMenuPromocion'];
                    let idTipoMoneda = _this.form.value['idTipoMoneda'];
                
                    if (importePrecioMenuPromocion != _this.importePrecioMenuPromocionLoad || idTipoMoneda != _this.idTipoMonedaLoad) {
                      
                      let dtoCambiarPrecio = _this.getDTOCambiarPrecio();
                      _this.menuPromocionServicio.cambiarPrecio( dtoCambiarPrecio )
                      .then( (response) => {
                        console.log("cambiarPrecio ejecutado: ", response);
                        
              
                        const titulo = "Éxito";
                        const mensaje = "Se ha actualizado el registro de Menú - Promoción de forma exitrosa";
                        
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
                                    _this.router.navigate( ['/menupromocion/']);
                
                
                                  }
                              }
                          }
                        });
  
  
  
  
                      });


                    }
                    else { //No se genera Intermedia de Precio-MenuPromocion


                      const titulo = "Éxito";
                      const mensaje = "Se ha actualizado el registro de Menú - Promoción de forma exitrosa";
                      
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
                                  _this.router.navigate( ['/menupromocion/']);
              
              
                                }
                            }
                        }
                      });


                    }
                    

                    


                    
            
            
                  });

                    



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
    else if (this.menuPromocionEncontrada && this.accionGet === "eliminar") {
      
      
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
                  
                  

                  let dtoEliminarMenuPromocion = _this.getDTOCambioEstadoEliminarMenuPromocion("eliminar");
                  // console.log("Datos A enviar: " + dtoEliminarMenuPromocion);
                  _this.menuPromocionServicio.cambiarEstado( dtoEliminarMenuPromocion )
                  .then( (response) => {
                    console.log("Cambio de Estado a Eliminado, respuesta: ", response);
            
                    const titulo = "Éxito";
                    const mensaje = "Se ha eliminado el registro de Menú - Promoción de forma exitosa";
                    
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
                                _this.router.navigate( ['/menupromocion/']);
            
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
      
      
      
    } 
    else if (this.menuPromocionEncontrada && this.accionGet === "estado") {

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
                  
                  

                  let dtoCambioEstado = _this.getDTOCambioEstadoEliminarMenuPromocion("cambioestado");
                  // console.log("Datos A enviar: " + dtoCambioEstado);
                  _this.menuPromocionServicio.cambiarEstado( dtoCambioEstado )
                  .then( (response) => {
                    console.log("Cambio de Estado a Eliminado, respuesta: ", response);
            
                    const titulo = "Éxito";
                    const mensaje = "Se ha Cambiado el estado del Menú - Promoción de forma exitosa";
                    
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
                                _this.router.navigate( ['/menupromocion/']);
            
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
                  
                  

                  let dtoCrearMenuPromocion = _this.getDTOCrearMenuPromocion();
                  console.log("----------------------------- :", dtoCrearMenuPromocion)
                  _this.menuPromocionServicio.crearMenuPromocion( dtoCrearMenuPromocion )
                  .then( (response) => {
                    
                    if (response.tipo !== 2) { //TODO CORRECTO

                      console.log("Creado, Respuesta: ", response);
                    
                      const titulo = "Éxito";
                      const mensaje = "Se ha Creado un nuevo registro de  Menú - Promoción de forma exitosa";
                    
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
              

                                  ($ as any).confirm({
                                    title: "Confirmar",
                                    content: "¿Desea Cargar la imagen del nuevo Menú - Promoción?",
                                    type: 'blue',
                                    typeAnimated: true,
                                    theme: 'material',
                                    buttons: {
                                        aceptar: {
                                            text: 'Aceptar',
                                            btnClass: 'btn-blue',
                                            action: function(){

                                              let idMenuPromocionCreado = response.id;
                                              _this.goUploadImagen(idMenuPromocionCreado);

                                            }
                                        },
                                        cerrar: {
                                          text: 'Cerrar',
                                          action: function(){
                                             //ACCION
                                             _this.router.navigate( ['/menupromocion/']);
                                          }
                                      }
                                    }
                                  });

                                  
              
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
