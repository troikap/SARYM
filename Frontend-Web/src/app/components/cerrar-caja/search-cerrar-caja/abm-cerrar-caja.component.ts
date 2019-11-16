import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CajaService } from '../../../services/caja/caja.service';
import * as $ from 'jquery'

@Component({
  selector: "app-abm-cerrar-caja",
  templateUrl: "./abm-cerrar-caja.component.html",
  styleUrls: ["./abm-cerrar-caja.component.css"]
})
export class AbmCerrarCajaComponent implements OnInit {
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
    if (termino !== "") {
      this.cajaService.getCajasByAll(termino).subscribe((data: any) => {
        // Llamo a un Observer
        if (data != null) {
          this.listaCaja = data;
        } else {
          this.listaCaja = [];
        }
      });
    } else {
      this.getAllCaja();
    }
  }

  getAllCaja() {
    this.cajaService.getCajas().then((res: any) => {
      res.data.forEach(item => {
        if (item["cajaestados"][0].estadocaja.idEstadoCaja == 2) {
          this.listaCajasmensaje.push(item);
        }
      });

      this.listaCaja = res.data;
    });
  }

  abmCaja(idElemento: number, accion: string) {
    this.router.navigate([`/cerrarcaja/${idElemento}/${accion}`]);
  }
}
