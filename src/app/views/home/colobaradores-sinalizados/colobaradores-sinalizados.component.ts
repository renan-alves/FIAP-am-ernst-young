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
    { id: '1', nome: 'Colaborador 1', cargo: 'Laboratory Technician', signal: SignalEnum.Nivel1, imagem: 'assets/images/avatar-padrao.png' },
    { id: '2', nome: 'Colaborador 2', cargo: 'Human Resources', signal: SignalEnum.Nivel1, imagem: 'assets/images/avatar-padrao.png' }
  ] as ColaboradorMinimalViewModel[];

  signalEnum = SignalEnum;
  constructor(
    private afStorage: AngularFireStorage,
  ) { }

  ngOnInit() {
    //  getImages(this.colaboradores,this.afStorage);
  }
}
