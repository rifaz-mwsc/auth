/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PayrollAllowanceTypeRateComponent } from './payroll-allowance-type-rate.component';

describe('PayrollAllowanceTypeRateComponent', () => {
  let component: PayrollAllowanceTypeRateComponent;
  let fixture: ComponentFixture<PayrollAllowanceTypeRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollAllowanceTypeRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollAllowanceTypeRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
