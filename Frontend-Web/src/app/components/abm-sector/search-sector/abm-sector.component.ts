import * as $ from 'jquery'
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SectorService } from 'src/app/services/sector/sector.service';


@Component({
  selector: 'app-abm-sector',
  templateUrl: './abm-sector.component.html',
  styleUrls: ['./abm-sector.component.scss']
})
export class AbmSectorComponent implements OnInit {

  listaSectores: any = [];

  constructor(
    private sectorService: SectorService,
    private router: Router,

  ) { }


  ngOnInit() {
    this.getAllElements();
    this.cargarOnFocus();
  }

  cargarOnFocus() {
    $("#botonBuscar").focus();
  }

  buscarElemento(termino: string) {

    console.log(termino);

    if (termino.trim() !== "") {
      this.sectorService.getSectorByAll(termino)
        .subscribe((data: any) => { // Llamo a un Observer
          console.log(data);
          if (data != null) {
            console.log("RESULT ----------------->", data);
            this.listaSectores = data;
          }
        });
    }
    else {
      this.getAllElements();
    }
  }

  getAllElements() {
    this.sectorService.getSectores()
      .then((res: any) => {
        console.log("TRAIGO: ", res);
        this.listaSectores = res.data;
      })

  }

  crudElemento(idElemento: number, accion: string) {
    console.log("idElemento: ", idElemento);
    console.log("accion: ", accion);

    this.router.navigate([`/sector_crud/${idElemento}/${accion}`]);
  }

}