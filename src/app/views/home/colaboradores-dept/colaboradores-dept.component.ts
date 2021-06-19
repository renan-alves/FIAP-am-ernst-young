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
    this.doughnutCanvas = new Chart(this.doughnutCanvas.nativeElement,
      {
        type: 'doughnut',
        options: {
          maintainAspectRatio: false,

        },
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        }
      }
    )
  }
}
