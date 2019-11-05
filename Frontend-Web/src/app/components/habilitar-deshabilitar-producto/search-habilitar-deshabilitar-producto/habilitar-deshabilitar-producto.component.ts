import * as $ from 'jquery'
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { UploadService } from 'src/app/services/upload/upload.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-habilitar-deshabilitar-producto',
  templateUrl: './habilitar-deshabilitar-producto.component.html',
  styleUrls: ['./habilitar-deshabilitar-producto.component.scss']
})
export class HabilitarDeshabilitarProductoComponent implements OnInit {

  public listaProductos: any [] = [];
  public listaProductosProvisoria: any []=[];

  tipoElemento = "producto";

  public rutaImagen = `${environment.urlNgrok || environment.url}/traerImagen/${this.tipoElemento}/`;

  constructor(
    public productoService: ProductoService,
    private router: Router,
    public uploadService: UploadService
    ) { }

  ngOnInit() {
    this.getAllElements();
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
          this.listaProductosProvisoria =  data;
        this.listaProductos=[];
        var length = this.listaProductosProvisoria.length;
        
for (let i = 0; i <= length; i++) {
let producto = this.listaProductosProvisoria[i];
  if(producto.productoestados[0].estadoproducto.idEstadoProducto == 1 || producto.productoestados[0].estadoproducto.idEstadoProducto == 2 ){
    this.listaProductos.push(producto)
  }
}

          // this.listaProductos.push(data); // Para insertar un solo elemento
        }
        else {
          this.listaProductos = [];
        }
      });
    }
    else {
      this.getAllElements();
    }
  }

  getAllElements() {
    let _this =this;
    this.productoService.getAllProductos()
      .then((res: any) => {
        console.log("getAllElements", res.data);
        this.listaProductosProvisoria =  res.data;
        this.listaProductos=[];
        var length = this.listaProductosProvisoria.length;
        
for (let i = 0; i <= length; i++) {
let producto = this.listaProductosProvisoria[i];
  if(producto.productoestados[0].estadoproducto.idEstadoProducto == 1 || producto.productoestados[0].estadoproducto.idEstadoProducto == 2 ){
    this.listaProductos.push(producto)
  }
}
      })
  }

  consultarElemento(idElemento: number) {
    console.log("idElemento: ", idElemento);

    this.router.navigate( [`/crud_habilitar_deshabilitar_producto/${idElemento}`] );
  }

}
