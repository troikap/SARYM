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

  public funcionesAsignadas;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private rolService: RolService,
  ) {
    this.form = new FormGroup({
      idRol: new FormControl({ value: "", disabled: true }),
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
  }

  traerRol() {
    if (this.idRol !== 0) {
      this.rolService.getRol(this.idRol).then(res => {
        if (res["tipo"] == 2) {
        } else {
          if (res) {
            this.rol = res["data"];
            
            this.newForm = {
              idRol: this.rol["idRol"],
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

  traerFuncionesRol() {
    console.log("Traer Funciones");
  }

}
