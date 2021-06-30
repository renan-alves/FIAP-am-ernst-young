import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import { SignalEnum } from 'src/app/_enums/SignalEnum';
import { ColaboradorViewModel } from 'src/app/_models/ColaboradorViewModel';

@Component({
  selector: 'colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.scss']
})
export class ColaboradorComponent implements OnInit, AfterViewInit {
  @ViewChild('radarCanvas') private radarCanvas: ElementRef;
  signalEnum = SignalEnum;
  colaborador: ColaboradorViewModel = new ColaboradorViewModel();

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.getRouteParams();
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

  getRouteParams(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.colaborador.nome = params.nome;
      this.colaborador.cargo = params.cargo;
      this.colaborador.signal = params.signal;
      this.colaborador.ultimoReajuste = params.ultimoReajuste;
      this.colaborador.imagem = params.imagem;
    });
  }
}
