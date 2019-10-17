import * as $ from 'jquery'
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-gestionar-producto',
  templateUrl: './gestionar-producto.component.html',
  styleUrls: ['./gestionar-producto.component.scss']
})
export class GestionarProductoComponent implements OnInit {

  listaProductos: any [] = [];

  constructor(
    public productoService: ProductoService,
    private router: Router
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
          this.listaProductos = data;

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
    this.productoService.getAllProductos()
      .then((res: any) => {
        console.log(res.Producto);
        this.listaProductos =  res.Producto;
      })
  }

  consultarElemento(idElemento: number) {
    console.log("idElemento: ", idElemento);

    this.router.navigate( [`/producto_consulta/${idElemento}`] );
  }

}
