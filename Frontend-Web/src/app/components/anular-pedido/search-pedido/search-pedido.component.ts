import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MozoEstadiaService} from '../../../services/mozo-estadia/mozo-estadia'
import * as $ from 'jquery'

@Component({
  selector: 'app-search-pedido',
  templateUrl: './search-pedido.component.html',
  styleUrls: ['./search-pedido.component.scss']
})
export class SearchPedidoComponent implements OnInit {

  listaUsuarios : any[] = [];
  listaEstadias: any[] = [];
  listaEstadiasmensaje : any[]=[];

  constructor(
    private router: Router,
    private mozoestadiaservicio: MozoEstadiaService
  ) {
    
   }

  ngOnInit() {
    this.getAllEstadias();
    this.cargarOnFocus();
  }
  cargarOnFocus() {
    $("#botonBuscar").focus();
  }
  buscarEstadia(termino: string) {
    
    console.log(termino);

    if (termino !== "") {
      this.mozoestadiaservicio.getEstadiaByAll(termino)
      .then((data: any) => { // Llamo a un Observer
        console.log(data.data);
        if (data.tipo == 1) {
          console.log("RESULT ----------------->", data);
          this.listaEstadias= [];
          this.listaEstadias.push(data.data);          
        }else{
          this.listaEstadias =[];
        }
      });
    }
    else {
      this.getAllEstadias();
    }
  }
  getAllEstadias() {    
    this.mozoestadiaservicio.getEstadias()
      .then((res: any) => {
        res.data.forEach( (item) => {
        if(item['estadiaestados'][0].estadoestadium.idEstadoEstadia ==1){
         this.listaEstadiasmensaje.push(item);
        }
        })
        this.listaEstadias =  res.data;         
        console.log(res); 
      })

  }

  

 editEstadia(idElemento: number) {
    console.log("idElemento: ", idElemento);  

  this.router.navigate( [`/edit_anular_pedido/${idElemento}`] );

  }

}
