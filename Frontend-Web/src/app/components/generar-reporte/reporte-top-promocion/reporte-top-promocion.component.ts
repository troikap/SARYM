import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-reporte-top-promocion',
  templateUrl: './reporte-top-promocion.component.html',
  styleUrls: ['./reporte-top-promocion.component.scss']
})
export class ReporteTopPromocionComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels: Label[] = ['Tacos de carne con jamon', 'Pizza Mozzarela + Quilmes', 'Hamburguesas con papas', 'Panchos 2x1', 'Papas Fritas Don Pepe'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;

  public chartColors: any[] = [
    { backgroundColor: ["#5CCF3A", "#E2ED33", "#3390ED", "#A933ED", "#ED33BA"] }];

  public barChartData: ChartDataSets[] = [
    { data: [165, 100, 80, 250, 25], label: '' }
  ];


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

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }
}