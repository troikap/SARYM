// import * as $ from 'jquery'
import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/reserva/reserva.service';

@Component({
  selector: 'app-search-gestionar-reserva',
  templateUrl: './search-gestionar-reserva.page.html',
  styleUrls: ['./search-gestionar-reserva.page.scss'],
})
export class SearchGestionarReservaPage implements OnInit {
  
  public listaReservas: any [] = [];

  constructor(
    public reservaService: ReservaService
  ) { }

  ngOnInit() {
    this.getAllElements();
    // this.cargarOnFocus();
  }

  // cargarOnFocus() {
  //   $("#botonBuscar").focus();
  // }

  getAllElements() {
    this.reservaService.getReservas()
      .then((res: any) => {
        console.log("getAllElements", res);
        this.listaReservas =  res;
      })
  }

  // botonBuscar(termino: any) {
  //   console.log("botonBuscar: ", termino);
  //   if (termino.trim() !== "") {
  //     this.reservaService.getProductosByAll(termino)
  //     .subscribe((data: any) => { // Llamo a un Observer
  //       console.log(data);
  //       if (data != null) {
  //         console.log("RESULT ----------------->", data);
  //         this.listaReservas = data;
  //       }
  //       else {
  //         this.listaReservas = [];
  //       }
  //     });
  //   }
  //   else {
  //     this.getAllElements();
  //   }
  // }

}
