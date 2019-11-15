import * as $ from 'jquery'
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { UploadService } from 'src/app/services/upload/upload.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-habilitar-deshabilitar-producto",
  templateUrl: "./habilitar-deshabilitar-producto.component.html",
  styleUrls: ["./habilitar-deshabilitar-producto.component.scss"]
})
export class HabilitarDeshabilitarProductoComponent implements OnInit {
  public listaProductos: any[] = [];
  public listaProductosProvisoria: any[] = [];

  tipoElemento = "producto";

  public rutaImagen = `${environment.urlNgrok || environment.url}/traerImagen/${
    this.tipoElemento
  }/`;

  constructor(
    public productoService: ProductoService,
    private router: Router,
    public uploadService: UploadService
  ) {}

  ngOnInit() {
    this.getAllElements();
    this.cargarOnFocus();
  }

  cargarOnFocus() {
    $("#botonBuscar").focus();
  }

  buscarElemento(termino: string) {
    if (termino.trim() !== "") {
      this.productoService.getProductosByAll(termino).subscribe((data: any) => {
        if (data != null) {
          this.listaProductosProvisoria = data;
          this.listaProductos = [];
          var length = this.listaProductosProvisoria.length;

          for (let i = 0; i < length; i++) {
            let producto = this.listaProductosProvisoria[i];
            if (
              producto.productoestados[0].estadoproducto.idEstadoProducto == 1 || producto.productoestados[0].estadoproducto.idEstadoProducto == 2 ) {
              this.listaProductos.push(producto);
            }
          }
        } else {
          this.listaProductos = [];
        }
      });
    } else {
      this.getAllElements();
    }
  }

  getAllElements() {
    let _this = this;
    this.productoService.getAllProductos().then((res: any) => {
      this.listaProductosProvisoria = res.data;
      this.listaProductos = [];
      var length = this.listaProductosProvisoria.length;
      for (let i = 0; i < length; i++) {
        let producto = this.listaProductosProvisoria[i];
        if (
          producto.productoestados[0].estadoproducto.idEstadoProducto == 1 ||producto.productoestados[0].estadoproducto.idEstadoProducto == 2
        ) {
          this.listaProductos.push(producto);
        }
      }
    });
  }

  consultarElemento(idElemento: number) {
    this.router.navigate([`/crud_habilitar_deshabilitar_producto/${idElemento}`]);
  }
}
