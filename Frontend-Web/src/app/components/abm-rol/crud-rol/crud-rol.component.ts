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
    this.traerFuncionesRol();
    this.traerRolFunciones();
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
      idFuncion: null,
      nombreRol: this.form.value["nombreRol"]
    };
    return reempRol;
  }

  traerFuncionesRol() {
    console.log("Traer Funciones existentes");
    // this.rolService.getFuncionesRolAll().then(res => {
    //   this.funcionesRol = res;
    // });

    /////HARDCODE FUNCTIONS --> ELIMINAR CUANDO ESTE BACKEND DE FUNCIONES/////
    this.funcionesRol.push({"idFuncion":"1", "nombreFuncion":"Consulta Usuario"});
    this.funcionesRol.push({"idFuncion":"2", "nombreFuncion":"ABM Usuario"});
    this.funcionesRol.push( {"idFuncion":"3", "nombreFuncion":"Buscar Producto"});
    this.funcionesRol.push({"idFuncion":"4", "nombreFuncion":"Consulta Producto"});
    this.funcionesRol.push({"idFuncion":"5", "nombreFuncion":"ABM Producto"});
    this.funcionesRol.push({"idFuncion":"6", "nombreFuncion":"Consulta Abrir Caja"});
    this.funcionesRol.push({"idFuncion":"7", "nombreFuncion":"ABM Abrir Caja"});

    console.log("funcionesRol: ", this.funcionesRol);
    /////////////////////////////////////////////////////////////////////////
  }

  traerRolFunciones () {
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
}
