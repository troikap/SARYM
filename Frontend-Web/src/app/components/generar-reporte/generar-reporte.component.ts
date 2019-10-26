import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-generar-reporte',
  templateUrl: './generar-reporte.component.html',
  styleUrls: ['./generar-reporte.component.scss']
})
export class GenerarReporteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  /*
  generarPDF() {
    let self = this;//use this variable to access your class members inside then().
    html2canvas(document.body).then(canvas => {
      var imgData = canvas.toDataURL("image/png");
      //self.AddImagesResource(imgData);
      document.body.appendChild(canvas);
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF();
      doc.addImage(img, 'PNG', 7, 20, 195, 295);
      doc.save('reportes.pdf');
    });
  }
  */
  //http://blog.nubecolectiva.com/generar-pdf-con-angular-js-5/
  //https://stackoverflow.com/questions/44088988/html2canvas-in-angular-4

}
