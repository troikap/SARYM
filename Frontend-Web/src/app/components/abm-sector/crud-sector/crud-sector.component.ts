import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Sector } from '../../../model/sector/sector.model';
import { SectorService } from '../../../services/sector/sector.service';

@Component({
  selector: 'app-crud-sector',
  templateUrl: './crud-sector.component.html',
  styleUrls: ['./crud-sector.component.scss']
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
      idSector: [''],
      codSector: ['', Validators.required],
      nombreSector: ['', Validators.required],
      fechaYHoraBajaSector: ['']
    });

    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);
      this.accionGet = params.accion;
      this.idSector = params.id;
      if (this.accionGet !== "crear") {
        this.sectorEncontrado = true;
        this.traerSector();
      }/*
      else {
        this.sectorEncontrado = false;
        this.form.get('contrasenaUsuario').setValidators([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25)
        ]);
        this.form.get('contrasenaUsuario').updateValueAndValidity();

        this.form.get('contrasenaUsuarioRepeat').setValidators(Validators.required);
        this.form.get('contrasenaUsuarioRepeat').updateValueAndValidity();

        this.setValueChangeContraseñaRepeat();
      }*/
    });
  }

  ngOnInit() {
  }

  traerSector() {
    console.log("Funcion 'traerSector()', ejecutada");
    console.log(this.idSector);
    if (this.idSector !== 0) {
      this.sectorService.getSector(this.idSector)
        .then((res) => {
          console.log("SECTOR TRAIDO: ", res)
          if (res['tipo'] == 2) {
            console.log("Error")
          } else {
            if (res) {
              this.sector = res['data'];
              //this.sector = res.data; si uso esta craashea si no encuentra nada
              this.newForm = {
                idSector: this.sector['idSector'],
                codSector: this.sector['codSector'],
                nombreSector: this.sector['nombreSector'],
                fechaYHoraBajaSector: this.sector['fechaYHoraBajaSector']
              }
              this.form.setValue(this.newForm)
              console.log("FORM", this.form)
            }
          }
        });
    }
  }

  reemplazarSector(): Sector {
    console.log("Funcion 'reemplazarSector()', ejecutada");
    let us = null;
    if (this.sector && this.sector.idSector) {
      console.log("SETEO DE ID :")
      us = this.sector.idSector;
    }
    let rempSector: Sector = {
      idSector: us,
      codSector: this.form.value['codSector'],
      nombreSector: this.form.value['nombreSector'],
      bajaSector: this.form.value['fechaYHoraBajaSector']
    }
    return rempSector;
  }

  guardar() {
    console.log(this.form);
    let _this = this; //Asigno el contexto a una variable, ya que se pierde al ingresar a la función de mensajeria
    const titulo = "Confirmación";
    const mensaje = `¿Está seguro que desea ${this.accionGet} el elemento seleccionado?`;
    ///////////////////////////
    if (this.sectorEncontrado && this.accionGet === "editar") {
      ($ as any).confirm({
        title: titulo,
        content: mensaje,
        type: 'blue',
        typeAnimated: true,
        theme: 'material',
        buttons: {
          aceptar: {
            text: 'Aceptar',
            btnClass: 'btn-blue',
            action: function () {
              let sector = _this.reemplazarSector();
              _this.sectorService.updateSector(sector)
                .then((response) => {
                  console.log("ACTUALIZADO", response);
                  const titulo = "Éxito";
                  const mensaje = "Se ha actualizado el registro de sector de forma exitrosa";
                  ($ as any).confirm({
                    title: titulo,
                    content: mensaje,
                    type: 'green',
                    typeAnimated: true,
                    theme: 'material',
                    buttons: {
                      aceptar: {
                        text: 'Aceptar',
                        btnClass: 'btn-green',
                        action: function () {
                          _this.router.navigate(['/sector/']);
                        }
                      }
                    }
                  });
                })
            }
          },
          cerrar: {
            text: 'Cerrar',
            action: function () {
              console.log("Edición Cancelada");
            }
          }
        }
      });
    }
    else if (this.sectorEncontrado && this.accionGet === "eliminar") {
      ($ as any).confirm({
        title: titulo,
        content: mensaje,
        type: 'blue',
        typeAnimated: true,
        theme: 'material',
        buttons: {
          aceptar: {
            text: 'Aceptar',
            btnClass: 'btn-blue',
            action: function () {
              let sector = _this.reemplazarSector();
              _this.sectorService.deleteSector(sector)
                .then((response) => {
                  console.log("BORRADO", response);
                  const titulo = "Éxito";
                  const mensaje = "Se ha eliminado el registro de sector de forma exitosa";
                  ($ as any).confirm({
                    title: titulo,
                    content: mensaje,
                    type: 'green',
                    typeAnimated: true,
                    theme: 'material',
                    buttons: {
                      aceptar: {
                        text: 'Aceptar',
                        btnClass: 'btn-green',
                        action: function () {
                          _this.router.navigate(['/sector/']);
                        }
                      }
                    }
                  });
                })
            }
          },
          cerrar: {
            text: 'Cerrar',
            action: function () {
              console.log("Eliminación cancelada");
            }
          }
        }
      });
    } else {
      ($ as any).confirm({
        title: titulo,
        content: "¿Confirma la creación de un nuevo registro?",
        type: 'blue',
        typeAnimated: true,
        theme: 'material',
        buttons: {
          aceptar: {
            text: 'Aceptar',
            btnClass: 'btn-blue',
            action: function () {
              let sector = _this.reemplazarSector();
              _this.sectorService.setSector(sector)
                .then((response) => {
                  if (response.tipo !== 2) { //TODO CORRECTO
                    console.log("CREADO", response);
                    const titulo = "Éxito";
                    const mensaje = "Se ha Creado un nuevo registro de sector de forma exitosa";
                    ($ as any).confirm({
                      title: titulo,
                      content: mensaje,
                      type: 'green',
                      typeAnimated: true,
                      theme: 'material',
                      buttons: {
                        aceptar: {
                          text: 'Aceptar',
                          btnClass: 'btn-green',
                          action: function () {
                            //ACCION
                            _this.router.navigate(['/sector/']);
                          }
                        }
                      }
                    });
                  }
                  else {
                    console.log("ERROR", response);
                    ($ as any).confirm({
                      title: "Error",
                      content: `${response.title}. No es posible realizar esta acción`,
                      type: 'red',
                      typeAnimated: true,
                      theme: 'material',
                      buttons: {
                        aceptar: {
                          text: 'Aceptar',
                          btnClass: 'btn-red',
                          action: function () {
                            console.log("Mensaje de error aceptado");
                          }
                        }
                      }
                    });
                  }
                })
            }
          },
          cerrar: {
            text: 'Cerrar',
            action: function () {
              console.log("Creación Cancelada");
            }
          }
        }
      });
    }
  }

  /*
  setValueChangeContraseñaRepeat() {
    this.form.get('contrasenaUsuarioRepeat').valueChanges
      .subscribe((resp) => {
        // console.log("RESPUESTA :",resp)
        if (resp == this.form.value.contrasenaUsuario) {
          this.form.controls.contrasenaUsuarioRepeat.setErrors(null)
        } else {
          this.form.controls.contrasenaUsuarioRepeat.setErrors({ not_equal: true })
        }
      })
  }
  */
}

