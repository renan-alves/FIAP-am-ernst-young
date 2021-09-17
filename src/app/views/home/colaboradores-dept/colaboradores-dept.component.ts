import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { Aspect6 } from 'chartjs-plugin-colorschemes/src/colorschemes/colorschemes.office';

@Component({
  selector: 'colaboradores-dept',
  templateUrl: './colaboradores-dept.component.html',
  styleUrls: ['./colaboradores-dept.component.scss']
})
export class ColaboradoresDeptComponent implements OnInit, AfterViewInit {
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;

  @Input() employeesCount: { jobRole: string, Count: number }[] = [];

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
          labels: this.employeesCount.map(employees => employees.jobRole),
          datasets: [{
            label: this.employeesCount.map(employees => employees.jobRole),
            data: this.employeesCount.map(employees => employees.Count),
            fill: false,
            tension: 0.1,
            backgroundColor: Aspect6,
            borderColor: Aspect6,
          }]
        }
      }
    )
  }
}
