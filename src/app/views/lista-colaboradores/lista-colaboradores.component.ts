import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignalEnum } from 'src/app/_enums/SignalEnum';
import { ColaboradorViewModel } from 'src/app/_models/ColaboradorViewModel';
import { MinimalViewModel } from 'src/app/_models/Commom/MinimalViewModel';

@Component({
  selector: 'lista-colaboradores',
  templateUrl: './lista-colaboradores.component.html',
  styleUrls: ['./lista-colaboradores.component.scss']
})
export class ListaColaboradoresComponent implements OnInit {

  colaboradores = [
    { nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
    { nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
    { nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
    { nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
    { nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
    { nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
    { nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
    { nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
    { nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
    { nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
    { nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
    { nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
    { nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
    { nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
    { nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
    { nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
    { nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
    { nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
  ] as ColaboradorViewModel[];

  /**
   * Lista de ID, Código e Descrição de Unidades Produtivas
   */
  lstArea: MinimalViewModel[] = [];

  formFilter = this.fb.group({
    nome: ['', Validators.required],
    cargos: [[]],
    areas: [[]],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.lstArea = [
      { codigo: 'codigo1', descricao: 'descricao1' },
      { codigo: 'codigo2', descricao: 'descricao2' },
      { codigo: 'codigo3', descricao: 'descricao3' },
      { codigo: 'codigo4', descricao: 'descricao4' },
      { codigo: 'codigo5', descricao: 'descricao5' },
      { codigo: 'codigo6', descricao: 'descricao6' },
      { codigo: 'codigo7', descricao: 'descricao7' },
    ]
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.formFilter.value);
  }
}
