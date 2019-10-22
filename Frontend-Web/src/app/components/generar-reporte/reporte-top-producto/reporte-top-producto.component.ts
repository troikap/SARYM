import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';


@Component({
  selector: 'app-reporte-top-producto',
  templateUrl: './reporte-top-producto.component.html',
  styleUrls: ['./reporte-top-producto.component.scss']
})
export class ReporteTopProductoComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels: Label[] = ['RANGO - FECHAS'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40, 67, 89, 24, 12, 100], label: 'A' },
    { data: [45, 21, 5, 78, 100, 22, 51, 88, 53, 1, 123, 11], label: 'B' },
    { data: [21, 49, 10, 11, 26, 55, 17, 47, 19, 84, 42, 100], label: 'C' },
    { data: [35, 99, 40, 31, 46, 25, 62, 17, 29, 34, 22, 100], label: 'D' },
    { data: [75, 79, 60, 61, 16, 15, 32, 7, 33, 14, 92, 100], label: 'E' },
  ];

  constructor() { }

  ngOnInit() {
    console.log("DOCUMENTOOO", document);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

}