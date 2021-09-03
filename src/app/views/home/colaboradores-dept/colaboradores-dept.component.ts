import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'colaboradores-dept',
  templateUrl: './colaboradores-dept.component.html',
  styleUrls: ['./colaboradores-dept.component.scss']
})
export class ColaboradoresDeptComponent implements OnInit, AfterViewInit {
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.doughnutChartMethod();
  }

  doughnutChartMethod() {
    const backgroundColors = [
      '#c03d3c',
      '#0b5db5',
      '#eab509',
      '#737373'
    ];
    this.doughnutCanvas = new Chart(this.doughnutCanvas.nativeElement,
      {
        type: 'doughnut',
        options: {
          maintainAspectRatio: false,
        },
        data: {
          labels: ['Não', 'sei', 'o', 'que'],
          datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81],
            fill: false,
            tension: 0.1,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors,
          }]
        }
      }
    )
  }
}
