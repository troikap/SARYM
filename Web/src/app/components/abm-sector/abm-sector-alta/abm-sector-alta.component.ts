import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { SectorService } from "../../../services/sector/sector.service";
import { Sector } from "src/app/model/sector/sector.model";

@Component({
  selector: "app-abm-sector-alta",
  templateUrl: "./abm-sector-alta.component.html",
  styleUrls: ["./abm-sector-alta.component.css"]
})
export class AbmSectorAltaComponent implements OnInit {
  form: FormGroup;
  sectorEncontrado: boolean;
  idSector: string = "";

  private newForm = {};
  private sector: Sector;

  constructor(private sectorService: SectorService, private router: Router) {
    this.form = new FormGroup({
      id: new FormControl({ value: "", disabled: true }),
      codigo: new FormControl("", Validators.required),
      nombre: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.ponerBuscador();
  }

  verificarValidacionCampo(
    pNombreCampo: string,
    arregloValidaciones: string[]
  ) {
    let countValidate = 0;
    for (let validacion of arregloValidaciones) {
      if (validacion === "valid") {
        if (this.form.controls[pNombreCampo].valid) {
          countValidate++;
        }
      }
      if (validacion === "invalid") {
        if (this.form.controls[pNombreCampo].invalid) {
          countValidate++;
        }
      }
      if (validacion === "touched") {
        if (this.form.controls[pNombreCampo].touched) {
          countValidate++;
        }
      }
    }

    if (countValidate === arregloValidaciones.length) {
      return true;
    } else {
      return false;
    }
  }

  ponerBuscador() {
    this.form.controls["codigo"].valueChanges.subscribe(res => {
      if (res != "") {
        this.sectorService.getSector(res).subscribe((data: any) => {
          if (data != null) {
            this.sectorEncontrado = true;
            this.idSector = data["idSector"];
          } else {
            this.sectorEncontrado = false;
          }
        });
      } else {
        this.sectorEncontrado = false;
      }
    });
  }

  traerSector() {
    if (this.idSector !== "") {
      this.sectorService.getSector(this.idSector).subscribe((data: any) => {
        if (data != null) {
          this.sector = data;

          this.newForm = {
            id: this.sector["idSector"],
            codigo: this.sector["codSector"],
            nombre: this.sector["nombreSector"]
          };

          this.form.setValue(this.newForm);
        }
      });
    }
  }

  reemplazarSector(): Sector {
    let s = null;
    if (this.sector && this.sector.idSector) {
      s = this.sector.idSector;
    }

    let rempSector: Sector = {
      idSector: s,
      codSector: this.form.value["codigo"],
      nombreSector: this.form.value["nombre"]
    };
    return rempSector;
  }

  guardar() {
    if (this.sectorEncontrado) {
      let unidadSector = this.reemplazarSector();
      this.sectorService.updateSector(unidadSector, "libre").then(response => {
        console.log("ACTUALIZADO", response);
      });
    } else {
      let unidadSector = this.reemplazarSector();
      this.sectorService.createSector(unidadSector, "libre").then(response => {
        console.log("CREADO", response);

        // Asigno ID al formulario//
        this.newForm = {
          id: response.data.idSector,
          codigo: this.form.value["codigo"],
          nombre: this.form.value["nombre"]
        };
        this.form.setValue(this.newForm);
      });
    }
  }
}
