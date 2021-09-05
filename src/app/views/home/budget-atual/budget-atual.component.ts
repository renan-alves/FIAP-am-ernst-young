import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';


@Component({
  selector: 'budget-atual',
  templateUrl: './budget-atual.component.html',
  styleUrls: ['./budget-atual.component.scss']
})
export class BudgetAtualComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.verticalBarChartMethod();
  }

  @ViewChild('verticalBarCanvas') private verticalBarCanvas: ElementRef;

  verticalBarChartMethod() {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const backgroundColors = ['#fde51c'];

    const data = {
      labels: labels,
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
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
          }
        },
      }
    )
  }
}
