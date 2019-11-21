import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnidadMedidaService } from '../../../services/unidad-medida/unidad-medida.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-abm-unidadmedida',
  templateUrl: './abm-unidadmedida.component.html',
  styleUrls: ['./abm-unidadmedida.component.scss']
})
export class AbmUnidadmedidaComponent implements OnInit {

  listaUnidadMedida: any = [];

  constructor(
    private unidadMedidaService: UnidadMedidaService,
    private router: Router

  ) { }

  ngOnInit() {
    this.getAllElements();
    this.cargarOnFocus();
  }

  cargarOnFocus() {
    $("#botonBuscar").focus();
  }

  buscarElemento(termino: string) {
    if (termino.trim() !== "") {
      this.unidadMedidaService.getUnidadMedidaByAll(termino)
        .subscribe((data: any) => {
          if (data != null) {
            this.listaUnidadMedida = data;
          }
          else {
            this.listaUnidadMedida = [];
          }
        });
    }
    else {
      this.getAllElements();
    }
  }

  getAllElements() {
    this.unidadMedidaService.getAllUnidadMedida()
      .then((res: any) => {
        this.listaUnidadMedida = res.data;
      })
  }

  crudElemento(idElemento: number, accion: string) {
    this.router.navigate([`/unidadmedida_crud/${idElemento}/${accion}`]);
  }
}
