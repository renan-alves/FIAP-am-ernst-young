import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'distribuicao-colaboradores',
  templateUrl: './distribuicao-colaboradores.component.html',
  styleUrls: ['./distribuicao-colaboradores.component.scss']
})
export class DistribuicaoColaboradoresComponent implements OnInit, AfterViewInit {
  @ViewChild('scatterCanvas') private scatterCanvas: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.scatterChartMethod();
  }

  scatterChartMethod() {
    const data = {
      datasets: [{
        label: 'Scatter Dataset',
        data: [{
          x: -10,
          y: 0
        }, {
          x: 0,
          y: 10
        }, {
          x: 10,
          y: 5
        }, {
          x: 0.5,
          y: 5.5
        }],
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
          }
        }
      }
    )
  }
}
