import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CajaService } from '../../../services/caja/caja.service';
import { EstadoCaja } from 'src/app/model/estadoCaja/estadoCaja.model';
import { Usuario } from '../../../model/usuario/usuario.model';
import { UsuarioService } from '../../../services/usuario/usuario.service';

@Component({
  selector: "app-edit-abrir-caja-usuario",
  templateUrl: "./edit-abrir-caja.component.html",
  styleUrls: ["./edit-abrir-caja.component.scss"]
})
export class EditAbrirCajaComponent implements OnInit {
  form: FormGroup;
  private usuarios: Usuario[];
  private estadosCaja: EstadoCaja[];
  private cajaEncontrada: boolean;
  private idCaja: string;
  private caja: any;
  private newForm = {};
  montoCierreCaja: any;
  idEstadoform: any;

  accionGet;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
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

  ngOnInit() {}

  traerCaja() {
    if (this.idCaja !== "0" && this.idCaja !== "") {
      this.cajaServicio.getCaja(this.idCaja).subscribe((data: any) => {
        // Llamo a un Observer
        if (data != null) {
          this.montoCierreCaja = data["cajaestados"][0].montoCierreCajaEstado;
          this.caja = data;
          this.newForm = {
            idCaja: this.caja["idCaja"],
            idEstadoCaja: this.caja["cajaestados"][0].estadocaja.idEstadoCaja,
            descripcionCajaEstado: "Apertura de Caja",
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
      idEstadoCaja: 2,
      idUsuario: localStorage.getItem("idUsuario"),
      descripcionCajaEstado: this.form.value["descripcionCajaEstado"],
      montoAperturaCajaEstado: this.form.value["montoAperturaCajaEstado"]
    };
    return rempCaja;
  }

  guardar() {
    let _this = this; //Asigno el contexto a una variable, ya que se pierde al ingresar a la función de mensajeria
    const titulo = "Confirmación";
    const mensaje = `¿Está seguro que desea ${this.accionGet} el elemento seleccionado?`;
    let _montoCierreCajaEstado = this.form.value["montoAperturaCajaEstado"];
    let _idmontoCierreAnterior = this.montoCierreCaja;
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
            let estadoActualCaja = _this.idEstadoform;
            if (
              _idmontoCierreAnterior == _montoCierreCajaEstado ||
              _idmontoCierreAnterior == null ||
              estadoActualCaja == 1
            ) {
              _this.cajaServicio.updateCajaEstado(caja).then(response => {
                const titulo = "Éxito";
                const mensaje = "Se ha abierto la caja de forma exitosa";
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
                        _this.router.navigate(["/abrircaja/"]);
                      }
                    }
                  }
                });
              });
            } else {
              const titulo = "Error";
              const mensaje =
                "No coincide el monto de apertura con el monto de cierre del dia anterior";

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
}
