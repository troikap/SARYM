import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-nueva-reserva',
  templateUrl: './nueva-reserva.page.html',
  styleUrls: ['./nueva-reserva.page.scss'],
})
export class NuevaReservaPage implements OnInit {

  private form: FormGroup;
  private fechaDesde;
  private fechaHasta;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      fechaReserva: [''],
      horaEntrada: [''],
      horaSalida: [''],
      cantidadComensal: [''],
      sector: ['' ],
      nroMesa: ['']
    });
   }

  ngOnInit() {
    this.tratarFecha();
  }

  tratarFecha(){
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let mm2 = date.getMonth() + 1 + 5;
    let yy = date.getFullYear();
    let dia;
    let mes;
    let mes2;
    let año;
    if (mm2 > 12) {
      mm2 = mm2 - 12;
      año = yy + 1;
    }
    if ((dd >= 0) && (dd < 10)) {  
      dia = "0" + String(dd);
    } else {
      dia = dd;
    }
    if ((mm >= 0) && (mm < 10)) {  
      mes = "0" + String(mm);
    } else {
      mes = mm;
    }
    if ((mm2 >= 0) && (mm2 < 10)) {  
      mes2 = "0" + String(mm2);
    } else {
      mes2 = mm2;
    }
    this.fechaDesde = `${yy}-${mes}-${dia}`;
    this.fechaHasta = `${año}-${mes2}-${dia}`;
    console.log( `Desde ${this.fechaDesde} hasta ${this.fechaHasta}`)
  }

}
