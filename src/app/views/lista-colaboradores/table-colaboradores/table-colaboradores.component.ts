import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignalEnum } from 'src/app/_enums/SignalEnum';
import { ColaboradorViewModel } from 'src/app/_models/ColaboradorViewModel';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'table-colaboradores',
  templateUrl: './table-colaboradores.component.html',
  styleUrls: ['./table-colaboradores.component.scss']
})

export class TableColaboradoresComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'cargo', 'area', 'ultimoReajuste', 'salario', 'signal', 'teste'];
  signalEnum = SignalEnum;
  dataSource: ColaboradorViewModel[];

  @Input() set colaboradores(colabs: ColaboradorViewModel[]) {
    console.log(colabs);
    this.dataSource = colabs;
  };

  constructor(
    protected router: Router,
  ) {}

  ngOnInit() {}

  redirectPage() {
    console.log('teste');
    this.router.navigate(['/colaborador'], {
      /*       queryParams: {
              controle: tryParseInt(cellClicked.cell.userData, null, 10),
            }, */
    });
  }
}
