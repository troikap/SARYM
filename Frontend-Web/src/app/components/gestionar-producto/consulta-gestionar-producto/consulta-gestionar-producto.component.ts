import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/model/producto/producto.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-consulta-gestionar-producto",
  templateUrl: "./consulta-gestionar-producto.component.html",
  styleUrls: ["./consulta-gestionar-producto.component.scss"]
})
export class ConsultaGestionarProductoComponent implements OnInit {
  producto: Producto;
  estadoProducto: string;

  tipoElemento = "producto";

  public rutaImagen = `${environment.urlNgrok || environment.url}/traerImagen/${this.tipoElemento}/`;

  constructor(
    public productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.productoService.getProducto(params.id).then((res: Producto) => {
        this.producto = res;
        this.estadoProducto =
          res["productoestados"][0].estadoproducto.nombreEstadoProducto;
      });
    });
  }

  ngOnInit() {}

  generarAccion(accion: string) {
    this.router.navigate([
      `/producto_crud/${this.producto.idProducto}/${accion}`
    ]);
  }
}
