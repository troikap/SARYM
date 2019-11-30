import { Component, OnInit } from "@angular/core";
import { Mesa } from "src/app/models/modelos";
import { MesaService } from "src/app/services/mesa/mesa.service";
import { NavController } from '@ionic/angular';
import { StorageService, Log } from '../../../../services/storage/storage.service';
import { element } from 'protractor';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

@Component({
  selector: "app-mostrar-mesas",
  templateUrl: "./mostrar-mesas.page.html",
  styleUrls: ["./mostrar-mesas.page.scss"]
})
export class MostrarMesasPage implements OnInit {
  public mesas: Mesa[];
  public idMesasSeleccionadas: Number[] = [];
  public algo: any;
  public checkBoxList = [];
  public form: FormGroup;

  constructor(
    private mesaservicio: MesaService,
    private formBuilder: FormBuilder,
    public navController: NavController,
    private storage: StorageService
  ) {
    this.form = this.formBuilder.group({
      idMesa: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.traerMesas();
    this.setearCheck();
  }

  traerMesas() {
    this.mesaservicio.getMesas().then(resp => {
      this.mesas = resp;
      for (let mesa of resp) {
        this.checkBoxList.push({
          value: mesa.idMesa,
          descripcion: `Mesa: N° ${mesa.nroMesa} - Cap: ${mesa.capacidadMesa}p - Sec: ${mesa.sector.nombreSector}`,
          isChecked: false
        });
      }
    });
  }

  checkEvent(position) {
    this.checkBoxList[position].isChecked = !this.checkBoxList[position]
      .isChecked;
    let valid = false;
    for (let item of this.checkBoxList) {
      if (item.isChecked) {
        valid = true;
      }
    }
    if (valid) {
      this.form.controls.idMesa.setValue(true);
    } else {
      this.form.controls.idMesa.setValue(null);
    }
  }

  comprobarCheck(): Array<Number> {
    for (let item of this.checkBoxList) {
      if (item.isChecked) {
        this.idMesasSeleccionadas.push(item.value);
      }
    }
    console.log("Mesas Seleccionadas", this.idMesasSeleccionadas);
    return this.idMesasSeleccionadas;
  }

  setearCheck() {
    this.storage.getOneObject("idMesasSeleccionadas").then(res => {
      //me traer 2 y 3
      console.log("ressss", res)
      console.log("Tipo",typeof(res));
      
      

      res.forEach(element => {
        if (element == this.checkBoxList.indexOf) {
          this.checkBoxList.push({
            isChecked: true
          });
        }
      });
    });
  }

  navigateBack() {
    this.storage.setOneObject("idMesasSeleccionadas", this.comprobarCheck());
    this.navController.navigateBack("generar-estadia");
  }
}
