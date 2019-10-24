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
      'rgba(255,0,0,0.3)', 
      'rgba(0,255,0,0.3)', 
      'rgba(100,0,200,0.3)',
      'rgba(22,31,255,0.3)',
      'rgba(0,255,255,1.3)',
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

changeLabels() {
  const words = ['hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
    'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
    'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
    'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
    'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny'];
  const randomWord = () => words[Math.trunc(Math.random() * words.length)];
  this.pieChartLabels = Array.apply(null, { length: 3 }).map(_ => randomWord());
}

addSlice() {
  this.pieChartLabels.push(['Line 1', 'Line 2', 'Line 3']);
  this.pieChartData.push(400);
  this.pieChartColors[0].backgroundColor.push('rgba(196,79,244,0.3)');
}

removeSlice() {
  this.pieChartLabels.pop();
  this.pieChartData.pop();
  this.pieChartColors[0].backgroundColor.pop();
}

changeLegendPosition() {
  this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
}
}
