import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'salario-medio',
  templateUrl: './salario-medio.component.html',
  styleUrls: ['./salario-medio.component.scss']
})
export class SalarioMedioComponent implements OnInit, AfterViewInit {
  @ViewChild('barCanvas') private barCanvas: ElementRef;

  @Input() salaryAverage: { jobRole: string, SalaryAverage: number }[];

  constructor() { }

  ngOnInit() {
  }
  
  ngAfterViewInit(): void {
    this.barChartMethod();
  }
  
  barChartMethod() {
    const backgroundColors = [
      '#fde51c',
    ];
    
    this.barCanvas = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.salaryAverage.map(salary => salary.jobRole),
        datasets: [{
          label: 'Salário médio',
          data: this.salaryAverage.map(salary => salary.SalaryAverage),
          backgroundColor: backgroundColors,
          borderColor: backgroundColors,
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        plugins: {
          legend: {
            display: false,
          }
        },
      }
    });
  }
}
