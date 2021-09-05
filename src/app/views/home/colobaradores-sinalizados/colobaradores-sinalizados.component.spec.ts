/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ColobaradoresSinalizadosComponent } from './colobaradores-sinalizados.component';

describe('ColobaradoresSinalizadosComponent', () => {
  let component: ColobaradoresSinalizadosComponent;
  let fixture: ComponentFixture<ColobaradoresSinalizadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColobaradoresSinalizadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColobaradoresSinalizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
