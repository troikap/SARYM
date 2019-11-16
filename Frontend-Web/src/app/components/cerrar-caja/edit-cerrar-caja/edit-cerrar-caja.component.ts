import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CajaService } from '../../../services/caja/caja.service';
import { EstadoCaja } from 'src/app/model/estadoCaja/estadoCaja.model';
import { Usuario } from '../../../model/usuario/usuario.model';

@Component({
  selector: "app-edit-cerrar-caja-usuario",
  templateUrl: "./edit-cerrar-caja.component.html",
  styleUrls: ["./edit-cerrar-caja.component.scss"]
})
export class EditCerrarCajaComponent implements OnInit {
  form: FormGroup;
  private usuarios: Usuario[];
  private estadosCaja: EstadoCaja[];
  private cajaEncontrada: boolean;
  private idCaja: string;
  private caja: any;
  private newForm = {};
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
    private router: Router,
    private cajaServicio: CajaService
  ) {
    this.form = new FormGroup({
      idCaja: new FormControl({ value: "", disabled: true }),
      descripcionCajaEstado: new FormControl("", Validators.required),
      montoCierreCajaEstado: new FormControl("", [
        Validators.required,
        Validators.pattern(/^([0-9]+([.][0-9]{1,2})|[0-9]+)$/)
      ])
    });

    this.activatedRoute.params.subscribe(params => {
      this.accionGet = params.accion;
      this.idCaja = params.id;
      if (this.accionGet !== "crear") {
        this.cajaEncontrada = true;
        this.buscarMovimientosCaja();
      } else {
        this.cajaEncontrada = false;
      }
    });
  }

  ngOnInit() {}

  reemplazarCaja(): any {
    let us = null;
    if (this.caja && this.caja.idCaja) {
      us = this.caja.idCaja;
    }

    this.idEstadoform = this.form.value["idEstadoCaja"];
    let rempCaja: any = {
      idCaja: us,
      idEstadoCaja: 3,
      idUsuario: localStorage.getItem("idUsuario"),
      descripcionCajaEstado: this.form.value["descripcionCajaEstado"],
      montoCierreCajaEstado: this.form.value["montoCierreCajaEstado"]
    };
    return rempCaja;
  }

  guardar() {
    let _this = this; //Asigno el contexto a una variable, ya que se pierde al ingresar a la función de mensajeria
    const titulo = "Confirmación";
    const mensaje = `¿Está seguro que desea ${this.accionGet} el elemento seleccionado?`;
    let _montoCierreCajaEstado = this.form.value["montoCierreCajaEstado"];
    let _idmontoSumaMovimientosAnterior = _this.total;
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
            let caja = _this.reemplazarCaja();

            if (_idmontoSumaMovimientosAnterior == _montoCierreCajaEstado) {
              _this.cajaServicio.updateCajaEstado(caja).then(response => {
                const titulo = "Éxito";
                const mensaje = "Se ha cerrado la caja de forma exitosa";

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
                        _this.router.navigate(["/cerrarcaja/"]);
                      }
                    }
                  }
                });
              });
            } else {
              const titulo = "Error";
              const mensaje =
                "No coincide el monto de cierre con la suma de movimientos de caja hasta el momento";

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

  buscarMovimientosCaja() {
    let _this = this;
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

          this.newForm = {
            idCaja: this.caja["idCaja"],
            descripcionCajaEstado: "Cierre de Caja",
            montoCierreCajaEstado: null
          };
          this.form.setValue(this.newForm);
        }
      });
    }
  }
}
