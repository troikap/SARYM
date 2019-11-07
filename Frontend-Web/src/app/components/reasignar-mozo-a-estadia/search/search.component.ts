import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import {MozoEstadiaService} from '../../../services/mozo-estadia/mozo-estadia'
import * as $ from 'jquery'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  listaUsuarios : any[] = [];
  listaEstadias: any[] = [];
  

  constructor(
    private router: Router,
    private usuarioservicio: UsuarioService,
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
      .subscribe((data: any) => { // Llamo a un Observer
        console.log(data);
        if (data != null) {
          console.log("RESULT ----------------->", data);
          this.listaEstadias = data;          
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
       
        this.listaEstadias =  res.data;         
        console.log(res); 
      })

  }

  

 editEstadia(idElemento: number) {
    console.log("idElemento: ", idElemento);  

  this.router.navigate( [`/edit_mozo_estadia/${idElemento}`] );

  }
}
