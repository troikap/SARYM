import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { RolService, Rol } from 'src/app/services/rol/rol.service';

@Component({
  selector: 'app-crud-rol',
  templateUrl: './crud-rol.component.html',
  styleUrls: ['./crud-rol.component.scss']
})
export class CrudRolComponent implements OnInit {
  form: FormGroup;
  private rolEncontrado: boolean;
  private rol: Rol;
  private newForm = {};
  private idRol: number = null;
  accionGet;

  public funcionesRol = [];
  public funcionesAsignadas = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private rolService: RolService,
  ) {
    this.form = new FormGroup({
      idRol: new FormControl({ value: "", disabled: true }),
      idFuncion: new FormControl(""),
      nombreRol: new FormControl("", [ Validators.required, Validators.pattern(/^([A-ZÑÁÉÍÓÚ]{1})[a-zñáéíóú]+((\s)([A-ZÑÁÉÍÓÚ]{1})[a-zñáéíóú]+)*$/)])
    });

    this.activatedRoute.params.subscribe(params => {
      this.accionGet = params.accion;
      this.idRol = params.id;
      if (this.accionGet !== "crear") {
        this.rolEncontrado = true;
        this.traerRol();
      }
    });

   }

  ngOnInit() {
    this.traerFunciones();
    this.traerFuncionesRol();
    this.setValueChangeFunciones();
  }

  traerRol() {
    if (this.idRol !== 0) {
      this.rolService.getRol(this.idRol).then(res => {
        if (res["tipo"] == 2) {
        } else {
          if (res) {
            this.rol = res["data"];
            
            this.newForm = {
              idRol: this.idRol,
              idFuncion: "",
              nombreRol: this.rol["nombreRol"],
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

  reemplazarRol(): any {
    let rol = null;
    if (this.rol && this.rol.idRol) {
      rol = this.rol.idRol;
    }
    let reempRol: any = {
      idRol: rol,
      nombreRol: this.form.value["nombreRol"]
    };
    return reempRol;
  }

  traerFunciones() {
    console.log("Traer Funciones existentes");
    // this.rolService.getFuncionesRolAll().then(res => {
    //   this.funcionesRol = res;
    // });

    /////HARDCODE FUNCTIONS --> ELIMINAR CUANDO ESTE BACKEND DE FUNCIONES/////
    this.funcionesRol.push({"idFuncion":"1", "nombreFuncion":"Consulta Usuario"});
    this.funcionesRol.push({"idFuncion":"2", "nombreFuncion":"ABM Usuario"});
    this.funcionesRol.push({"idFuncion":"3", "nombreFuncion":"Buscar Producto"});
    this.funcionesRol.push({"idFuncion":"4", "nombreFuncion":"Consulta Producto"});
    this.funcionesRol.push({"idFuncion":"5", "nombreFuncion":"ABM Producto"});
    this.funcionesRol.push({"idFuncion":"6", "nombreFuncion":"Consulta Abrir Caja"});
    this.funcionesRol.push({"idFuncion":"7", "nombreFuncion":"ABM Abrir Caja"});

    console.log("funcionesRol: ", this.funcionesRol);
    /////////////////////////////////////////////////////////////////////////
  }

  traerFuncionesRol () {
    console.log("Traer Funciones del Rol");
    // this.rolService.getFuncionesRol().then(res => {
    //   this.funcionesAsignadas = res;
    // });

  }

  eliminarFuncion(idFuncion) { //NO elimino. Genero un nuevo arreglo para no tener problemas de ínidices en la lista
    let funcionesAsignadasAux = []; //No asigno directamente la variable, pues Angular todo lo pasa por referencia. Luego creo una nueva lista
    for(let item of this.funcionesAsignadas) { 
      if (item.idFuncion != idFuncion) {
        funcionesAsignadasAux.push(item);
      }
    }
    this.funcionesAsignadas = funcionesAsignadasAux;
  }

  setValueChangeFunciones() {
    this.form.get("idFuncion").valueChanges.subscribe(idx => {
      if (idx != "") {
        let insertar = true;
        for(let item of this.funcionesRol) {
          for (let itemAsig of this.funcionesAsignadas) {
            if (itemAsig.idFuncion == idx) {
              insertar = false;
            }
          }
          if (insertar) {
            if (item.idFuncion == idx) {
              this.funcionesAsignadas.push(item);
              break;
            }
          }
          else {
            ($ as any).confirm({
              title: "Confirmar",
              content: "Función ya asignada.",
              type: 'blue',
              typeAnimated: true,
              theme: 'material',
              buttons: {
                  aceptar: {
                      text: 'Aceptar',
                      btnClass: 'btn-blue',
                      action: function(){}
                  }
              }
            });
            break;
          }
        }
      }
    });
  }

  getDTOFuncionesRol (): any[] {
    console.log("Funcion 'getDTOFuncionesRol()', ejecutada");
    
    let listaFuncionesAsignadas = [];

    for (let item of this.funcionesAsignadas) {
      let dtoFuncionesRol: any = {
        idRol: this.idRol,
        idFuncion: item.idFuncion
      }
      listaFuncionesAsignadas.push(dtoFuncionesRol);
    }
    return listaFuncionesAsignadas;
  }

  guardar() {
    let _this = this;
    const titulo = "Confirmación";
    const mensaje = `¿Está seguro que desea ${this.accionGet} el elemento seleccionado?`;
    if (this.rolEncontrado && this.accionGet === "editar") {
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
              let rol = _this.reemplazarRol();
              _this.rolService.updateRol(rol).then(response => {


                let listaFuncionesRol = _this.getDTOFuncionesRol();
                console.log("listaFuncionesRol:", listaFuncionesRol);
                //Continuar actualizando, luego que esté el backend


                const titulo = "Éxito";
                const mensaje = "Se ha actualizado el registro de Rol de forma exitrosa";
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
                        _this.router.navigate(["/rol"]);
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
    } else if (this.rolEncontrado && this.accionGet === "eliminar") {
      let rol = _this.reemplazarRol();
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
              let rol = _this.reemplazarRol();
              _this.rolService.deleteRol(rol).then(response => {
                if (response.tipo == 1) {
                  const titulo = "Éxito";
                  const mensaje = "Se ha eliminado el registro de Rol de forma exitosa";
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
                          _this.router.navigate(["/rol"]);
                        }
                      }
                    }
                  });
                }
                else if (response.tipo == 2) {
                  const titulo = "Error";
                  const mensaje = "No se ha podido eliminar el Rol seleccionado, el mismo está siendo usado por al menos un usuario del sistema. No es posible realizar esta acción";
                  ($ as any).confirm({
                    title: titulo,
                    content: mensaje,
                    type: "red",
                    typeAnimated: true,
                    theme: "material",
                    buttons: {
                      aceptar: {
                        text: "Aceptar",
                        btnClass: "btn-red",
                        action: function() {
                          _this.router.navigate(["/rol"]);
                        }
                      }
                    }
                  });
                }
                else {
                  const titulo = "Error";
                  const mensaje = `${response.title}. No es posible realizar esta acción`;
                  ($ as any).confirm({
                    title: titulo,
                    content: mensaje,
                    type: "red",
                    typeAnimated: true,
                    theme: "material",
                    buttons: {
                      aceptar: {
                        text: "Aceptar",
                        btnClass: "btn-red",
                        action: function() {
                          _this.router.navigate(["/rol"]);
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
              let rol = _this.reemplazarRol();
              _this.rolService.setRol(rol).then(response => {


                let listaFuncionesRol = _this.getDTOFuncionesRol();
                console.log("listaFuncionesRol:", listaFuncionesRol);
                //Continuar actualizando, luego que esté el backend


                if (response.tipo !== 2) {
                  const titulo = "Éxito";
                  const mensaje = "Se ha Creado un nuevo registro de Rol de forma exitosa";
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
                          _this.router.navigate(["/rol"]);
                        }
                      }
                    }
                  });
                }
                else if (response.tipo == 2) {
                  const titulo = "Error";
                  const mensaje = "No se ha podido crear el Rol ingresado. El mismo ya existe generado en el sistema. Imposible realizar esta acción.";
                  ($ as any).confirm({
                    title: titulo,
                    content: mensaje,
                    type: "red",
                    typeAnimated: true,
                    theme: "material",
                    buttons: {
                      aceptar: {
                        text: "Aceptar",
                        btnClass: "btn-red",
                        action: function() {
                          _this.router.navigate(["/rol"]);
                        }
                      }
                    }
                  });
                }
                else {
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
}
