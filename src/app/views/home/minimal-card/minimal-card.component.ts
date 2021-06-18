import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'minimal-card',
  templateUrl: './minimal-card.component.html',
  styleUrls: ['./minimal-card.component.scss']
})
export class MinimalCardComponent implements OnInit {
  /**
   * Título do card
   */
  @Input() title: string;

  /**
   * Descrição do card
   */
  @Input() description: string;

  constructor() { }

  ngOnInit() {
  }

}
