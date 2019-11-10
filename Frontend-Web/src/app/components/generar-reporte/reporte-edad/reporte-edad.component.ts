import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-reporte-edad',
  templateUrl: './reporte-edad.component.html',
  styleUrls: ['./reporte-edad.component.scss']
})
export class ReporteEdadComponent implements OnInit{

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
    public pieChartLabels: Label[] = ['Menores de 18', 'Entre 18 y 65', 'Mayores a 65'];
    public pieChartData: number[] = [300, 500, 100];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;


    public pieChartColors = [
      {
        backgroundColor: ['#65B852', '#3C6DEE', '#EE3F3C'],
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