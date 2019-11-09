import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-reporte-top-menu',
  templateUrl: './reporte-top-menu.component.html',
  styleUrls: ['./reporte-top-menu.component.scss']
})
export class ReporteTopMenuComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels: Label[] = ['Estofado de berengenas', 'Albondiga con papas', 'Milanesa de pollo con pure de papas', 'Paella', 'Picada Don Pepe'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public chartColors: any[] = [
    { backgroundColor: ["#33EDEA", "#6FC8CE", "#ED3633", "#FBF64A", "#5AF097"] }];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56], label: '' }
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
    var rgb = [];

    for(var i = 0; i < 3; i++)
      this.chartColors.push(Math.floor(Math.random() * 255));
    
    //myDiv.style.backgroundColor = 'rgb('+ rgb.join(',') +')';
  }
}