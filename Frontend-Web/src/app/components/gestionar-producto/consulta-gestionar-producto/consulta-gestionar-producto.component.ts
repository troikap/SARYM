import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/model/producto/producto.model';

@Component({
  selector: 'app-consulta-gestionar-producto',
  templateUrl: './consulta-gestionar-producto.component.html',
  styleUrls: ['./consulta-gestionar-producto.component.scss']
})
export class ConsultaGestionarProductoComponent implements OnInit {

  producto: Producto;
  estadoProducto: string;
  // 
  url = "http://localhost:3000/traerImagen/producto/"; // hay que sumarle el path de imagen ...
  urlAlternativo = "http://localhost:3000/traerImagen/producto/BBBBBBBBB-2-9.jpeg"; // este es de prueban .. en /upload agregar una imagen con ID 1 y en carpeta producto y tomer el nombre y ponerlo remplazando BB .... jpeg

  constructor(
    public productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    
  ) {
    this.activatedRoute.params.subscribe(params => {
      // console.log("Parámetro de entrada: ", params.id);
      this.productoService.getProducto(params.id)
        .then((res: Producto) => {
          console.log("Datos del Producto obtenido: ", res);
          this.producto = res;
          this.estadoProducto = res['productoestados'][0].estadoproducto.nombreEstadoProducto;
          console.log("Estado Producto: ", this.estadoProducto);
        });

      });
   }

  ngOnInit() {
  }

  generarAccion(accion: string) {
    console.log("accion: ", accion);
    this.router.navigate( [`/producto_crud/${this.producto.idProducto}/${accion}`] );
  }

}
