import * as $ from 'jquery'
import { Component, OnInit } from '@angular/core';
import { RubroService } from 'src/app/services/rubro/rubro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-abm-rubro',
  templateUrl: './abm-rubro.component.html',
  styleUrls: ['./abm-rubro.component.scss']
})
export class AbmRubroComponent implements OnInit {

  listaRubro: any = [];


  constructor(
    private rubroService :RubroService,
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
      this.rubroService.getRubroByAll(termino)
      .subscribe((data: any) => { // Llamo a un Observer
        console.log(data);
        if (data != null) {
          console.log("RESULT ----------------->", data);
          this.listaRubro = data;
        }
      });
    }
    else {
      this.getAllElements();
    }
  }

  getAllElements() {
    this.rubroService.getAllRubro()
      .then((res: any) => {
        console.log(res);
        this.listaRubro =  res.data;
      })
  }

  crudElemento(idElemento: number, accion: string) {
    console.log("idElemento: ", idElemento);
    console.log("accion: ", accion);

    this.router.navigate( [`/rubro_crud/${idElemento}/${accion}`] );
  }


}
