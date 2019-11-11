import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CajaService } from '../../../services/caja/caja.service';


@Component({
  selector: 'app-edit-generar-movimiento-caja',
  templateUrl: './edit-generar-movimiento-caja.component.html',
  styleUrls: ['./edit-generar-movimiento-caja.component.css']
})
export class EditGenerarMovimientoCajaComponent implements OnInit {

  listaMovimientoCaja: any = [];
  caja: any;
  idCaja;
  accionGet;  
  

  constructor(
    // private unidadMedia: UnidadMedida, //Da error
    private cajaService :CajaService,    
    private router: Router,
    private activatedRoute: ActivatedRoute
    

  ) {
    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);
      this.accionGet = params.accion;
      this.idCaja = params.id;
      
        this.buscarMovimientosCaja();     
      
    });
   }

  ngOnInit() {   
     
  }
  
  buscarCaja(termino: string) {
    
    console.log(termino);

    if (termino !== "") {
      this.cajaService.getCajasByAll(termino)
      .subscribe((data: any) => { // Llamo a un Observer
        console.log(data);
        if (data != null) {
          console.log("RESULT ----------------->", data);
          this.caja = data;
          this.listaMovimientoCaja = this.caja.movimientocajas;                 
        }
      });
    }else{
      this.buscarMovimientosCaja();
    }   
  }

  buscarMovimientosCaja() {
    
    console.log(this.idCaja);

    if (this.idCaja !== "") {
      this.cajaService.getCaja(this.idCaja)
      .subscribe((data: any) => { // Llamo a un Observer
        console.log(data);
        if (data != "") {
          //console.log("RESULT ----------------->", data);
          this.caja = data;
          this.listaMovimientoCaja = this.caja.movimientocajas;
           
          console.log(this.listaMovimientoCaja);                
        }
      });
    }   
  }

 
  

  abmMovimientoCaja() {
    
    

  this.router.navigate( [`/generarmovimientocaja_crud/${this.idCaja}`] );

  }

}
