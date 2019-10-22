import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CajaService } from '../../../services/caja/caja.service';
import { CajaEdit } from 'src/app/model/caja/caja.model';




@Component({
  selector: 'app-abm-abrir-caja',
  templateUrl: './abm-abrir-caja.component.html',
  styleUrls: ['./abm-abrir-caja.component.css']
})
export class AbmAbrirCajaComponent implements OnInit {

  listaCaja: CajaEdit [];
  listaEstadoCaja: any = [];  
  

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

    if (termino !== "") {
      this.cajaService.getCajasByAll(termino)
      .subscribe((data: any) => { // Llamo a un Observer
        console.log(data);
        if (data != "") {
          console.log("RESULT ----------------->", data);
          this.listaCaja = data;          
        }
      });
    }
    else {
      this.getAllCaja();
    }
  }

  getAllCaja() {    
    this.cajaService.getCajas()
      .then((res: any) => {
       
        this.listaCaja =  res.data;         
        console.log(res); 
      })

  }

  

  abmCaja(idElemento: number, accion: string) {
    console.log("idElemento: ", idElemento);
    console.log("accion: ", accion);   

  this.router.navigate( [`/abrircaja/${idElemento}/${accion}`] );

  }

}
