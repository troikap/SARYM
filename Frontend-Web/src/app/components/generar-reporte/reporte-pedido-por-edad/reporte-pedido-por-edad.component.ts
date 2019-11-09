import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-reporte-pedido-por-edad',
  templateUrl: './reporte-pedido-por-edad.component.html',
  styleUrls: ['./reporte-pedido-por-edad.component.scss']
})
export class ReportePedidoPorEdadComponent implements OnInit {

// Pie
public pieChartOptions: ChartOptions = {
  responsive: true,
  legend: {
    position: 'top',
  },
  plugins: {
    datalabels: {
      formatter: (value, ctx) => {
        const label = ctx.chart.data.labels[ctx.dataIndex];
        return label;
      },
    },
  }
};
public pieChartLabels: Label[] = [['Papas Fritas'], ['Pancho'], ['Fideos'], ['Coca Cola'], ['Piza']];
public pieChartData: number[] = [300, 500, 100, 900, 440];
public pieChartType: ChartType = 'pie';
public pieChartLegend = true;
//public pieChartPlugins = [pluginDataLabels];
public pieChartColors = [
  {
    backgroundColor: [
      '#F1AE28', 
      '#43F128', 
      '#28DFF1',
      '#F12828',
      '#9628F1',
    ],
  },
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
}
