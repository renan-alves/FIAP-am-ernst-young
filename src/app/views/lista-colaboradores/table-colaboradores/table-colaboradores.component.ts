import { Component, Input, OnInit } from '@angular/core';
import { TableColumnViewModel } from 'src/app/_models/Commom/TableColumnViewModel';
import { TableRowViewModel } from 'src/app/_models/Commom/TableRowViewModel';

@Component({
  selector: 'table-colaboradores',
  templateUrl: './table-colaboradores.component.html',
  styleUrls: ['./table-colaboradores.component.scss']
})
export class TableColaboradoresComponent implements OnInit {

  // Lista com todos os itens da tabela
  AllData: TableRowViewModel[] = [];

  // Dados da tabela
  @Input()
  get tableRows() {
    return this.AllData;
  }
  set tableRows(value: TableRowViewModel[]) {
    this.AllData = value;
  }

  // Colunas da tabela
  @Input() tableColumns: TableColumnViewModel[] = [];

  constructor() { }

  ngOnInit() {
  }

}
