import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CajaService } from '../../../services/caja/caja.service';
import { CajaEdit } from 'src/app/model/caja/caja.model';
import * as $ from 'jquery'



@Component({
  selector: 'app-abm-generar-movimiento-caja',
  templateUrl: './abm-generar-movimiento-caja.component.html',
  styleUrls: ['./abm-generar-movimiento-caja.component.css']
})
export class AbmGenerarMovimientoCajaComponent implements OnInit {

  listaCaja: any = [];
  listaEstadoCaja: any = [];  
  listaCajasmensaje: any[]=[];

  constructor(
    // private unidadMedia: UnidadMedida, //Da error
    private cajaService :CajaService,    
    private router: Router,

  ) { }

  ngOnInit() {
    this.getAllCaja();   
     this.cargarOnFocus();
  }
  cargarOnFocus() {
    $("#botonBuscar").focus();
  }
  buscarCaja(termino: string) {
    
    console.log(termino);

    if (termino !== "") {
      this.cajaService.getCajasByAll(termino)
      .subscribe((data: any) => { // Llamo a un Observer
        console.log(data);
        if (data != null) {
          console.log("RESULT ----------------->", data);
          this.listaCaja = data;          
        }else{
          this.listaCaja =[];
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
        res.data.forEach( (item) => {
          if(item['cajaestados'][0].estadocaja.idEstadoCaja ==2){
           this.listaCajasmensaje.push(item);
          }
          })
       
        this.listaCaja =  res.data;         
        console.log(res); 
      })

  }

  

  abmCaja(idElemento: number, accion: string) {
    console.log("idElemento: ", idElemento);
    console.log("accion: ", accion);   

  this.router.navigate( [`/generarmovimientocaja/${idElemento}`] );

  }

}
