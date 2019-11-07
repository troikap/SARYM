// import * as $ from 'jquery'
import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/reserva/reserva.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-search-gestionar-reserva',
  templateUrl: './search-gestionar-reserva.page.html',
  styleUrls: ['./search-gestionar-reserva.page.scss'],
})
export class SearchGestionarReservaPage implements OnInit {
  
  public listaReservas: any [] = [];
  private currentUsuario;
  private idUsuarioLogueado: number;

  constructor(
    public reservaService: ReservaService,
    private storage: StorageService,
  ) { 
    this.loadCurrentUsuario();
  }

  ngOnInit() {
    //this.getAllElements();
    // this.cargarOnFocus();
  }

  // cargarOnFocus() {
  //   $("#botonBuscar").focus();
  // }

  loadCurrentUsuario() {
    this.storage.getCurrentUsuario().then((data) => {
      this.currentUsuario = data;
      console.log("USUARIO ", this.currentUsuario);
      this.idUsuarioLogueado =  this.currentUsuario.id;
      this.getAllElements();
    });
  }

  getAllElements() {
    this.reservaService.getReservasPorUsuario(this.idUsuarioLogueado)
      .then((res: any) => {
        console.log("getAllElements", res);
        this.listaReservas =  res;
      })
  }

  consultarReserva(pIdReserva: number) {
    console.log("Consultar Reserva", pIdReserva);
    

  }

  editarReserva(pIdReserva: number) {
    console.log("Editar Reserva", pIdReserva);
    
  }

  anularReserva(pIdReserva: number) {
    console.log("Anular Reserva", pIdReserva);
    
  }

  verQrReserva(pIdReserva: number) {
    console.log("Ver QR Reserva", pIdReserva);
    
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
