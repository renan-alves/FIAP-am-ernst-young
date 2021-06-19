import { Component, OnInit } from '@angular/core';
import { SignalEnum } from 'src/app/_enums/SignalEnum';
import { ColaboradorMinimalViewModel } from 'src/app/_models/ColaboradorMinimalViewModel';

@Component({
  selector: 'colobaradores-sinalizados',
  templateUrl: './colobaradores-sinalizados.component.html',
  styleUrls: ['./colobaradores-sinalizados.component.scss']
})
export class ColobaradoresSinalizadosComponent implements OnInit {
  testeLista: any = [1, 2, 3];

  colaboradores = [
    { nome: 'Jonas Goulart', cargo: 'escravo da sociedade', signal: SignalEnum.Nivel1 },
    { nome: 'Jonas Goulart', cargo: 'escravo da sociedade', signal: SignalEnum.Nivel1 },
    { nome: 'Jonas Goulart', cargo: 'escravo da sociedade', signal: SignalEnum.Nivel1 },
    { nome: 'Jonas Goulart', cargo: 'escravo da sociedade', signal: SignalEnum.Nivel1 },
    { nome: 'Jonas Goulart', cargo: 'escravo da sociedade', signal: SignalEnum.Nivel1 },
    { nome: 'Jonas Goulart', cargo: 'escravo da sociedade', signal: SignalEnum.Nivel1 },
    { nome: 'Jonas Goulart', cargo: 'escravo da sociedade', signal: SignalEnum.Nivel1 },
  ] as ColaboradorMinimalViewModel[];

  signalEnum = SignalEnum;
  constructor() { }

  ngOnInit() {

  }
}
