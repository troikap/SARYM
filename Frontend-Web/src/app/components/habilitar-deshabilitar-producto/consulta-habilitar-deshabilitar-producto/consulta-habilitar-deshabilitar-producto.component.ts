import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/model/producto/producto.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-consulta-habilitar-deshabilitar-producto',
  templateUrl: './consulta-habilitar-deshabilitar-producto.component.html',
  styleUrls: ['./consulta-habilitar-deshabilitar-producto.component.scss']
})
export class ConsultaHabilitarDeshabilitarProductoComponent implements OnInit {

  producto: Producto;
  estadoProducto: string;  

  tipoElemento = "producto";

  public rutaImagen = `${environment.urlNgrok || environment.url}/traerImagen/${this.tipoElemento}/`;

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
    this.router.navigate( [`/crud_habilitar_deshabilitar_producto/${this.producto.idProducto}/${accion}`] );
  }

}
