import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, ValidationErrors} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoMonedaService } from '../../../services/tipo-moneda/tipo-moneda.service';
import { TipoMoneda } from '../../../model/tipo-moneda/tipo-moneda.model';
import { MenuPromocionService } from '../../../services/menu-promocion/menu-promocion.service';
import { MenuPromocion } from 'src/app/model/menu-promocion/menu-promocion.model';
import { TipoMenuPromocion } from '../../../model/tipo-menu-promocion/tipo-menu-promocion.model';
import { TipoMenuPromocionService } from '../../../services/tipo-menu-promocion/tipo-menu-promocion.service';
import { EstadoMenuPromocion } from 'src/app/model/estado-menu-promocion/estado-menu-promocion.model';

@Component({
  selector: 'app-crud-gestionar-menupromocion',
  templateUrl: './crud-gestionar-menupromocion.component.html',
  styleUrls: ['./crud-gestionar-menupromocion.component.scss']
})
export class CrudGestionarMenupromocionComponent implements OnInit {
  
  private form: FormGroup;
  private idMenuPromocion: number;
  private newForm = {};

  menuPromocionEncontrado: boolean;
  tipoMoneda: TipoMoneda;
  tipoMenuPromocion: TipoMenuPromocion;
  estadoMenuPromocion: EstadoMenuPromocion;
  menuPromocion: MenuPromocion;
  

  accionGet: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tipoMonedaService: TipoMonedaService,
    private tipoMenuPromocionSercice: TipoMenuPromocionService,
    private menuPromocionServicio: MenuPromocionService
  ) { 
    this.form = new FormGroup({
      'idMenuPromocion': new FormControl({value: '', disabled: true}),
      'codMenuPromocion': new FormControl('', Validators.required),
      'nombreMenuPromocion': new FormControl('', Validators.required),
      'descripcionMenuPromocion': new FormControl('', Validators.required),
      'idTipoMenuPromocion':  new FormControl('', Validators.required),
      'importePrecioMenuPromocion': new FormControl('', Validators.required),
      'idTipoMoneda': new FormControl('',  Validators.required),
      'idEstadoMenuPromocion': new FormControl(''),
      'imgMenuPromocion': new FormControl(''),
      'descripcionCambioEstado': new FormControl('')
    });

    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);
      this.accionGet  = params.accion;
      this.idMenuPromocion = params.id;
      if (this.accionGet !== "crear") {
        this.menuPromocionEncontrado = true;
        this.traerMenuPromocion();
      }
      else {
        this.menuPromocionEncontrado = false;
      }

      if (this.accionGet !== "estado" && this.accionGet !== "crear") {
        this.form.get('idEstadoMenuPromocion').setValidators(Validators.required);
        this.form.get('idEstadoMenuPromocion').updateValueAndValidity();
      }

    });

  }

  ngOnInit() {
    this.getTipoMoneda();
    this.getTipoMenuPromocion();
    this.getEstadoMenuPrmocion();
  }

  traerMenuPromocion() {
    console.log("Funcion 'traerMenuPromocion()', ejecutada");
    console.log("MenuPromocions Obtenidos: ", this.idMenuPromocion);

    if (this.idMenuPromocion !== 0) {
      this.menuPromocionServicio.getMenuPromocion(this.idMenuPromocion)
      .then((res) => {
        console.log("MenuPromocion obtenido: ", res)
        if ( res['tipo'] == 2) {
          console.log("Raro");
        } else {
          this.menuPromocion = res;
          this.newForm = {
            idMenuPromocion: this.menuPromocion.idMenuPromocion,
            codMenuPromocion:  this.menuPromocion.codMenuPromocion,
            nombreMenuPromocion:  this.menuPromocion.nombreMenuPromocion,
            descripcionMenuPromocion:  this.menuPromocion.descripcionMenuPromocion,
            idTipoMenuPromocion:  this.menuPromocion.tipomenupromocion.idTipoMenuPromocion,
            importePrecioMenuPromocion:  this.menuPromocion.preciomenupromocions[0].importePrecioMenuPromocion,
            idTipoMoneda:  this.menuPromocion.preciomenupromocions[0].tipomoneda.idTipoMoneda,
            idEstadoMenuPromocion: this.menuPromocion.menupromocionestados[0].estadomenupromocion.idEstadoMenuPromocion,
            imgMenuPromocion: this.menuPromocion.pathImagenMenuPromocion,
            descripcionCambioEstado: ''
          }
          this.form.setValue(this.newForm)
          console.log("Formulario nuevo: " , this.form);

        }
      });
    }
  }

  getTipoMoneda() {
    this.tipoMonedaService.getAllTipoMoneda()
    .then((res: any) => {
      console.log("Tipo de Moneda: ", res.data);
      this.tipoMoneda = res.data;
    })
  }

  getTipoMenuPromocion() {
    this.tipoMenuPromocionSercice.getAllTipoMenuPromocion()
    .then((res: any) => {
      console.log("Tipo Menú Prmoción: ", res.data);
      this.tipoMenuPromocion = res.data as TipoMenuPromocion;
    })
  }

  getEstadoMenuPrmocion() {
    this.tipoMenuPromocionSercice.getAllEstadoMenuPromocion()
    .then((res: any) => {
      console.log("Estado Productos: ", res.data);
      this.estadoMenuPromocion = res.data as EstadoMenuPromocion;
    })
  }

  agregarProductos() {
    this.router.navigate( [`/menupromocion_agregarproducto/${this.menuPromocion.idMenuPromocion}`] );
  }

}
