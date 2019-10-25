import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, ValidationErrors} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/model/producto/producto.model';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { UnidadMedidaService } from '../../../services/unidad-medida/unidad-medida.service';
import { TipoMonedaService } from '../../../services/tipo-moneda/tipo-moneda.service';
import { RubroService } from '../../../services/rubro/rubro.service';
import { UnidadMedida } from 'src/app/model/unidad-medida/unidad-medida.model';
import { TipoMoneda } from '../../../model/tipo-moneda/tipo-moneda.model';
import { Rubro } from 'src/app/model/rubro/rubro.model';
import { UploadComponent } from 'src/app/upload/upload.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crud-gestionar-producto',
  templateUrl: './crud-gestionar-producto.component.html',
  styleUrls: ['./crud-gestionar-producto.component.scss']
})
export class CrudGestionarProductoComponent implements OnInit {
  private form: FormGroup;
  private producto: Producto;
  private idProducto: number;
  private newForm = {};

  public uploadComponents: UploadComponent;
  
  idTipoMonedaLoad;
  importePrecioProductoLoad;

  productoEncontrado: boolean;
  unidadMedida: UnidadMedida;
  tipoMoneda: TipoMoneda;
  rubros: Rubro;
  estadoProducto: any;
  productoCreado: boolean = false;

  accionGet: string;

  //Elementos para traer imagen//
  tipoElemento = "producto";
  public rutaImagen = `${environment.urlNgrok || environment.url}/traerImagen/${this.tipoElemento}/`;
  ////////////////////////////////

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productoServicio: ProductoService,
    private unidadMedidaService: UnidadMedidaService,
    private tipoMonedaService: TipoMonedaService,
    private rubroService: RubroService
  ) {
    this.form = new FormGroup({
      'idProducto': new FormControl({value: '', disabled: true}),
      'codProducto': new FormControl('', Validators.required),
      'nombreProducto': new FormControl('', Validators.required),
      'idUnidadMedida': new FormControl('', Validators.required),
      'cantidadMedida': new FormControl('', Validators.required),
      'descripcionProducto': new FormControl('', Validators.required),
      'importePrecioProducto': new FormControl('', Validators.required),
      'idTipoMoneda': new FormControl('',  Validators.required),
      'idRubro': new FormControl('',  Validators.required),
      'idEstadoProducto': new FormControl(''),
      'descripcionCambioEstado': new FormControl('')
    });

    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);
      this.accionGet  = params.accion;
      this.idProducto = params.id;
      if (this.accionGet !== "crear") {
        this.productoEncontrado = true;
        this.traerProducto();
      }
      else {
        this.productoEncontrado = false;
      }

      if (this.accionGet !== "estado" && this.accionGet !== "crear") {
        this.form.get('idEstadoProducto').setValidators(Validators.required);
        this.form.get('idEstadoProducto').updateValueAndValidity();
      }

    });

   }

  ngOnInit() {
    this.getUnidadMedida();
    this.getTipoMoneda();
    this.getRubro();
    this.getEstadoProducto();
  }

  traerProducto() {
    console.log("Funcion 'traerProducto()', ejecutada");
    console.log("Productos Obtenidos: ", this.idProducto);

    if (this.idProducto !== 0) {
      this.productoServicio.getProducto(this.idProducto)
      .then((res) => {
        console.log("Producto obtenido: ", res)
        if ( res['tipo'] == 2) {
          console.log("Raro");
        } else {
          this.producto = res;
          this.newForm = {
            idProducto: this.producto.idProducto,
            codProducto:  this.producto.codProducto,
            nombreProducto:  this.producto.nombreProducto,
            idUnidadMedida:  this.producto.unidadmedida.idUnidadMedida,
            cantidadMedida:  this.producto.cantidadMedida,
            descripcionProducto:  this.producto.descripcionProducto,
            importePrecioProducto:  this.producto.precioproductos[0].importePrecioProducto,
            idTipoMoneda:  this.producto.precioproductos[0].tipomoneda.idTipoMoneda,
            idRubro: this.producto.rubro.idRubro,
            idEstadoProducto: this.producto.productoestados[0].estadoproducto.idEstadoProducto,
            descripcionCambioEstado: ''
          }
          this.form.setValue(this.newForm)
          console.log("Formulario nuevo: " , this.form);

          if (this.accionGet === "editar") {
            this.idTipoMonedaLoad = this.producto.precioproductos[0].tipomoneda.idTipoMoneda;
            this.importePrecioProductoLoad = this.producto.precioproductos[0].importePrecioProducto;
          }
        }
      });
    }
  }
  getUnidadMedida() {
    this.unidadMedidaService.getAllUnidadMedida()
    .then((res: any) => {
      console.log("Unidad de Medida: ", res.data);
      this.unidadMedida = res.data;
    })
  }
  getTipoMoneda() {
    this.tipoMonedaService.getAllTipoMoneda()
    .then((res: any) => {
      console.log("Tipo de Moneda: ", res.data);
      this.tipoMoneda = res.data;
    })
  }
  getRubro() {
    this.rubroService.getAllRubro()
    .then((res: any) => {
      console.log("Rubros: ", res.data);
      this.rubros = res.data;
    })
  }
  getEstadoProducto() {
    this.productoServicio.getAllEstadoProducto()
    .then((res: any) => {
      console.log("Estado Productos: ", res.data);
      this.estadoProducto = res.data;
    })
  }

  getDTOCrearProducto(): any {
    console.log("Funcion 'reemplazarProducto()', ejecutada");
    let prod = null;
    if( this.producto && this.producto.idProducto) {
      console.log("SETEO DE ID :", )
      prod = this.producto.idProducto;
    } 
    let dtoCrearProducto: any = {
      codProducto:  this.form.value['codProducto'],
      nombreProducto:  this.form.value['nombreProducto'],
      idUnidadMedida:  this.form.value['idUnidadMedida'],
      cantidadMedida:  this.form.value['cantidadMedida'],
      descripcionProducto:  this.form.value['descripcionProducto'],
      importePrecioProducto:  this.form.value['importePrecioProducto'],
      idTipoMoneda:  this.form.value['idTipoMoneda'],
      idRubro: this.form.value['idRubro'],
      idEstadoProducto: this.form.value['idEstadoProducto']
    }
    return dtoCrearProducto;
  }

  getDTOEditarProducto (): any {
    console.log("Funcion 'DTOEditarProducto()', ejecutada");
    let prod = this.producto.idProducto;
    
    let dtoEditarProducto: any = {
      idProducto: prod,
      codProducto:  this.form.value['codProducto'],
      nombreProducto:  this.form.value['nombreProducto'],
      idUnidadMedida:  this.form.value['idUnidadMedida'],
      cantidadMedida:  this.form.value['cantidadMedida'],
      descripcionProducto:  this.form.value['descripcionProducto'],
      idRubro: this.form.value['idRubro']
    }
    return dtoEditarProducto;
  }

  getDTOCambioEstadoEliminarProducto(accion: string) {
    console.log("Funcion 'DTOCambioEstadoEliminarProducto()', ejecutada");
    console.log("Accion: ", accion);

    let idEstado: number;
    if (accion == "eliminar") {
      idEstado = 4; //Estado Eliminado
    }
    else {
      idEstado =  this.form.value['idEstadoProducto'];
    }

    let prod = this.producto.idProducto;
    
    let dtoEditarProducto: any = {
      idProducto: prod,
      idEstadoProducto: idEstado,
      descripcionProductoEstado:  this.form.value['descripcionCambioEstado'],
      
    }
    return dtoEditarProducto;
  }

  getDTOCambiarPrecio() {
    console.log("Funcion 'DTOCambiarPrecio()', ejecutada");
    let prod = this.producto.idProducto;
    
    let dtoCambiarPrecio: any = {
      idProducto: prod,
      importePrecioProducto: this.form.value['importePrecioProducto'],
      idTipoMoneda: this.form.value['idTipoMoneda']
    }
    return dtoCambiarPrecio;
  }

  goUploadImagen(idProducto) {
    let nombreImagen = this.form.value['codProducto'];
    let path = 'producto';
    let retorno = 'producto';

    this.router.navigate( [`/upload/${idProducto}/${nombreImagen}/${path}/${retorno}`] );
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
    
    if (this.productoEncontrado && this.accionGet === "editar") {
      
      
      
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
                  
                  
                  let dtoEditarProducto = _this.getDTOEditarProducto();
                  _this.productoServicio.updateProducto( dtoEditarProducto )
                  .then( (response) => {
                    
                    console.log("updateProducto ejecutado: ", response);

                    let importePrecioProducto = _this.form.value['importePrecioProducto'];
                    let idTipoMoneda = _this.form.value['idTipoMoneda'];
                
                    if (importePrecioProducto != _this.importePrecioProductoLoad || idTipoMoneda != _this.idTipoMonedaLoad) {
                      
                      let dtoCambiarPrecio = _this.getDTOCambiarPrecio();
                      _this.productoServicio.cambiarPrecio( dtoCambiarPrecio )
                      .then( (response) => {
                        console.log("cambiarPrecio ejecutado: ", response);
                        
              
                        const titulo = "Éxito";
                        const mensaje = "Se ha actualizado el registro de producto de forma exitrosa";
                        
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
                                    _this.router.navigate( ['/producto/']);
                
                
                                  }
                              }
                          }
                        });
  
  
  
  
                      });


                    }
                    else { //No se genera Intermedia de Precio-Producto


                      const titulo = "Éxito";
                      const mensaje = "Se ha actualizado el registro de producto de forma exitrosa";
                      
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
                                  _this.router.navigate( ['/producto/']);
              
              
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
    else if (this.productoEncontrado && this.accionGet === "eliminar") {
      
      
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
                  
                  

                  let dtoEliminarProducto = _this.getDTOCambioEstadoEliminarProducto("eliminar");
                  // console.log("Datos A enviar: " + dtoEliminarProducto);
                  _this.productoServicio.cambiarEstado( dtoEliminarProducto )
                  .then( (response) => {
                    console.log("Cambio de Estado a Eliminado, respuesta: ", response);
            
                    const titulo = "Éxito";
                    const mensaje = "Se ha eliminado el registro de producto de forma exitosa";
                    
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
                                _this.router.navigate( ['/producto/']);
            
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
    else if (this.productoEncontrado && this.accionGet === "estado") {

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
                  
                  

                  let dtoCambioEstado = _this.getDTOCambioEstadoEliminarProducto("cambioestado");
                  // console.log("Datos A enviar: " + dtoCambioEstado);
                  _this.productoServicio.cambiarEstado( dtoCambioEstado )
                  .then( (response) => {
                    console.log("Cambio de Estado a Eliminado, respuesta: ", response);
            
                    const titulo = "Éxito";
                    const mensaje = "Se ha cambiado el estado del registro de producto de forma exitosa";
                    
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
                                _this.router.navigate( ['/producto/']);
            
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
                  
                  

                  let dtoCrearProducto = _this.getDTOCrearProducto();
                  console.log("----------------------------- :", dtoCrearProducto)
                  _this.productoServicio.crearProducto( dtoCrearProducto )
                  .then( (response) => {
                    
                    if (response.tipo !== 2) { //TODO CORRECTO

                      console.log("Creado, Respuesta: ", response);
                    
                      const titulo = "Éxito";
                      const mensaje = "Se ha Creado un nuevo registro de producto de forma exitosa";
                    
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
                                    content: "¿Desea Cargar la imagen del nuevo Producto?",
                                    type: 'blue',
                                    typeAnimated: true,
                                    theme: 'material',
                                    buttons: {
                                        aceptar: {
                                            text: 'Aceptar',
                                            btnClass: 'btn-blue',
                                            action: function(){

                                              let idProductoCreado = response.id;
                                              _this.goUploadImagen(idProductoCreado);

                                            }
                                        },
                                        cerrar: {
                                          text: 'Cerrar',
                                          action: function(){
                                             //ACCION
                                            _this.router.navigate( ['/producto/']);
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
