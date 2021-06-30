import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
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
  faUserAlt = faUserAlt;
  displayedColumns: string[] = [ 'nome', 'cargo', 'area', 'ultimoReajuste', 'salario', 'signal', 'redirect'];
  signalEnum = SignalEnum;
  dataSource: ColaboradorViewModel[];

  @Input() set colaboradores(colabs: ColaboradorViewModel[]) {
    console.log(colabs);
    this.dataSource = colabs;
  };

  constructor(
    protected router: Router,
  ) { }

  ngOnInit() { }

  redirectPage(colaborador: ColaboradorViewModel) {
    this.router.navigate(['/colaborador'], {
      queryParams: {
        nome: colaborador.nome,
        cargo: colaborador.cargo,
        signal: colaborador.signal,
        ultimoReajuste: colaborador.ultimoReajuste,
        imagem: colaborador.imagem,
      },
    });
  }
}
