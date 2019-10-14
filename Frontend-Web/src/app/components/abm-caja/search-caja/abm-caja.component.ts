import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { UnidadMedida } from '../../model/unidad-medida/unidad-medida.model'; //Da error
import { CajaService } from '../../../services/caja/caja.service';
import { Caja } from 'src/app/model/caja/caja.model';



@Component({
  selector: 'app-abm-caja',
  templateUrl: './abm-caja.component.html',
  styleUrls: ['./abm-caja.component.css']
})
export class AbmCajaComponent implements OnInit {

  listaCaja: any = [];

  constructor(
    // private unidadMedia: UnidadMedida, //Da error
    private cajaService :CajaService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.getAllCaja();
  }

  buscarCaja(termino: string) {
    
    console.log(termino);

    if (termino.trim() !== "") {
      this.cajaService.getCajaByName(termino)
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
      this.getAllCaja();
    }
  }

  getAllCaja() {
    this.unidadMedidaService.getAllCaja()
      .then((res: any) => {
        // console.log(res);
        this.listaCaja =  res.data;
      })

  }

  abmUnidadMedida(idElemento: number, accion: string) {
    console.log("idElemento: ", idElemento);
    console.log("accion: ", accion);

    this.router.navigate( [`/unidadmedida_crud/${idElemento}/${accion}`] );
  }

}
