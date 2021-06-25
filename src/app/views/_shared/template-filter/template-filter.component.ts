import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'template-filter',
  templateUrl: './template-filter.component.html',
  styleUrls: ['./template-filter.component.scss']
})
export class TemplateFilterComponent implements OnInit {
  // Implementação html que irá aparecer na parte superior
  @Input() templateBody: TemplateRef<any>;

  // Executa ao clicar na ação de "filtrar"
  @Output() AcaoFiltrar = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  Filtrar() {
    this.AcaoFiltrar.emit();
  }

}
