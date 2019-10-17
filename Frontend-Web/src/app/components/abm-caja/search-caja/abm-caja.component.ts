import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CajaService } from '../../../services/caja/caja.service';
import { Caja } from 'src/app/model/caja/caja.model';
import { EstadoCaja } from 'src/app/model/estadoCaja/estadoCaja.model';
import { Usuario } from 'src/app/model/usuario/usuario.model';
import { UsuarioService } from '../../../services/usuario/usuario.service';



@Component({
  selector: 'app-abm-caja',
  templateUrl: './abm-caja.component.html',
  styleUrls: ['./abm-caja.component.css']
})
export class AbmCajaComponent implements OnInit {

  listaCaja: Caja [];
  listaEstadoCaja: any = [];  
  

  constructor(
    // private unidadMedia: UnidadMedida, //Da error
    private cajaService :CajaService,    
    private router: Router,

  ) { }

  ngOnInit() {
    this.getAllCaja();   
    this.getAllEstadoCaja();   
  }

  buscarCaja(termino: string) {
    
    console.log(termino);

    if (termino !== null) {
      this.cajaService.getCajasByAll(termino)
      .subscribe((data: any) => { // Llamo a un Observer
        console.log(data);
        if (data != null) {
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

  getAllEstadoCaja() {
    this.cajaService.getEstadosCaja()
      .then((res: any) => {
        //console.log(res);
        this.listaEstadoCaja =  res.data;
      })

  }
  

  abmCaja(idElemento: number, accion: string) {
    console.log("idElemento: ", idElemento);
    console.log("accion: ", accion);

    this.router.navigate( [`/caja_crud/${idElemento}/${accion}`] );
  }

}
