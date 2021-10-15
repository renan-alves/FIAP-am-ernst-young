import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'distribuicao-colaboradores',
  templateUrl: './distribuicao-colaboradores.component.html',
  styleUrls: ['./distribuicao-colaboradores.component.scss']
})
export class DistribuicaoColaboradoresComponent implements OnInit, AfterViewInit {
  @ViewChild('scatterCanvas') private scatterCanvas: ElementRef;
  @Input() yearsVersusSalary: { x: number, y: number }[];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.scatterChartMethod();
  }

  scatterChartMethod() {
    const data = {
      datasets: [{
        label: 'Anos x Salário',
        data: this.yearsVersusSalary,
        backgroundColor: 'rgb(255, 99, 132)'
      }],
    };

    this.scatterCanvas = new Chart(this.scatterCanvas.nativeElement,
      {
        type: 'scatter',
        data: data,
        options: {
          scales: {
            x: {
              type: 'linear',
              position: 'bottom'
            }
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              displayColors: false,
              callbacks: {
                label: (context) => {
                  const {x, y} = context.element.parsed;
                  return `${x} anos x R$ ${y}`;
                }
              }
            }
          }
        }
      }
    )
  }
}
