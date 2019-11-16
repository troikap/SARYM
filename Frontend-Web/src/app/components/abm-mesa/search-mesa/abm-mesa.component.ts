import * as $ from "jquery";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MesaService } from "src/app/services/mesa/mesa.service";

@Component({
  selector: "app-abm-mesa",
  templateUrl: "./abm-mesa.component.html",
  styleUrls: ["./abm-mesa.component.scss"]
})
export class AbmMesaComponent implements OnInit {
  listaMesas: any = [];

  constructor(private mesaService: MesaService, private router: Router) {}

  ngOnInit() {
    this.getAllElements();
    this.cargarOnFocus();
  }

  cargarOnFocus() {
    $("#botonBuscar").focus();
  }

  buscarElemento(termino: string) {
    if (termino.trim() !== "") {
      this.mesaService.getMesaByAll(termino).subscribe((data: any) => {
        // Llamo a un Observer
        if (data != null) {
          this.listaMesas = data;
        } else {
          this.listaMesas = [];
        }
      });
    } else {
      this.getAllElements();
    }
  }

  getAllElements() {
    this.mesaService.getMesas().then((res: any) => {
      this.listaMesas = res.data;
    });
  }

  crudElemento(idElemento: number, accion: string) {
    this.router.navigate([`/mesa_crud/${idElemento}/${accion}`]);
  }
}
