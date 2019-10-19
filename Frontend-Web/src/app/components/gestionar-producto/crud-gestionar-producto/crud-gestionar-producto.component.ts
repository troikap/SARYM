import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, ValidationErrors} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/model/producto/producto.model';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { UnidadMedidaService } from '../../../services/unidad-medida/unidad-medida.service';
import { TipoMonedaService } from '../../../services/tipo-moneda/tipo-moneda.service';
import { RubroService } from '../../../services/rubro/rubro.service';
import { UnidadMedida } from 'src/app/model/unidad-medida/unidad-medida.model';
import { TipoMoneda } from '../../../model/tipo-moneda/tipo-moneda.model';
import { Rubro } from 'src/app/model/rubro/rubro.model';

@Component({
  selector: 'app-crud-gestionar-producto',
  templateUrl: './crud-gestionar-producto.component.html',
  styleUrls: ['./crud-gestionar-producto.component.scss']
})
export class CrudGestionarProductoComponent implements OnInit {
  private form: FormGroup;
  private producto: Producto;
  private idProducto: number;
  private newForm = {};

  productoEncontrado: boolean;
  unidadMedida: UnidadMedida;
  tipoMoneda: TipoMoneda;
  rubros: Rubro;
  estadoProducto: any;
  

  accionGet: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productoServicio: ProductoService,
    private unidadMedidaService: UnidadMedidaService,
    private tipoMonedaService: TipoMonedaService,
    private rubroService: RubroService
  ) {
    this.form = new FormGroup({
      'idProducto': new FormControl({value: '', disabled: true}),
      'codProducto': new FormControl('', Validators.required),
      'nombreProducto': new FormControl('', Validators.required),
      'idUnidadMedida': new FormControl('', Validators.required),
      'cantidadMedida': new FormControl('', Validators.required),
      'descripcionProducto': new FormControl('', Validators.required),
      'importePrecioProducto': new FormControl('', Validators.required),
      'idTipoMoneda': new FormControl('',  Validators.required),
      'idRubro': new FormControl('',  Validators.required),
      'idEstadoProducto': new FormControl('', Validators.required),
      'imgProducto': new FormControl('')
    });

    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);
      this.accionGet  = params.accion;
      this.idProducto = params.id;
      if (this.accionGet !== "crear") {
        this.productoEncontrado = true;
        this.traerProducto();
      }
      else {
        this.productoEncontrado = false;
      }
    });

   }

  ngOnInit() {
    this.getUnidadMedida();
    this.getTipoMoneda();
    this.getRubro();
    this.getEstadoProducto();
  }

  traerProducto() {
    console.log("Funcion 'traerProducto()', ejecutada");
    console.log("Productos Obtenidos: ", this.idProducto);

    if (this.idProducto !== 0) {
      this.productoServicio.getProducto(this.idProducto)
      .then((res) => {
        console.log("Producto obtenido: ", res)
        if ( res['tipo'] == 2) {
          console.log("Raro");
        } else {
          this.producto = res;
          this.newForm = {
            idProducto: this.producto.idProducto,
            codProducto:  this.producto.codProducto,
            nombreProducto:  this.producto.nombreProducto,
            idUnidadMedida:  this.producto.unidadmedida.idUnidadMedida,
            cantidadMedida:  this.producto.cantidadMedida,
            descripcionProducto:  this.producto.descripcionProducto,
            importePrecioProducto:  this.producto.precioproductos[0].importePrecioProducto,
            idTipoMoneda:  this.producto.precioproductos[0].tipomoneda.idTipoMoneda,
            idRubro: this.producto.rubro.idRubro,
            idEstadoProducto: this.producto.productoestados[0].estadoproducto.idEstadoProducto,
            imgProducto: this.producto.pathImagenProducto
          }
          this.form.setValue(this.newForm)
          console.log("Formulario nuevo: " , this.form);
        }
      });
    }
  }
  getUnidadMedida() {
    this.unidadMedidaService.getAllUnidadMedida()
    .then((res: any) => {
      console.log("Unidad de Medida: ", res.data);
      this.unidadMedida = res.data;
    })
  }
  getTipoMoneda() {
    this.tipoMonedaService.getAllTipoMoneda()
    .then((res: any) => {
      console.log("Tipo de Moneda: ", res.data);
      this.tipoMoneda = res.data;
    })
  }
  getRubro() {
    this.rubroService.getAllRubro()
    .then((res: any) => {
      console.log("Rubros: ", res.data);
      this.rubros = res.data;
    })
  }
  getEstadoProducto() {
    this.productoServicio.getAllEstadoProducto()
    .then((res: any) => {
      console.log("Estado Productos: ", res.data);
      this.estadoProducto = res.data;
    })
  }

  guardar() {
    // console.log("Form Value: ", this.form.value);
    // console.log("Form: ", this.form);

    
  }

}
