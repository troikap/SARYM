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

  listaCaja: any = [];
  listaEstadoCaja: any = [];  
  listaCajaEstado: any = [];
  listaUsuario: any = [];

  constructor(
    // private unidadMedia: UnidadMedida, //Da error
    private cajaService :CajaService,
    private usuarioService: UsuarioService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.getAllCaja();
    this.getAllEstadoCaja();
    this.getAllUsuarios();
  }

  buscarCaja(termino: number) {
    
    console.log(termino);

    if (termino !== null) {
      this.cajaService.getCajaByNro(termino)
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
    this.cajaService.getAllCaja()
      .then((res: any) => {
        //console.log(res);
        this.listaCaja =  res.data;         
                
      })

  }

  getAllEstadoCaja() {
    this.cajaService.getAllEstadoCaja()
      .then((res: any) => {
        //console.log(res);
        this.listaEstadoCaja =  res.data;
      })

  }

  getAllUsuarios() {
    this.usuarioService.getUsuarios()
      .then((res: any) => {
        // console.log(res);
        this.listaUsuario =  res.data;
      })

  }

  abmCaja(idElemento: number, accion: string) {
    console.log("idElemento: ", idElemento);
    console.log("accion: ", accion);

    this.router.navigate( [`/caja_crud/${idElemento}/${accion}`] );
  }

}
