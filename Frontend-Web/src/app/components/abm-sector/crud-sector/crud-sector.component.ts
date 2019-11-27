import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Sector } from '../../../model/sector/sector.model';
import { SectorService } from '../../../services/sector/sector.service';

@Component({
  selector: "app-crud-sector",
  templateUrl: "./crud-sector.component.html",
  styleUrls: ["./crud-sector.component.scss"]
})
export class CrudSectorComponent implements OnInit {
  form: FormGroup;
  private sectorEncontrado: boolean;
  private idSector: number = null;
  private sector: Sector;
  private newForm = {};

  accionGet;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private sectorService: SectorService
  ) {
    this.form = this.formBuilder.group({
      idSector: [""],
      codSector: [ "", Validators.compose([ Validators.required, Validators.pattern(/^([A-Z]+|[0-9]+)+$/)])],
      nombreSector: [ "", Validators.compose([ Validators.required, Validators.pattern(/^([A-ZÑÁÉÍÓÚ]{1})[a-zñáéíóú]+((\s)([A-ZÑÁÉÍÓÚ]{1})[a-zñáéíóú]+)*$/)])],
      fechaYHoraBajaSector: [""]
    });

    this.activatedRoute.params.subscribe(params => {
      this.accionGet = params.accion;
      this.idSector = params.id;
      if (this.accionGet !== "crear") {
        this.sectorEncontrado = true;
        this.traerSector();
      }
    });
  }

  ngOnInit() {}

  traerSector() {
    if (this.idSector !== 0) {
      this.sectorService.getSector(this.idSector).then(res => {
        if (res["tipo"] == 2) {
        } else {
          if (res) {
            this.sector = res["data"];
            this.newForm = {
              idSector: this.sector["idSector"],
              codSector: this.sector["codSector"],
              nombreSector: this.sector["nombreSector"],
              fechaYHoraBajaSector: this.sector["fechaYHoraBajaSector"]
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

  reemplazarSector(): Sector {
    let us = null;
    if (this.sector && this.sector.idSector) {
      us = this.sector.idSector;
    }
    let rempSector: Sector = {
      idSector: us,
      codSector: this.form.value["codSector"],
      nombreSector: this.form.value["nombreSector"],
      bajaSector: this.form.value["fechaYHoraBajaSector"]
    };
    return rempSector;
  }

  guardar() {
    let _this = this; //Asigno el contexto a una variable, ya que se pierde al ingresar a la función de mensajeria
    const titulo = "Confirmación";
    const mensaje = `¿Está seguro que desea ${this.accionGet} el elemento seleccionado?`;
    if (this.sectorEncontrado && this.accionGet === "editar") {
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
              let sector = _this.reemplazarSector();
              _this.sectorService.updateSector(sector).then(response => {
                if (response.tipo !== 2) {
                  const titulo = "Éxito";
                  const mensaje =
                    "Se ha actualizado el registro de sector de forma exitrosa";
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
                          _this.router.navigate(["/sector/"]);
                        }
                      }
                    }
                  });
                } else {
                  ($ as any).confirm({
                    title: "Erorr",
                    content:
                      "Ya existe el registro. No es posible realizar esta acción",
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
    } else if (this.sectorEncontrado && this.accionGet === "eliminar") {
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
              let sector = _this.reemplazarSector();
              _this.sectorService.deleteSector(sector).then(response => {
                if (response["tipo"] == 1) {
                  const titulo = "Éxito";
                  const mensaje =
                    "Se ha eliminado el registro de sector de forma exitosa";
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
                          _this.router.navigate(["/sector/"]);
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
                          _this.router.navigate(["/sector/"]);
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
              let sector = _this.reemplazarSector();
              _this.sectorService.setSector(sector).then(response => {
                if (response.tipo !== 2) {
                  const titulo = "Éxito";
                  const mensaje =
                    "Se ha Creado un nuevo registro de sector de forma exitosa";
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
                          _this.router.navigate(["/sector/"]);
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
}

