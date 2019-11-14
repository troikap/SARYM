import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-generar-reporte',
  templateUrl: './generar-reporte.component.html',
  styleUrls: ['./generar-reporte.component.scss']
})
export class GenerarReporteComponent implements OnInit {
  
  public mostrar = false;
  public fechaActual;

  constructor() {
    this.fechaActual = new Date().toJSON().split('T')[0];
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

  mostrarReportes(){
    this.mostrar = true;   
  }

  //http://blog.nubecolectiva.com/generar-pdf-con-angular-js-5/
  //https://stackoverflow.com/questions/44088988/html2canvas-in-angular-4

}
