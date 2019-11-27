import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CajaService } from '../../../services/caja/caja.service';
import * as $ from 'jquery'

@Component({
  selector: "app-abm-abrir-caja",
  templateUrl: "./abm-abrir-caja.component.html",
  styleUrls: ["./abm-abrir-caja.component.css"]
})
export class AbmAbrirCajaComponent implements OnInit {
  listaCaja: any = [];
  listaEstadoCaja: any = [];
  listaCajasmensaje: any[] = [];

  constructor(
    // private unidadMedia: UnidadMedida, //Da error
    private cajaService: CajaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllCaja();
    this.cargarOnFocus();
  }
  cargarOnFocus() {
    $("#botonBuscar").focus();
  }
  buscarCaja(termino: string) {
    this.listaCajasmensaje = [];
    if (termino !== "") {
      this.cajaService.getCajasByAll(termino).subscribe((data: any) => {
        // Llamo a un Observer
        if (data != null) {
          this.listaCaja = data;
          data.forEach(item => {
            if (item["cajaestados"][0].estadocaja.idEstadoCaja == 3 || item["cajaestados"][0].estadocaja.idEstadoCaja == 1) {
              this.listaCajasmensaje.push(item);
            }
          });
        } else {
          this.listaCaja = [];
        }
      });
    } else {
      this.getAllCaja();
    }
  }

  getAllCaja() {
    this.listaCajasmensaje = [];
    this.cajaService.getCajas().then((res: any) => {
      res.data.forEach(item => {
        if (item["cajaestados"][0].estadocaja.idEstadoCaja == 3 || item["cajaestados"][0].estadocaja.idEstadoCaja == 1) {
          this.listaCajasmensaje.push(item);
        }
      });
      this.listaCaja = res.data;
    });
  }

  abmCaja(idElemento: number, accion: string) {
    this.router.navigate([`/abrircaja/${idElemento}/${accion}`]);
  }
}
