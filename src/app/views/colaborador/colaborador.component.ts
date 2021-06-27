import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.scss']
})
export class ColaboradorComponent implements OnInit, AfterViewInit {
  @ViewChild('radarCanvas') private radarCanvas: ElementRef;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.radarChartMethod();
  }

  radarChartMethod() {
    const labels = ['Trabalho em Equipe', 'Entregas', 'Nível Acadêmico', 'Demanda', 'Assinuidade', 'Remuneração no Mercado'];
    const data = {
      labels: labels,
      datasets: [{
        data: [1, 2, 3, 4, 5, 6]
      },
      {
        data: [7, 8, 9, 10, 11, 12]
      },
      {
        data: [7, 8, 9, 10, 11, 12]
      },
      ]
    };

    this.radarCanvas = new Chart(this.radarCanvas.nativeElement,
      {
        type: 'radar',
        options: {
          maintainAspectRatio: false,
        },
        data: data,

      })
  }
}
