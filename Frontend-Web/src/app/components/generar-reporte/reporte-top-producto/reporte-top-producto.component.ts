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
  public barChartLabels: Label[] = ['Pizza', 'Pancho', 'Empanada','Papas Fritas', 'Hamburguesa'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public chartColors: any[] = [
    { backgroundColor: ["#FF7360", "#6FC8CE", "#78EF26", "#FBF64A", "#F24ACD"] }];

  public barChartData: ChartDataSets[] = [ { data: [89,54,45,89,120] }
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
    if (this.barChartType === 'bar') { 
      //this.barChartLegend = true;
      this.barChartType = 'pie';
    } else if (this.barChartType === 'pie') {
      //this.barChartLegend = false;
      this.barChartType = 'bar';
    }
  }
}