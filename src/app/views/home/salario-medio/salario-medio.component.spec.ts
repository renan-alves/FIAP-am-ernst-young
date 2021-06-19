/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SalarioMedioComponent } from './salario-medio.component';

describe('SalarioMedioComponent', () => {
  let component: SalarioMedioComponent;
  let fixture: ComponentFixture<SalarioMedioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarioMedioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarioMedioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
