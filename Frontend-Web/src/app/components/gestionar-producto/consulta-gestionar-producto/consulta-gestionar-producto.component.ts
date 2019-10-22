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
