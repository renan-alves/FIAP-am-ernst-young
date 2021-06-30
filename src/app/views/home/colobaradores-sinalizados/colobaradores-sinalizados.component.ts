import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { getImages } from 'src/app/_commom/util';
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
    { id: '1', nome: 'Jonas Goulart', cargo: 'escravo da sociedade', signal: SignalEnum.Nivel1 },
    { id: '2', nome: 'Jonas Goulart', cargo: 'escravo da sociedade', signal: SignalEnum.Nivel1 },
/*     { id: '3', nome: 'Jonas Goulart', cargo: 'escravo da sociedade', signal: SignalEnum.Nivel1 },
    { id: '4', nome: 'Jonas Goulart', cargo: 'escravo da sociedade', signal: SignalEnum.Nivel1 },
    { id: '5', nome: 'Jonas Goulart', cargo: 'escravo da sociedade', signal: SignalEnum.Nivel1 },
    { id: '6', nome: 'Jonas Goulart', cargo: 'escravo da sociedade', signal: SignalEnum.Nivel1 },
    { id: '7', nome: 'Jonas Goulart', cargo: 'escravo da sociedade', signal: SignalEnum.Nivel1 }, */
  ] as ColaboradorMinimalViewModel[];

  signalEnum = SignalEnum;
  constructor(
    private afStorage: AngularFireStorage,
  ) { }

  ngOnInit() {
     getImages(this.colaboradores,this.afStorage);
  }
}
