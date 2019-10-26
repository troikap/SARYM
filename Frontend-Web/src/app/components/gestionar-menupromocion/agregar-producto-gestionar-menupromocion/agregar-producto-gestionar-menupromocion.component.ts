import * as $ from 'jquery'
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
  public listaProductos: any [] = [];

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
          this.listaProductos = data;

          // this.listaProductos.push(data); // Para insertar un solo elemento
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
        this.listaProductos =  res.data;
      })
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

  seleccionarProducto(producto: Producto, menuPromocion: MenuPromocion) {
    console.log("Agregar Producto", producto);
    console.log("Agregar menuPromocio", menuPromocion);
    
    let cantidadProductoStr = prompt("Ingrese Cantidad de Producto", "1");
    let cantidadProducto = 0;

    if (!/^([0-9])*$/.test(cantidadProductoStr)) {
      alert("Ingrese solo numeros, mayores a cero");
    }
    else {
      cantidadProducto = parseInt(cantidadProductoStr, 10);
    }
    
    console.log("cantidad",cantidadProducto);

    let dtoProductoEliminar = this.getDTOProductoEliminar(producto, menuPromocion);
    let dtoProductoCrear = this.getDTOProductoCrear(producto, menuPromocion, cantidadProducto);

    console.log("dtoProductoEliminar: ", dtoProductoEliminar);
    console.log("dtoProductoCrear: ", dtoProductoCrear);

    this.menupromocionService.editarProductoMenuPromocion(dtoProductoEliminar) // Eliminar Asociación Procucto
      .then((res: any) => {
        console.log("Respuesta de eliminar Producto: ", res);

        this.menupromocionService.editarProductoMenuPromocion(dtoProductoCrear) // Crear Asociación Procucto
        .then((res: any) => {
          console.log("Respuesta de Crear Producto: ", res);

        });

        
      });
   

      


    

    
  }

}
