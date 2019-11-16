import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, ValidationErrors} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CajaService } from '../../../services/caja/caja.service';
import { UsuarioService } from '../../../services/usuario/usuario.service';

@Component({
  selector: "app-generar-movimiento-caja-usuario",
  templateUrl: "./crud-generar-movimiento-caja.component.html",
  styleUrls: ["./crud-generar-movimiento-caja.component.scss"]
})
export class CrudGenerarMovimientoCajaComponent implements OnInit {
  form: FormGroup;
  cajaEncontrada: boolean;
  idCaja: string = "";
  caja: any;
  tipoMovimientoCaja: any[];
  newForm = {};
  newDate = new Date();
  montoCierreCaja: any;
  idEstadoform: any;
  listaMovimientoCaja: any[];
  fechaYHoraCajaEstado: Date;
  private ingresos: number = 0;
  private egresos: number = 0;
  private total: number = 0;
  private montoDeAperturaAnterior: number = 0;

  accionGet;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private cajaServicio: CajaService,
    private usuarioservicio: UsuarioService
  ) {
    this.form = new FormGroup({
      idTipoMovimientoCaja: new FormControl("", Validators.required),
      montoMovimientoCaja: new FormControl("", [
        Validators.required,
        Validators.pattern(/^([0-9]+([.][0-9]{1,2})|[0-9]+)$/)
      ]),
      descripcionMovimientoCaja: new FormControl("", Validators.required)
    });
    this.activatedRoute.params.subscribe(params => {
      this.accionGet = params.accion;
      this.idCaja = params.id;
    });
  }

  ngOnInit() {
    this.traerTipoMovimientoCaja();
  }

  traerCaja() {
    if (this.idCaja !== "0" && this.idCaja !== "") {
      this.cajaServicio.getCaja(this.idCaja).subscribe((data: any) => {
        // Llamo a un Observer
        if (data != null) {
          this.caja = data;
          this.newForm = {
            nroCaja: this.caja["nroCaja"],
            idUsuario: 1
          };
          this.form.setValue(this.newForm);
        }
      });
    }
  }

  reemplazarCaja(): any {
    let us = null;
    if (this.caja && this.caja.idCaja) {
      us = this.caja.idCaja;
    }
    let rempCaja: any = {
      idCaja: this.idCaja,
      idUsuario: localStorage.getItem("idUsuario"),
      idTipoMovimientoCaja: this.form.value["idTipoMovimientoCaja"],
      fechaYHoraMovimientoCaja: null,
      montoMovimientoCaja: this.form.value["montoMovimientoCaja"],
      descripcionMovimientoCaja: this.form.value["descripcionMovimientoCaja"]
    };
    return rempCaja;
  }

  guardar() {
    //Variables para mensajes//
    let _this = this; //Asigno el contexto a una variable, ya que se pierde al ingresar a la función de mensajeria
    const titulo = "Confirmación";
    const mensaje = `¿Está seguro que desea crear el elemento seleccionado?`;
    if (this.idCaja !== "") {
      this.cajaServicio.getCaja(this.idCaja).subscribe((data: any) => {
        // Llamo a un Observer
        if (data != "") {
          this.caja = data;
          this.listaMovimientoCaja = this.caja.movimientocajas;
          this.fechaYHoraCajaEstado = this.caja[
            "cajaestados"
          ][0].fechaYHoraAltaCajaEstado;
          this.montoDeAperturaAnterior = this.caja[
            "cajaestados"
          ][0].montoAperturaCajaEstado;
          var length = this.listaMovimientoCaja.length;
          for (let i = 0; i < length; i++) {
            if (
              this.listaMovimientoCaja[i].fechaYHoraMovimientoCaja >
              this.fechaYHoraCajaEstado
            ) {
              if (
                this.listaMovimientoCaja[i].tipomovimientocaja
                  .idTipoMovimientoCaja == 1
              ) {
                _this.ingresos += this.listaMovimientoCaja[
                  i
                ].montoMovimientoCaja;
              } else {
                _this.egresos += this.listaMovimientoCaja[
                  i
                ].montoMovimientoCaja;
              }
            }
          }

          _this.total =
            _this.ingresos - _this.egresos + this.montoDeAperturaAnterior;
        }
      });
    }

    ($ as any).confirm({
      title: titulo,
      content: mensaje,
      type: "blue",
      typeAnimated: true,
      theme: "material",
      buttons: {
        aceptar: {
          text: "Aceptar",
          btnClass: "btn-blue",
          action: function() {
            if (
              (_this.form.value["idTipoMovimientoCaja"] == 2 &&
                _this.form.value["montoMovimientoCaja"] <= _this.total) ||
              _this.form.value["idTipoMovimientoCaja"] == 1
            ) {
              let caja = _this.reemplazarCaja();
              _this.cajaServicio.createMovimientoCaja(caja).then(response => {
                const titulo = "Éxito";
                const mensaje =
                  "Se ha creado el registro de Movimiento Caja de forma exitosa";
                ($ as any).confirm({
                  title: titulo,
                  content: mensaje,
                  type: "green",
                  typeAnimated: true,
                  theme: "material",
                  buttons: {
                    aceptar: {
                      text: "Aceptar",
                      btnClass: "btn-green",
                      action: function() {
                        _this.router.navigate([
                          `/generarmovimientocaja/${_this.idCaja}`
                        ]);
                      }
                    }
                  }
                });
              });
            } else {
              const titulo = "Error";
              const mensaje =
                "El monto ingresado de egreso es superior al disponible en caja";

              ($ as any).confirm({
                title: titulo,
                content: mensaje,
                type: "red",
                typeAnimated: true,
                theme: "material",
                buttons: {
                  aceptar: {
                    text: "Aceptar",
                    btnClass: "btn-green",
                    action: function() {}
                  }
                }
              });
            }
          }
        },
        cerrar: {
          text: "Cerrar",
          action: function() {}
        }
      }
    });
  }
  traerTipoMovimientoCaja() {
    this.cajaServicio.getTipoMovimientoCajas().then(response => {
      this.tipoMovimientoCaja = response["data"];
    });
  }
}
