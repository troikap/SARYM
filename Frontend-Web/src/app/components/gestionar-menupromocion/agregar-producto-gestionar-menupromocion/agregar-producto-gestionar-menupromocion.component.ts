import { Component, OnInit } from '@angular/core';
import { MenuPromocionService } from 'src/app/services/menu-promocion/menu-promocion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuPromocion } from 'src/app/model/menu-promocion/menu-promocion.model';
import { environment } from 'src/environments/environment';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { Producto } from 'src/app/model/producto/producto.model';
// import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-agregar-producto-gestionar-menupromocion',
  templateUrl: './agregar-producto-gestionar-menupromocion.component.html',
  styleUrls: ['./agregar-producto-gestionar-menupromocion.component.scss']
})
export class AgregarProductoGestionarMenupromocionComponent implements OnInit {
  public listaProductosAux: Producto [] = [];
  public listaProductos: Producto [] = [];

  menuPromocion: MenuPromocion;

  private tipoElementoProducto = "producto";
  private tipoElementoMenuPromocion = "menupromocion";

  public rutaImagenProducto = `${environment.urlNgrok || environment.url}/traerImagen/${this.tipoElementoProducto}/`;
  public rutaImagenMenuPromocion = `${environment.urlNgrok || environment.url}/traerImagen/${this.tipoElementoMenuPromocion}/`;
  
  constructor(
    public menupromocionService: MenuPromocionService,
    public productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    
    this.activatedRoute.params.subscribe(params => {
      // console.log("Parámetro de entrada: ", params.id);
      this.menupromocionService.getMenuPromocion(params.id)
        .then((res: MenuPromocion) => {
          console.log("Datos del MenuPromocion obtenido: ", res);
          this.menuPromocion = res;
        });

      });
   }

  ngOnInit() {
    this.getAllProductosDisponibles();
    this.cargarOnFocus();
  }

  cargarOnFocus() {
    $("#botonBuscar").focus();
  }

  buscarElemento(termino: string) {
    
    console.log(termino);

    if (termino.trim() !== "") {
      this.productoService.getProductosByAll(termino)
      .subscribe((data: any) => { // Llamo a un Observer
        console.log(data);
        if (data != null) {
          console.log("RESULT ----------------->", data);
          this.listaProductosAux = data;
          this.eliminarProductosYaAgregados();
        }
        else {
          this.listaProductos = [];
        }
      });
    }
    else {
      this.getAllProductosDisponibles();
    }
  }

  getAllProductosDisponibles() {
    this.productoService.getAllProductos()
      .then((res: any) => {
        console.log("getAllProductosDisponibles", res.data);
        this.listaProductosAux = res.data;
        this.eliminarProductosYaAgregados();
      })
  }

  eliminarProductosYaAgregados() {
    this.listaProductos = [];

    let idProducto = 0;
    let idProductoDetalleMenuPromocion = 0;

    let insertar = true;
    
    console.log("Lista actual de Productos Asiciados:", this.menuPromocion.detallemenupromocionproductos);
    console.log("Lista actual de Productos Disponibles:", this.listaProductosAux);

    for (let i = 0; i < this.listaProductosAux.length; i ++) {
      idProducto = this.listaProductosAux[i].idProducto;
      for (let j = 0; j < this.menuPromocion.detallemenupromocionproductos.length; j ++) {
        idProductoDetalleMenuPromocion = this.menuPromocion.detallemenupromocionproductos[j].producto.idProducto;
        if (idProducto == idProductoDetalleMenuPromocion) {
          insertar = false;
        }
        idProductoDetalleMenuPromocion = 0;
      }

      if (insertar) {
        this.listaProductos.push(this.listaProductosAux[i]);
      }

      insertar = true;
      idProducto = 0;
    }
    console.log("Lista actualizada de Productos Disponibles:", this.listaProductos);
  }

  getDTOProductoCrear(producto: Producto, menuPromocion: MenuPromocion, cantidadProducto: number) {
    console.log("Funcion 'getDTOProductoEditar()', ejecutada");
    
    let idMenuPromocionAux = menuPromocion.idMenuPromocion;
    let idProducto = producto.idProducto;

    let dtoProductoCrear: any = {
      idMenuPromocion: idMenuPromocionAux,
      detalle: [{
        idProducto: idProducto,
        cantidadProductoMenuPromocion: cantidadProducto
      }]
    }
    return dtoProductoCrear;
  }

  getDTOProductoEliminar(producto: Producto, menuPromocion: MenuPromocion) {
    console.log("Funcion 'getDTOProductoEliminar()', ejecutada");

    let idMenuPromocionAux = menuPromocion.idMenuPromocion;
    let idProducto = producto.idProducto;
    let detalleMenuPromocionProducto = menuPromocion.detallemenupromocionproductos;

    let idDetalleMenuPromocionProductoAux = 0;
    let idProductoDetalle: number = 0;

    for (let i = 0; i < detalleMenuPromocionProducto.length; i ++) {
      idProductoDetalle = detalleMenuPromocionProducto[i].producto.idProducto;
      if (idProducto == idProductoDetalle) {
        idDetalleMenuPromocionProductoAux = detalleMenuPromocionProducto[i].idDetalleMenuPromocionProducto;
      }
    }

    console.log("idMenuPromocion: ", idMenuPromocionAux);
    console.log("idDetalleMenuPromocionProducto encontrado: ", idDetalleMenuPromocionProductoAux);

    let dtoProductoEliminar: any = {
      idMenuPromocion: idMenuPromocionAux,
      detalle: [{
        idDetalleMenuPromocionProducto: idDetalleMenuPromocionProductoAux,
        baja: true
      }]
    }
    return dtoProductoEliminar;
  }

  seleccionarProducto(producto: Producto, menuPromocion: MenuPromocion, accion: string) {
    console.log("producto", producto);
    console.log("menuPromocio", menuPromocion);

    let _this = this;
    
    if (accion == "agregar" || accion == "editar") {
      
      let cantidadProductoStr: string;

      ($ as any).confirm({
        title: "Ingreso de datos",
        content: '' +
        '<form action="" class="formName">' +
        '<div class="form-group">' +
        '<label>Ingrese la cantidad de producto</label>' +
        '<input type="text" placeholder="Cantidad" class="cantidadProductoStr form-control" required />' +
        '</div>' +
        '</form>',
        buttons: {
            formSubmit: {
                text: 'Aceptar',
                btnClass: 'btn-blue',
                action: function () {
                    cantidadProductoStr = this.$content.find('.cantidadProductoStr').val();

                    if(cantidadProductoStr) { // Si ingresó datos
                      
                      let cantidadProducto = 0;
  
                      if (!/^([1-9])*$/.test(cantidadProductoStr)) {
                        ($ as any).alert('Ingrese solo numeros, mayores a cero');
                        return false;
                      }
                      else {
                        cantidadProducto = parseInt(cantidadProductoStr, 10);
                      }
                  
                      console.log("cantidad",cantidadProducto);
            
                      let dtoProductoCrear = _this.getDTOProductoCrear(producto, menuPromocion, cantidadProducto);
            
                      if (accion == "agregar") {
                        console.log("dtoProductoCrear: ", dtoProductoCrear);
            
                        _this.menupromocionService.editarProductoMenuPromocion(dtoProductoCrear) // Crear Asociación Procucto
                          .then((res: any) => {
                            
                            console.log("Respuesta de Crear Producto: ", res);
                            ($ as any).confirm({
                              title: "Éxito",
                              content: "Se ha agregado el producto exitosamente",
                              type: 'green',
                              typeAnimated: true,
                              theme: 'material',
                              buttons: {
                                  aceptar: {
                                      text: 'Aceptar',
                                      btnClass: 'btn-green',
                                      action: function(){
                                        //Recargar página
                                        location.reload();
                                        
                                      }
                                  }
                              }
                            });
                  
                          });
                        }
                        else { // Editar
                          let dtoProductoEliminar = _this.getDTOProductoEliminar(producto, menuPromocion);
              
                          console.log("dtoProductoEliminar: ", dtoProductoEliminar);
                          console.log("dtoProductoCrear: ", dtoProductoCrear);
                
                          _this.menupromocionService.editarProductoMenuPromocion(dtoProductoEliminar) // Eliminar Asociación Procucto
                          .then((res: any) => {
                            console.log("Respuesta de eliminar Producto: ", res);
                    
                            _this.menupromocionService.editarProductoMenuPromocion(dtoProductoCrear) // Crear Asociación Procucto
                            .then((res: any) => {
                              console.log("Respuesta de Crear Producto: ", res);
                              
                              ($ as any).confirm({
                                title: "Éxito",
                                content: "Se ha editado la cantidad de producto exitosamente",
                                type: 'green',
                                typeAnimated: true,
                                theme: 'material',
                                buttons: {
                                    aceptar: {
                                        text: 'Aceptar',
                                        btnClass: 'btn-green',
                                        action: function(){
                                          
                                          //Recargar página
                                          location.reload();
              
                                        }
                                    }
                                }
                              });
                      
              
                            });
                    
                            
                          });
                        }
                    }
                    else { //No se ingresan valores
                      ($ as any).confirm({
                        title: "Error",
                        content: "No ha ingresado datos de la cantidad de producto. Imposible realizar esta acción",
                        type: 'red',
                        typeAnimated: true,
                        theme: 'material',
                        buttons: {
                            aceptar: {
                                text: 'Aceptar',
                                btnClass: 'btn-red',
                                action: function(){
                                  console.log("Confirmación de mensaje de error");
                                }
                            }
                        }
                      });
                    }
                }
            },
            cancelar: function () {
                console.log("Cancelado por el usuario");
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
    else { // Eliminar

      ($ as any).confirm({
        title: "Alerta",
        content: "¿Desea desasociar el producto seleccionado?",
        type: 'orange',
        typeAnimated: true,
        theme: 'material',
        buttons: {
            aceptar: {
                text: 'Aceptar',
                btnClass: 'btn-orange',
                action: function(){
                  
                  let dtoProductoEliminar = _this.getDTOProductoEliminar(producto, menuPromocion);
                  console.log("dtoProductoEliminar: ", dtoProductoEliminar);
                  _this.menupromocionService.editarProductoMenuPromocion(dtoProductoEliminar) // Eliminar Asociación Procucto
                  .then((res: any) => {
                    console.log("Respuesta de eliminar Producto: ", res);
                    
                    ($ as any).confirm({
                      title: "Éxito al desasociar",
                      content: "Se ha desasociado el producto exitosamente",
                      type: 'green',
                      typeAnimated: true,
                      theme: 'material',
                      buttons: {
                          aceptar: {
                              text: 'Aceptar',
                              btnClass: 'btn-green',
                              action: function(){
                                
                                //Recargar página
                                location.reload();


                              }
                          }
                      }
                    });
                    


                  });
                }
            },
            cerrar: {
              text: 'Cerrar',
              action: function(){
                console.log("Cancelación de eliminación de producto.");
              }
          }
        }
      });
    }
    
  }

}
