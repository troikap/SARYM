import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { UploadService } from 'src/app/services/upload/upload.service';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery'

@Component({
  selector: "app-gestionar-producto",
  templateUrl: "./gestionar-producto.component.html",
  styleUrls: ["./gestionar-producto.component.scss"]
})
export class GestionarProductoComponent implements OnInit {
  public listaProductos: any[] = [];

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
        // Llamo a un Observer
        if (data != null) {
          this.listaProductos = data;
        } else {
          this.listaProductos = [];
        }
      });
    } else {
      this.getAllElements();
    }
  }

  getAllElements() {
    this.productoService.getAllProductos().then((res: any) => {
      this.listaProductos = res.data;
    });
  }

  consultarElemento(idElemento: number) {
    this.router.navigate([`/producto_consulta/${idElemento}`]);
  }

  crearProducto() {
    this.router.navigate(["/producto_crud/0/crear"]);
  }
}
