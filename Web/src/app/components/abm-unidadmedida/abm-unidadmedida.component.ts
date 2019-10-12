import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { UnidadMedida } from '../../model/unidad-medida/unidad-medida.model'; //Da error
import { UnidadMedidaService } from '../../services/unidad-medida/unidad-medida.service';



@Component({
  selector: 'app-abm-unidadmedida',
  templateUrl: './abm-unidadmedida.component.html',
  styleUrls: ['./abm-unidadmedida.component.css']
})
export class AbmUnidadmedidaComponent implements OnInit {

  listaUnidadMedida: any;

  unidadMedidaParticular: any;

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
      this.unidadMedidaService.getUnidadMedida(termino)
      .subscribe((data: any) => { // Llamo a un Observer
        console.log(data);
        if (data != null) {
          this.unidadMedidaParticular = data;
          this.listaUnidadMedida = [];
          // console.log("RESULT ----------------->", this.unidadMedidaParticular);
          this.listaUnidadMedida.push(data);
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

}
