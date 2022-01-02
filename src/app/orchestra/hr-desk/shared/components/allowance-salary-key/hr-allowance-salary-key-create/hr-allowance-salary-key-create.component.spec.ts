/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrAllowanceSalaryKeyCreateComponent } from './hr-allowance-salary-key-create.component';

describe('HrAllowanceSalaryKeyCreateComponent', () => {
  let component: HrAllowanceSalaryKeyCreateComponent;
  let fixture: ComponentFixture<HrAllowanceSalaryKeyCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrAllowanceSalaryKeyCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrAllowanceSalaryKeyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
