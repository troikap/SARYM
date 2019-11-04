import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, ValidationErrors} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/model/producto/producto.model';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { MenuPromocionService } from 'src/app/services/menu-promocion/menu-promocion.service';
import { UnidadMedidaService } from '../../../services/unidad-medida/unidad-medida.service';
import { TipoMonedaService } from '../../../services/tipo-moneda/tipo-moneda.service';
import { RubroService } from '../../../services/rubro/rubro.service';
import { UnidadMedida } from 'src/app/model/unidad-medida/unidad-medida.model';
import { TipoMoneda } from '../../../model/tipo-moneda/tipo-moneda.model';
import { Rubro } from 'src/app/model/rubro/rubro.model';
import { UploadComponent } from 'src/app/upload/upload.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crud-habilitar-deshabilitar-producto',
  templateUrl: './crud-habilitar-deshabilitar-producto.component.html',
  styleUrls: ['./crud-habilitar-deshabilitar-producto.component.scss']
})
export class CrudHabilitarDeshabilitarProductoComponent implements OnInit {
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
    private menuPromocionServicio: MenuPromocionService,
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
      'nombreEstadoProducto': new FormControl(''),
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
            nombreEstadoProducto: this.producto.productoestados[0].estadoproducto.nombreEstadoProducto,
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
      this.estadoProducto.splice(3,1);
      this.estadoProducto.splice(2,1);
      
    
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

  getDTOCambioEstadoEliminarProducto() {
    

    let prod = this.producto.idProducto;
    
    let dtoEditarProducto: any = {
      idProducto: prod
      
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
    const mensaje = `¿Está seguro que desea habilitar/deshabilitar el elemento seleccionado?`;

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
                  
                  

                  let dtoCambioEstado = _this.getDTOCambioEstadoEliminarProducto();
                  // console.log("Datos A enviar: " + dtoCambioEstado);
                  _this.productoServicio.habilitarDeshabilitarProducto( dtoCambioEstado )
                  .then( (response) => {
                    console.log("Cambio de Estado, respuesta: ", response);
            
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
                                _this.menuPromocionServicio.habilitarDeshabilitarMenuPromocion()
                                .then( (response) => {
                                  console.log("Actualizacion de Menu-Promociones, respuesta: ", response);
                          
                                  const titulo = "Éxito";
                                  const mensaje = "Se han actualizado los menu-promocion de forma exitosa";
                                  
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
                                              _this.router.navigate( ['/habilitar-deshabilitar-producto/']);
                          
                                            }
                                        }
                                    }
                                  });
                          
                                })


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

}
