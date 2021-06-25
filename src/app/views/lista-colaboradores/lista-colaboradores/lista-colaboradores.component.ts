import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignalEnum } from 'src/app/_enums/SignalEnum';
import { ColaboradorViewModel } from 'src/app/_models/ColaboradorViewModel';
import { MinimalViewModel } from 'src/app/_models/Commom/MinimalViewModel';
import { TableColumnViewModel } from 'src/app/_models/Commom/TableColumnViewModel';
import { TableRowViewModel } from 'src/app/_models/Commom/TableRowViewModel';

@Component({
  selector: 'lista-colaboradores',
  templateUrl: './lista-colaboradores.component.html',
  styleUrls: ['./lista-colaboradores.component.scss']
})
export class ListaColaboradoresComponent implements OnInit {

  colaboradores = [
    { id: 1, nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
    { id: 2, nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
    { id: 3, nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
    { id: 4, nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
    { id: 5, nome: 'Jonas Goulart', cargo: 'escravo da sociedade', area: 'IT', ultimoReajuste: new Date(), salario: 1000.00, signal: SignalEnum.Nivel1 },
  ] as ColaboradorViewModel[];

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
  constructor(private fb: FormBuilder) { }

  /**
   * Colunas e linhas da tabela
   */
  grid = {
    columns: [] as TableColumnViewModel[],
    rows: [] as TableRowViewModel[],
  };

  ngOnInit() {
    this.lstArea = [
      { codigo: 'codigo1' },
      { codigo: 'codigo2' },
    ]

    this.lstCargo = [
      { codigo: 'codigo1' },
      { codigo: 'codigo2' },
    ]

    this.grid.columns = [
      { key: 'colaborador', description: 'Colaborador', },
      { key: 'cargo', description: 'Cargo', },
      { key: 'area', description: 'Área', },
      { key: 'ultimoReajuste', description: 'Último reajuste', },
      { key: 'salario', description: 'Salário', },
      { key: 'sinalizacao', description: 'Sinalização', },
    ];
  }

  /**
   *  Popula a tabela com a lista passada no parâmetro
   */
  private loadGridDataSource(colobaradores: ColaboradorViewModel[]) {
    this.grid.rows = colobaradores.map((i) => ({
      key: i.id.toString(),
      rowData: {
        colaborador: {
          rowKey: i.id.toString(),
          value: i.nome,
        },
        cargo: {
          rowKey: i.id.toString(),
          value: i.cargo,
        },
        area: {
          rowKey: i.id.toString(),
          value: i.area,
        },
        ultimoReajuste: {
          rowKey: i.id.toString(),
          value: i.ultimoReajuste,
        },
        salario: {
          rowKey: i.id.toString(),
          value: i.salario,
        },
        sinalizacao: {
          rowKey: i.id.toString(),
          value: null,
        },
      },
    }));
  }

  /**
   * Método ativado ao clicar no botão "Filtrar"
   */
  onFilter() {
    console.log('wow such ação, OMG');
    this.loadGridDataSource(this.colaboradores);
    this.hideTable = false;
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.formFilter.value);
  }
}
