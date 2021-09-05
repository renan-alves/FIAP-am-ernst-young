import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'salario-medio',
  templateUrl: './salario-medio.component.html',
  styleUrls: ['./salario-medio.component.scss']
})
export class SalarioMedioComponent implements OnInit, AfterViewInit {
  @ViewChild('barCanvas') private barCanvas: ElementRef;
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
        labels: ['BJP', 'INC', 'AAP', 'CPI', 'CPI-M', 'NCP'],
        datasets: [{
          label: '# of Votes',
          data: [200, 50, 30, 15, 20, 34],
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
