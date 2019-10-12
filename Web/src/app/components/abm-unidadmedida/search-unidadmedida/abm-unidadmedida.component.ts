import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { UnidadMedida } from '../../model/unidad-medida/unidad-medida.model'; //Da error
import { UnidadMedidaService } from '../../../services/unidad-medida/unidad-medida.service';



@Component({
  selector: 'app-abm-unidadmedida',
  templateUrl: './abm-unidadmedida.component.html',
  styleUrls: ['./abm-unidadmedida.component.css']
})
export class AbmUnidadmedidaComponent implements OnInit {

  listaUnidadMedida: any = [];

  constructor(
    // private unidadMedia: UnidadMedida, //Da error
    private unidadMedidaService :UnidadMedidaService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.getAllUnidadMedida();
  }

  buscarUnidadMedida(termino: string) {
    
    console.log(termino);

    if (termino.trim() !== "") {
      this.unidadMedidaService.getUnidadMedidaByName(termino)
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
      this.getAllUnidadMedida();
    }
  }

  getAllUnidadMedida() {
    this.unidadMedidaService.getAllUnidadMedida()
      .then((res: any) => {
        // console.log(res);
        this.listaUnidadMedida =  res.data;
      })

  }

  abmUnidadMedida(idElemento: number, accion: string) {
    console.log("idElemento: ", idElemento);
    console.log("accion: ", accion);

    this.router.navigate( [`/unidadmedida_create/${idElemento}/${accion}`] );
  }

}
