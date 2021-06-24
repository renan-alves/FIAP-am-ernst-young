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
   * 
   */
  lstArea: MinimalViewModel[] = [];
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
  constructor(private fb: FormBuilder) { }

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

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.formFilter.value);
  }
}
