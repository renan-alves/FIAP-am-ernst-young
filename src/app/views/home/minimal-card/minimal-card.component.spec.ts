/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MinimalCardComponent } from './minimal-card.component';

describe('MinimalCardComponent', () => {
  let component: MinimalCardComponent;
  let fixture: ComponentFixture<MinimalCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinimalCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinimalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
