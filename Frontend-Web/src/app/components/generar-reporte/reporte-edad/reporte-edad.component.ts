import { Component, OnInit } from '@angular/core';
import { SingleDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-reporte-edad',
  templateUrl: './reporte-edad.component.html',
  styleUrls: ['./reporte-edad.component.scss']
})
export class ReporteEdadComponent implements OnInit{

  // PolarArea
  public polarAreaChartLabels: Label[] = ['Menores de 18', 'Entre 18 y 65', 'Más de 65'];
  public polarAreaChartData: SingleDataSet = [220, 687, 99];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

  constructor() { }

  ngOnInit() {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
