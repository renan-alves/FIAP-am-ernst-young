import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';


@Component({
  selector: 'budget-atual',
  templateUrl: './budget-atual.component.html',
  styleUrls: ['./budget-atual.component.scss']
})
export class BudgetAtualComponent implements OnInit, AfterViewInit {

  @Input() jobLevelVersusQuantity: { jobLevel: string, Count: number }[];

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.verticalBarChartMethod();
  }

  @ViewChild('verticalBarCanvas') private verticalBarCanvas: ElementRef;

  verticalBarChartMethod() {
    const labels = this.jobLevelVersusQuantity.map(level => level.jobLevel);
    const backgroundColors = ['#fde51c'];

    const data = {
      labels: labels,
      datasets: [{
        label: 'Nível x Quantidade de funcionários',
        data: this.jobLevelVersusQuantity.map(count => count.Count),
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        borderWidth: 1
      }]
    }

    this.verticalBarCanvas = new Chart(this.verticalBarCanvas.nativeElement,
      {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: false,
            }
          }
        }
      }
    )
  }
}
