import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CajaService } from '../../../services/caja/caja.service';
import { EstadoCaja } from 'src/app/model/estadoCaja/estadoCaja.model';
import { Usuario } from '../../../model/usuario/usuario.model';
import { UsuarioService } from '../../../services/usuario/usuario.service';


@Component({
  selector: "app-caja-usuario",
  templateUrl: "./edit-caja.component.html",
  styleUrls: ["./edit-caja.component.scss"]
})
export class EditCajaComponent implements OnInit {
  form: FormGroup;
  private usuarios: Usuario[];
  private estadosCaja: EstadoCaja[];
  private cajaEncontrada: boolean;
  private idCaja: string;
  private caja: any;
  private newForm = {};
  idEstadoCaja1: any;
  idEstadoform: any;
  montoCierreCaja: any;
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
    private cajaServicio: CajaService,
    private usuarioservicio: UsuarioService
  ) {
    this.form = new FormGroup({
      idCaja: new FormControl({ value: "", disabled: true }),
      idEstadoCaja: new FormControl("", Validators.required),
      descripcionCajaEstado: new FormControl("", Validators.required),
      montoAperturaCajaEstado: new FormControl("", [
        Validators.required,
        Validators.pattern(/^([0-9]+([.][0-9]{1,2})|[0-9]+)$/)
      ])
    });

    this.activatedRoute.params.subscribe(params => {
      this.accionGet = params.accion;
      this.idCaja = params.id;
      if (this.accionGet !== "crear") {
        this.cajaEncontrada = true;
        this.traerCaja();
      } else {
        this.cajaEncontrada = false;
      }
    });
  }

  ngOnInit() {
    this.traerEstadosCaja();
  }

  traerCaja() {
    if (this.idCaja !== "0" && this.idCaja !== "") {
      this.buscarMovimientosCaja();
      this.cajaServicio.getCaja(this.idCaja).subscribe((data: any) => {
        // Llamo a un Observer
        if (data != null) {
          this.idEstadoCaja1 = data["cajaestados"][0].estadocaja.idEstadoCaja;
          this.caja = data;
          this.newForm = {
            idCaja: this.caja["idCaja"],
            idEstadoCaja: this.caja["cajaestados"][0].estadocaja.idEstadoCaja,
            descripcionCajaEstado: this.caja["cajaestados"][0]
              .descripcionCajaEstado,
            montoAperturaCajaEstado: null
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

    this.idEstadoform = this.form.value["idEstadoCaja"];
    let rempCaja: any = {
      idCaja: us,
      idEstadoCaja: this.form.value["idEstadoCaja"],
      idUsuario: localStorage.getItem("idUsuario"),
      descripcionCajaEstado: this.form.value["descripcionCajaEstado"],
      montoAperturaCajaEstado: this.form.value["montoAperturaCajaEstado"]
    };
    return rempCaja;
  }

  guardar() {
    //Variables para mensajes//
    let _this = this; //Asigno el contexto a una variable, ya que se pierde al ingresar a la función de mensajeria
    const titulo = "Confirmación";
    const mensaje = `¿Está seguro que desea ${this.accionGet} el elemento seleccionado?`;
    let _idEstadoCajaLocal = this.idEstadoCaja1;
    let _idEstadoDeCambio = this.form.value["idEstadoCaja"];

    if (this.cajaEncontrada && this.accionGet === "editar") {
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
              if (_idEstadoCajaLocal === _idEstadoDeCambio) {
                _this.cajaServicio.updateCaja(caja).then(response => {
                  const titulo = "Éxito";
                  const mensaje =
                    "Se ha actualizado el registro de caja de forma exitosa";
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
                          _this.router.navigate(["/caja/"]);
                        }
                      }
                    }
                  });
                });
              } else {
                _this.cajaServicio.updateCajaEstado(caja).then(response => {
                  const titulo = "Éxito";
                  const mensaje =
                    "Se ha actualizado el registro de caja de forma exitosa";
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
                          _this.router.navigate(["/caja/"]);
                        }
                      }
                    }
                  });
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
    } else if (this.cajaEncontrada && this.accionGet === "eliminar") {
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
              _this.usuarioservicio.deleteUsuario(caja).then(response => {
                const titulo = "Éxito";
                const mensaje =
                  "Se ha eliminado el registro de caja de forma exitosa";
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
                        _this.router.navigate(["/caja/"]);
                      }
                    }
                  }
                });
              });
            }
          },
          cerrar: {
            text: "Cerrar",
            action: function() {}
          }
        }
      });
    } else {
      ($ as any).confirm({
        title: titulo,
        content: "¿Confirma la creación de un nuevo registro?",
        type: "blue",
        typeAnimated: true,
        theme: "material",
        buttons: {
          aceptar: {
            text: "Aceptar",
            btnClass: "btn-blue",
            action: function() {
              let unidadMed = _this.reemplazarCaja();
              _this.cajaServicio.setCaja(unidadMed).then(response => {
                if (response.tipo !== 2) {
                  const titulo = "Éxito";
                  const mensaje =
                    "Se ha Creado un nuevo registro de usuario de forma exitosa";
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
                          _this.router.navigate(["/caja/"]);
                        }
                      }
                    }
                  });
                } else {
                  ($ as any).confirm({
                    title: "Error",
                    content: `${response.title}. No es posible realizar esta acción`,
                    type: "red",
                    typeAnimated: true,
                    theme: "material",
                    buttons: {
                      aceptar: {
                        text: "Aceptar",
                        btnClass: "btn-red",
                        action: function() {}
                      }
                    }
                  });
                }
              });
            }
          },
          cerrar: {
            text: "Cerrar",
            action: function() {}
          }
        }
      });
    }
  }

  traerEstadosCaja() {
    this.cajaServicio.getEstadosCaja().then(res => {
      this.estadosCaja = res["data"];

      if (this.estadosCaja[0].idEstadoCaja == 1) {
        this.estadosCaja.splice(0, 1);
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
        }
      });
    }
  }
}
