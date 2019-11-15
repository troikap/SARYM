import { Component, OnInit } from '@angular/core';
import { RubroService } from 'src/app/services/rubro/rubro.service';
import { Router } from '@angular/router';
import * as $ from 'jquery'

@Component({
  selector: "app-abm-rubro",
  templateUrl: "./abm-rubro.component.html",
  styleUrls: ["./abm-rubro.component.scss"]
})
export class AbmRubroComponent implements OnInit {
  listaRubro: any = [];

  constructor(private rubroService: RubroService, private router: Router) {}

  ngOnInit() {
    this.getAllElements();
    this.cargarOnFocus();
  }

  cargarOnFocus() {
    $("#botonBuscar").focus();
  }

  buscarElemento(termino: string) {
    if (termino.trim() !== "") {
      this.rubroService.getRubroByAll(termino).subscribe((data: any) => {
        // Llamo a un Observer
        if (data != null) {
          this.listaRubro = data;
        } else {
          this.listaRubro = [];
        }
      });
    } else {
      this.getAllElements();
    }
  }

  getAllElements() {
    this.rubroService.getAllRubro().then((res: any) => {
      this.listaRubro = res.data;
    });
  }

  crudElemento(idElemento: number, accion: string) {
    this.router.navigate([`/rubro_crud/${idElemento}/${accion}`]);
  }
}
