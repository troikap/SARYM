import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MesaService } from "../../../services/mesa/mesa.service";
import { Mesa } from "../../../model/mesa/mesa.model";
import {
  EstadoMesaService,
  EstadoMesa
} from "../../../services/estadomesa/estadomesa.service";
import { SectorService } from "../../../services/sector/sector.service";
import { Sector } from "../../../model/sector/sector.model";

@Component({
  selector: "app-crud-mesa",
  templateUrl: "./crud-mesa.component.html",
  styleUrls: ["./crud-mesa.component.scss"]
})
export class CrudMesaComponent implements OnInit {
  form: FormGroup;
  private mesaEncontrada: boolean;
  private mesa: Mesa;
  private estadoMesas: EstadoMesa[];
  private sectores: Sector[];
  private newForm = {};
  private idMesa: number = null;
  private estadoMesaActual: number;
  accionGet;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private mesaService: MesaService,
    private estadoMesaService: EstadoMesaService,
    private sectorService: SectorService
  ) {
    this.form = this.formBuilder.group({
      idMesa: [""],
      nroMesa: ["", Validators.compose([ Validators.required, Validators.pattern(/^([0-9]{3}|[0-9]{2}|[0-9]{1})$/)])],
      capacidadMesa: [ "",  Validators.compose([ Validators.required, Validators.pattern(/^([0-9]{2}|[0-9]{1})$/)])],
      nroUbicacion: ["", Validators.required],
      idEstadoMesa: [""],
      idSector: ["", Validators.required]
    });

    this.activatedRoute.params.subscribe(params => {
      this.accionGet = params.accion;
      this.idMesa = params.id;
      if (this.accionGet !== "crear") {
        this.mesaEncontrada = true;
        this.traerMesa();
      }
    });
  }

  ngOnInit() {
    this.traerEstadoMesa();
    this.traerSectorMesa();
  }

  traerMesa() {
    if (this.idMesa !== 0) {
      this.mesaService.getMesa(this.idMesa).then(res => {
        if (res["tipo"] == 2) {
        } else {
          if (res) {
            this.mesa = res["data"];
            this.estadoMesaActual = this.mesa[
              "mesaestados"
            ][0].estadomesa.idEstadoMesa;
            this.newForm = {
              idMesa: this.mesa["idMesa"],
              nroMesa: this.mesa["nroMesa"],
              capacidadMesa: this.mesa["capacidadMesa"],
              nroUbicacion: this.mesa["nroUbicacion"],
              idEstadoMesa: this.mesa["mesaestados"][0].estadomesa.idEstadoMesa,
              idSector: this.mesa["sector"].idSector
            };
            this.form.setValue(this.newForm);
            if (this.accionGet == "eliminar") {
              this.form.disable();
            }
          }
        }
      });
    }
  }

  reemplazarMesa(): Mesa {
    let us = null;
    if (this.mesa && this.mesa.idMesa) {
      us = this.mesa.idMesa;
    }
    let reempMesa: Mesa = {
      idMesa: us,
      nroMesa: this.form.value["nroMesa"],
      capacidadMesa: this.form.value["capacidadMesa"],
      nroUbicacion: this.form.value["nroUbicacion"],
      idEstadoMesa: this.form.value["idEstadoMesa"],
      idSector: this.form.value["idSector"]
    };
    return reempMesa;
  }

  guardar() {
    let _this = this; //Asigno el contexto a una variable, ya que se pierde al ingresar a la función de mensajeria
    const titulo = "Confirmación";
    const mensaje = `¿Está seguro que desea ${this.accionGet} el elemento seleccionado?`;
    if (this.mesaEncontrada && this.accionGet === "editar") {
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
              let mesa = _this.reemplazarMesa();
              let actualizarMesa = {};
              actualizarMesa["idMesa"] = mesa.idMesa;
              actualizarMesa["nroMesa"] = mesa.nroMesa;
              actualizarMesa["capacidadMesa"] = mesa.capacidadMesa;
              actualizarMesa["nroUbicacion"] = mesa.nroUbicacion;
              actualizarMesa["idSector"] = mesa.idSector;
              //Si el estadoMesa ha sido modificado, actualizo su estado.
              if (mesa.idEstadoMesa != _this.estadoMesaActual) {
                let actualizarEstado = {};
                actualizarEstado["idMesa"] = mesa.idMesa;
                actualizarEstado["idEstadoMesa"] = mesa.idEstadoMesa;
                _this.mesaService
                  .updateMesaEstado(actualizarEstado)
                  .then(response => {});
              }
              _this.mesaService.updateMesa(actualizarMesa).then(response => {
                const titulo = "Éxito";
                const mensaje =
                  "Se ha actualizado el registro de mesa de forma exitrosa";
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
                        _this.router.navigate(["/mesa/"]);
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
    } else if (this.mesaEncontrada && this.accionGet === "eliminar") {
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
              let mesa = _this.reemplazarMesa();
              let deletes = {};
              deletes["idMesa"] = mesa.idMesa;
              deletes["idEstadoMesa"] = 5;
              _this.mesaService.deleteMesa(deletes).then(response => {
                if (response["tipo"] == 1) {
                  const titulo = "Éxito";
                  const mensaje =
                    "Se ha eliminado el registro de mesa de forma exitosa";
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
                          _this.router.navigate(["/mesa/"]);
                        }
                      }
                    }
                  });
                } else {
                  ($ as any).confirm({
                    title: "Error",
                    content:
                      "No se ha podido completar exitosamente la solicitud",
                    type: "red",
                    typeAnimated: true,
                    theme: "material",
                    buttons: {
                      aceptar: {
                        text: "Aceptar",
                        btnClass: "btn-red",
                        action: function() {
                          _this.router.navigate(["/mesa/"]);
                        }
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
              let m = _this.reemplazarMesa();
              _this.mesaService.setMesa(m).then(response => {
                if (response.tipo !== 2) {
                  const titulo = "Éxito";
                  const mensaje =
                    "Se ha Creado un nuevo registro de mesa de forma exitosa";
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
                          _this.router.navigate(["/mesa/"]);
                        }
                      }
                    }
                  });
                } else {
                  ($ as any).confirm({
                    title: "Error",
                    content: `Ya existe el registro. No es posible realizar esta acción`,
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

  traerEstadoMesa() {
    this.estadoMesaService.getEstadosMesas().then(res => {
      this.estadoMesas = res;
    });
  }
  traerSectorMesa() {
    this.sectorService.getSectores().then(res => {
      this.sectores = res["data"];
    });
  }
}
