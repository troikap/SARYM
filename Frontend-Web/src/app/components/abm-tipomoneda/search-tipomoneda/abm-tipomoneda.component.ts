import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoMonedaService } from 'src/app/services/tipo-moneda/tipo-moneda.service';
import * as $ from 'jquery'

@Component({
  selector: "app-abm-tipomoneda",
  templateUrl: "./abm-tipomoneda.component.html",
  styleUrls: ["./abm-tipomoneda.component.scss"]
})
export class AbmTipomonedaComponent implements OnInit {
  listaTipoMoneda: any = [];

  constructor(
    private tipoMonedaService: TipoMonedaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllElements();
    this.cargarOnFocus();
  }

  cargarOnFocus() {
    $("#botonBuscar").focus();
  }

  buscarElemento(termino: string) {
    if (termino.trim() !== "") {
      this.tipoMonedaService
        .getTipoMonedaByAll(termino)
        .subscribe((data: any) => {
          // Llamo a un Observer
          if (data != null) {
            this.listaTipoMoneda = data;
          } else {
            this.listaTipoMoneda = [];
          }
        });
    } else {
      this.getAllElements();
    }
  }

  getAllElements() {
    this.tipoMonedaService.getAllTipoMoneda().then((res: any) => {
      this.listaTipoMoneda = res.data;
    });
  }

  crudElemento(idElemento: number, accion: string) {
    this.router.navigate([`/tipomoneda_crud/${idElemento}/${accion}`]);
  }
}
