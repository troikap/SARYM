import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { RolService, Rol } from 'src/app/services/rol/rol.service';
import decode from "jwt-decode";

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
  public accionGet: string;

  public funcionesRol = [];
  public funcionesAsignadas = [];

  private funcionesAsignadasInicial = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private rolService: RolService,
  ) {
    this.form = new FormGroup({
      idRol: new FormControl({ value: "", disabled: true }),
      idFuncion: new FormControl(""),
      nombreRol: new FormControl("", [Validators.required, Validators.pattern(/^([A-ZÑÁÉÍÓÚ]{1})[a-zñáéíóú]+((\s)([A-ZÑÁÉÍÓÚ]{1})[a-zñáéíóú]+)*$/)])
    });

    this.activatedRoute.params.subscribe(params => {
      this.accionGet = params.accion;
      this.idRol = params.id;
      if (this.accionGet !== "crear") {
        this.rolEncontrado = true;
        this.traerRol();
        this.traerFuncionesRol();
      }
    });

  }

  ngOnInit() {
    this.traerFunciones();
    this.setValueChangeFunciones();
  }
 
  actualizarStorage() {
     //Si estoy modificando funciones para mi mismo rol (con el que estoy autenticado), actualizo el storage.
    let token = localStorage.getItem("token");
    let tokenPayload = decode(token);
    let rolFromToken = tokenPayload["RolUsuario"];
    if (this.rol.nombreRol == rolFromToken) {
      let arrayFuncionesRol = this.getDTOFuncionesRol();
      let nuevoArrayFunionesRol = [];
      for (let item of arrayFuncionesRol) {
        nuevoArrayFunionesRol.push(item.nombreFuncion);
      }
      localStorage.removeItem("FuncionesRol");
      localStorage.setItem('FuncionesRol', JSON.stringify(nuevoArrayFunionesRol));
    }
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
    this.rolService.getFuncionesRolAll().then((res: any) => {
      this.funcionesRol = res.data;
      this.ordenarBurbujaList(this.funcionesRol);
    });

    // /////HARDCODE FUNCTIONS --> ELIMINAR CUANDO ESTE BACKEND DE FUNCIONES/////
    // this.funcionesRol.push({"idFuncion":"1", "nombreFuncion":"Consulta Usuario"});
    // this.funcionesRol.push({"idFuncion":"2", "nombreFuncion":"ABM Usuario"});
    // this.funcionesRol.push({"idFuncion":"3", "nombreFuncion":"Buscar Producto"});
    // this.funcionesRol.push({"idFuncion":"4", "nombreFuncion":"Consulta Producto"});
    // this.funcionesRol.push({"idFuncion":"5", "nombreFuncion":"ABM Producto"});
    // this.funcionesRol.push({"idFuncion":"6", "nombreFuncion":"Consulta Abrir Caja"});
    // this.funcionesRol.push({"idFuncion":"7", "nombreFuncion":"ABM Abrir Caja"});

    // console.log("funcionesRol: ", this.funcionesRol);
    // /////////////////////////////////////////////////////////////////////////
  }

  ordenarBurbujaList(lista: any[]) {
    let i = 1;
    let ordenada = false;

    while (i < lista.length && !ordenada) {
      i++;
      ordenada = true;
      for (let j = 0; j < (lista.length - 1); j++) {
        if (lista[j].idFuncion > lista[j + 1].idFuncion) {
          ordenada = false;

          let aux = lista[j];
          lista[j] = lista[j + 1];
          lista[j + 1] = aux;
        }
      }
    }
  }

  traerFuncionesRol() {
    let listaAux = [];
    this.rolService.getRol(this.idRol).then(res => {
      listaAux = res.data.funcionrols;
      for (let item of listaAux) {
        this.funcionesAsignadas.push(item.funcion);
        this.funcionesAsignadasInicial.push(item.funcion);
      }
    });
  }

  eliminarFuncion(idFuncion: number) { //NO elimino. Genero un nuevo arreglo para no tener problemas de ínidices en la lista
    let funcionesAsignadasAux = []; //No asigno directamente la variable, pues Angular todo lo pasa por referencia. Luego creo una nueva lista
    for (let item of this.funcionesAsignadas) {
      if (item.idFuncion != idFuncion) {
        funcionesAsignadasAux.push(item);
      }
    }
    this.funcionesAsignadas = funcionesAsignadasAux;
    this.ordenarBurbujaList(this.funcionesAsignadas);
  }

  setValueChangeFunciones() {
    this.form.get("idFuncion").valueChanges.subscribe(idx => {
      if (idx != "") {
        let insertar = true;
        for (let item of this.funcionesRol) {
          for (let itemAsig of this.funcionesAsignadas) {
            if (itemAsig.idFuncion == idx) {
              insertar = false;
            }
          }
          if (insertar) {
            if (item.idFuncion == idx) {
              let _this = this;
              ($ as any).confirm({
                title: "Confirmar",
                content: "¿Desaa Agregar la función seleccionada?",
                type: 'blue',
                typeAnimated: true,
                theme: 'material',
                buttons: {
                  aceptar: {
                    text: 'Aceptar',
                    btnClass: 'btn-blue',
                    action: function () {
                      _this.funcionesAsignadas.push(item);
                      _this.ordenarBurbujaList(_this.funcionesAsignadas);
                    }
                  },
                  cerrar: {
                    text: 'Cerrar',
                    action: function () { }
                  }
                }
              });
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
                  action: function () { }
                }
              }
            });
            break;
          }
        }
      }
    });
  }

  getDTOEliminarFuncionesRol() {
    let editarFuncion = {
      idRol: this.idRol,
      detalle: this.getDTOListaEliminar()
    }
    return editarFuncion;
  }

  getDTOCrearFuncionesRol() {
    let editarFuncion = {
      idRol: this.idRol,
      detalle: this.getDTOFuncionesRol()
    }
    return editarFuncion;
  }

  getDTOFuncionesRol(): any[] {
    let listaFuncionesAsignadas = [];

    for (let item of this.funcionesAsignadas) {
      let dtoFuncionesRol: any = {
        idFuncion: item.idFuncion,
        nombreFuncion : item.nombreFuncion
      }
      listaFuncionesAsignadas.push(dtoFuncionesRol);
    }
    return listaFuncionesAsignadas;
  }

  getDTOListaEliminar(): any[] {
    let funcionesAElmiminar = [];
    let dtoListaEliminar = [];

    let encuentra;
    for (let item of this.funcionesAsignadasInicial) {
      encuentra = false;
      for (let item1 of this.funcionesAsignadas) {
        if (item.idFuncion == item1.idFuncion) {
          encuentra = true;
        }
      }
      if (!encuentra) { //Si NO encuentra el elemento
        funcionesAElmiminar.push(item);
      }
    }

    for (let item of this.rol['funcionrols']) {
      for (let item1 of funcionesAElmiminar) {
        if (item.idFuncion == item1.idFuncion) {
          let dtoFuncionEliminar: any = {
            idFuncionRol: item.idFuncionRol,
            baja: true
          }
          dtoListaEliminar.push(dtoFuncionEliminar);
        }
      }
    }

    return dtoListaEliminar;
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
            action: function () {
              let rol = _this.reemplazarRol();
              _this.rolService.updateRol(rol).then(response => {

                let dtoListaEliminar = _this.getDTOEliminarFuncionesRol();
                let listaFuncionesCrearRol = _this.getDTOCrearFuncionesRol();

                if (dtoListaEliminar.detalle.length > 0) {
                  _this.rolService.updateFuncionesRol(dtoListaEliminar).then(response => {
                    if (listaFuncionesCrearRol.detalle.length > 0) {
                      _this.rolService.updateFuncionesRol(listaFuncionesCrearRol).then(response => {
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
                              action: function () {
                                _this.actualizarStorage();
                                _this.router.navigate(["/rol"]);
                              }
                            }
                          }
                        });
                      });
                    }
                    else {
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
                            action: function () {
                              _this.actualizarStorage();
                              _this.router.navigate(["/rol"]);
                            }
                          }
                        }
                      });
                    }
                  });
                }
                else if (listaFuncionesCrearRol.detalle.length > 0) {
                  _this.rolService.updateFuncionesRol(listaFuncionesCrearRol).then(response => {
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
                          action: function () {         
                            _this.actualizarStorage();
                            _this.router.navigate(["/rol"]);
                          }
                        }
                      }
                    });
                  });
                }
                else {
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
                        action: function () {
                          _this.actualizarStorage();
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
            action: function () { }
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
            action: function () {
              let rol = _this.reemplazarRol();
              _this.rolService.deleteRol(rol).then(response => {
                if (response.tipo == 1) {
                  let dtoListaEliminar = _this.getDTOEliminarFuncionesRol();
                  _this.rolService.updateFuncionesRol(dtoListaEliminar).then(response => {
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
                          action: function () {
                            _this.router.navigate(["/rol"]);
                          }
                        }
                      }
                    });
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
                        action: function () {
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
                        action: function () {
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
            action: function () { }
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
            action: function () {
              let rol = _this.reemplazarRol();
              _this.rolService.setRol(rol).then(response => {
                if (response.tipo !== 2) {
                  _this.idRol = response.id;
                  let listaFuncionesCrearRol = _this.getDTOCrearFuncionesRol();
                  _this.rolService.updateFuncionesRol(listaFuncionesCrearRol).then(response => {
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
                          action: function () {
                            _this.router.navigate(["/rol"]);
                          }
                        }
                      }
                    });
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
                        action: function () {
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
                        action: function () { }
                      }
                    }
                  });
                }
              });
            }
          },
          cerrar: {
            text: "Cerrar",
            action: function () { }
          }
        }
      });
    }
  }
}
