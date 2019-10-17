import * as $ from 'jquery'
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoMonedaService } from 'src/app/services/tipo-moneda/tipo-moneda.service';

@Component({
  selector: 'app-abm-tipomoneda',
  templateUrl: './abm-tipomoneda.component.html',
  styleUrls: ['./abm-tipomoneda.component.scss']
})
export class AbmTipomonedaComponent implements OnInit {

  listaTipoMoneda: any = [];

  constructor(
    // private unidadMedia: TipoMoneda, //Da error
    private tipoMonedaService: TipoMonedaService,
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
      this.tipoMonedaService.getTipoMonedaByAll(termino)
      .subscribe((data: any) => { // Llamo a un Observer
        console.log(data);
        if (data != null) {
          console.log("RESULT ----------------->", data);
          this.listaTipoMoneda = data;

          // this.listaTipoMoneda.push(data); // Para insertar un solo elemento
        }
      });
    }
    else {
      this.getAllElements();
    }
  }

  getAllElements() {
    this.tipoMonedaService.getAllTipoMoneda()
      .then((res: any) => {
        console.log(res);
        this.listaTipoMoneda =  res.data;
      })
  }

  crudElemento(idElemento: number, accion: string) {
    console.log("idElemento: ", idElemento);
    console.log("accion: ", accion);

    this.router.navigate( [`/tipomoneda_crud/${idElemento}/${accion}`] );
  }

}
