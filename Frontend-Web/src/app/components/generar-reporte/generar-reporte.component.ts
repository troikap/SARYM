import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { GenerarReporteService } from '../../services/generar-reporte/generar-reporte.service';

@Component({
  selector: 'app-generar-reporte',
  templateUrl: './generar-reporte.component.html',
  styleUrls: ['./generar-reporte.component.scss']
})
export class GenerarReporteComponent implements OnInit {
  
  form: FormGroup;
  public mostrar = false;
  public fechaActual;
  public fechaDesde: Date;
  public fechaHasta: Date;


  constructor( private reporteService: GenerarReporteService ) {
    this.fechaActual = new Date().toJSON().split('T')[0];
    this.form = new FormGroup({
      fechaDesde: new FormControl("", Validators.required),  
      fechaHasta: new FormControl("", Validators.required),  
    });

    this.form.get("fechaDesde").setValidators(Validators.required);
    this.form.get("fechaDesde").updateValueAndValidity();
    this.form.get("fechaHasta").setValidators(Validators.required);
    this.form.get("fechaHasta").updateValueAndValidity();
    this.validadorFecha();
  }

  ngOnInit() {    
  }
  

  async generarPDF() {
    const doc = new jsPDF('p', 'mm', 'a4');
    const options = {
      pagesplit: true
    };
    const ids = document.querySelectorAll('[id]');
    const length = ids.length;
    for (let i = 2; i < length; i++) {
      const chart = document.getElementById(ids[i].id);
      await html2canvas(chart, {
        allowTaint: true,
        useCORS: false,
        width: 850,
        height: 1050,
        // Calidad del PDF
        scale: 2,
      }).then(function (canvas) {
        doc.addImage(canvas.toDataURL('image/png'), 'JPEG', 10, 20, 190, 250);
        if (i < (length - 1)) {
          doc.addPage();
        }
      });
    }
    let fecha = Date.now();
    doc.save('Reporte_Sarym_' + fecha + '.pdf');
  }

  guardar() {
  }

  mostrarReportes() {
    this.fechaDesde = this.form.value["fechaDesde"];
    this.fechaHasta = this.form.value["fechaHasta"];
    console.log("fechaDesde:", this.fechaDesde);
    console.log("fechaHasta:", this.fechaHasta);

    this.validadorFecha();
    // LLAMAR AL SERVICIO DE GER REPORTES
    //this.reporteService.getReportes();
    this.mostrar = true;
  }

  validadorFecha() {
    this.form.get("fechaDesde").valueChanges.subscribe(resp => {
      if (resp < this.form.value.fechaHasta) {
        this.form.controls.fechaHasta.setErrors(null);
      } else {
        this.form.controls.fechaHasta.setErrors({ not_equal: true });
      }
    });
    this.form.get("fechaHasta").valueChanges.subscribe(resp => {
      if (resp > this.form.value.fechaDesde) {
        this.form.controls.fechaHasta.setErrors(null);
      } else {
        this.form.controls.fechaHasta.setErrors({ not_equal: true });
      }
    });
  }

  //http://blog.nubecolectiva.com/generar-pdf-con-angular-js-5/
  //https://stackoverflow.com/questions/44088988/html2canvas-in-angular-4

}
