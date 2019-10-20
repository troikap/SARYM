import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidatorFn,
  ValidationErrors
} from "@angular/forms";
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
      nroMesa: ["", Validators.required],
      capacidadMesa: ["", Validators.required],
      nroUbicacion: ["", Validators.required],
      idEstadoMesa: ["", Validators.required],
      idSector: ["", Validators.required]
    });

    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);
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
    console.log("Funcion 'traerMesa()', ejecutada");
    console.log(this.idMesa);
    if (this.idMesa !== 0) {
      this.mesaService.getMesa(this.idMesa).then(res => {
        if (res["tipo"] == 2) {
          console.log("Error de base de datos, tipo 2");
        } else {
          if (res) {
            this.mesa = res["data"];
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
            console.log("FORM", this.form);
          }
        }
      });
    }
  }

  reemplazarMesa(): Mesa {
    console.log("Funcion 'reemplazarMesa()', ejecutada");
    let us = null;
    if (this.mesa && this.mesa.idMesa) {
      console.log("SETEO DE ID :");
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
    console.log(this.form);
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
              _this.mesaService.updateMesa(mesa).then(response => {
                console.log("ACTUALIZADO", response);
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
            action: function() {
              console.log("Edición Cancelada");
            }
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
              _this.mesaService.deleteMesa(mesa).then(response => {
                console.log("BORRADO", response);
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
              });
            }
          },
          cerrar: {
            text: "Cerrar",
            action: function() {
              console.log("Eliminación cancelada");
            }
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
                  console.log("CREADO", response);
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
                  console.log("ERROR", response);
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
                        action: function() {
                          console.log("Mensaje de error aceptado");
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
            action: function() {
              console.log("Creación Cancelada");
            }
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
