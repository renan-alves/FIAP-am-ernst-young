import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'template-filter',
  templateUrl: './template-filter.component.html',
  styleUrls: ['./template-filter.component.scss']
})
export class TemplateFilterComponent implements OnInit {
  // Implementação html que irá aparecer na parte superior
  @Input() templateBody: TemplateRef<any>;
  constructor() { }

  ngOnInit() {
  }

}
