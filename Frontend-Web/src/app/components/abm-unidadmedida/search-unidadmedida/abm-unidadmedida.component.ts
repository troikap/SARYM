import * as $ from 'jquery'
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { UnidadMedida } from '../../model/unidad-medida/unidad-medida.model'; //Da error
import { UnidadMedidaService } from '../../../services/unidad-medida/unidad-medida.service';

@Component({
  selector: 'app-abm-unidadmedida',
  templateUrl: './abm-unidadmedida.component.html',
  styleUrls: ['./abm-unidadmedida.component.scss']
})
export class AbmUnidadmedidaComponent implements OnInit {

  listaUnidadMedida: any = [];

  constructor(
    // private unidadMedia: UnidadMedida, //Da error
    private unidadMedidaService :UnidadMedidaService,
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
    
    console.log(termino);

    if (termino.trim() !== "") {
      this.unidadMedidaService.getUnidadMedidaByAll(termino)
      .subscribe((data: any) => { // Llamo a un Observer
        console.log(data);
        if (data != null) {
          console.log("RESULT ----------------->", data);
          this.listaUnidadMedida = data;

          // this.listaUnidadMedida.push(data); // Para insertar un solo elemento
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
        console.log(res);
        this.listaUnidadMedida =  res.data;
      })
  }

  crudElemento(idElemento: number, accion: string) {
    console.log("idElemento: ", idElemento);
    console.log("accion: ", accion);

    this.router.navigate( [`/unidadmedida_crud/${idElemento}/${accion}`] );
  }

}
