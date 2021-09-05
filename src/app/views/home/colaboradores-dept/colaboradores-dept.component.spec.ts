/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ColaboradoresDeptComponent } from './colaboradores-dept.component';

describe('ColaboradoresDeptComponent', () => {
  let component: ColaboradoresDeptComponent;
  let fixture: ComponentFixture<ColaboradoresDeptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColaboradoresDeptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaboradoresDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
