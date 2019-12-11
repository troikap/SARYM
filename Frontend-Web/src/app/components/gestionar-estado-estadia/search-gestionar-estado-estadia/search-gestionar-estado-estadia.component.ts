import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MozoEstadiaService} from '../../../services/mozo-estadia/mozo-estadia'
import * as $ from 'jquery'


@Component({
  selector: "app-search-gestionar-estado-estadia",
  templateUrl: "./search-gestionar-estado-estadia.component.html",
  styleUrls: ["./search-gestionar-estado-estadia.component.scss"]
})

export class SearchGestionarEstadoEstadiaComponent implements OnInit {
  listaUsuarios: any[] = [];
  listaEstadias: any[] = [];
  listaEstadiasmensaje: any[] = [];

  constructor(
    private router: Router,
    private mozoestadiaservicio: MozoEstadiaService
  ) {}

  ngOnInit() {
    this.getAllEstadias();
    this.cargarOnFocus();
  }
  cargarOnFocus() {
    $("#botonBuscar").focus();
  }
  buscarEstadia(termino: string) {
    if (termino !== "") {
      this.mozoestadiaservicio.getEstadiaByAll(termino).then((data: any) => {
        // Llamo a un Observer
        if (data.tipo == 1) {
          this.listaEstadias = [];
          this.listaEstadias.push(data.data);
        } else {
          this.listaEstadias = [];
        }
      });
    } else {
      this.getAllEstadias();
    }
  }
  getAllEstadias() {
    this.mozoestadiaservicio.getEstadias()
    .then((res: any) => {
      if (res.tipo != 2) {
        res.data.forEach(item => {
          if (item["estadiaestados"][0].estadoestadium.idEstadoEstadia == 1) {
            this.listaEstadiasmensaje.push(item);
          }
        });
        this.listaEstadias = res.data;
      }
    });
  }

  editEstadia(idElemento: number) {
    this.router.navigate([`/edit_gestionar_estado_estadia/${idElemento}`]);
  }
}
