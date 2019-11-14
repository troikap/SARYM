import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CajaService } from "../../../services/caja/caja.service";

@Component({
  selector: "app-edit-generar-movimiento-caja",
  templateUrl: "./edit-generar-movimiento-caja.component.html",
  styleUrls: ["./edit-generar-movimiento-caja.component.css"]
})
export class EditGenerarMovimientoCajaComponent implements OnInit {
  listaMovimientoCaja: any = [];
  caja: any;
  idCaja;
  accionGet;

  constructor(
    // private unidadMedia: UnidadMedida, //Da error
    private cajaService: CajaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.accionGet = params.accion;
      this.idCaja = params.id;
      this.buscarMovimientosCaja();
    });
  }

  ngOnInit() {}

  buscarCaja(termino: string) {
    if (termino !== "") {
      this.cajaService.getCajasByAll(termino).subscribe((data: any) => {
        // Llamo a un Observer
        if (data != null) {
          this.caja = data;
          this.listaMovimientoCaja = this.caja.movimientocajas;
        }
      });
    } else {
      this.buscarMovimientosCaja();
    }
  }

  buscarMovimientosCaja() {
    if (this.idCaja !== "") {
      this.cajaService.getCaja(this.idCaja).subscribe((data: any) => {
        // Llamo a un Observer
        if (data != "") {
          this.caja = data;
          this.listaMovimientoCaja = this.caja.movimientocajas;
        }
      });
    }
  }

  abmMovimientoCaja() {
    this.router.navigate([`/generarmovimientocaja_crud/${this.idCaja}`]);
  }
}
