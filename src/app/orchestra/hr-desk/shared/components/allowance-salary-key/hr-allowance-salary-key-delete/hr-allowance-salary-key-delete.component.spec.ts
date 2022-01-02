/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrAllowanceSalaryKeyDeleteComponent } from './hr-allowance-salary-key-delete.component';

describe('HrAllowanceSalaryKeyDeleteComponent', () => {
  let component: HrAllowanceSalaryKeyDeleteComponent;
  let fixture: ComponentFixture<HrAllowanceSalaryKeyDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrAllowanceSalaryKeyDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrAllowanceSalaryKeyDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
