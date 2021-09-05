import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { getImages } from 'src/app/_commom/util';
import { SignalEnum } from 'src/app/_enums/SignalEnum';
import { ColaboradorViewModel } from 'src/app/_models/ColaboradorViewModel';
import { MinimalViewModel } from 'src/app/_models/Commom/MinimalViewModel';

@Component({
  selector: 'lista-colaboradores',
  templateUrl: './lista-colaboradores.component.html',
  styleUrls: ['./lista-colaboradores.component.scss']
})
export class ListaColaboradoresComponent implements OnInit {

  colaboradores: ColaboradorViewModel[];

  /**
   * Lista de Áreas
   */
  lstArea: MinimalViewModel[] = [];

  /**
   * Lista de Cargos
   */
  lstCargo: MinimalViewModel[] = [];

  formFilter = this.fb.group({
    nome: ['', Validators.required],
    cargos: [[]],
    areas: [[]],
  });

  /**
   * Esconde table
   */
  hideTable = true;
  constructor(
    private fb: FormBuilder,     
    private afStorage: AngularFireStorage,) { }


  ngOnInit() {
    this.lstArea = [
      { codigo: 'codigo1' },
      { codigo: 'codigo2' },
    ]

    this.lstCargo = [
      { codigo: 'codigo1' },
      { codigo: 'codigo2' },
    ]
  }

  /**
   *  Popula a tabela com a lista passada no parâmetro
   */
  private loadGridDataSource() {
    this.colaboradores = [
      { id: '1', nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
      { id: '2', nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
      { id: '3', nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
      { id: '5', nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
      { id: '4', nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
      { id: '4', nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
    ] as ColaboradorViewModel[];

    getImages(this.colaboradores, this.afStorage);
  }

  /**
   * Método ativado ao clicar no botão "Filtrar"
   */
  onFilter() {
    console.log('wow such ação, OMG');
    this.loadGridDataSource();
    this.hideTable = false;
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.formFilter.value);
  }

  // TODO: Como vai ficar o filtro? Principalmente as modelagens
  private fakeFilter(colaboradores: ColaboradorViewModel[]){

  }
}
