/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PayrollAllowanceTypeAssignComponent } from './payroll-allowance-type-assign.component';

describe('PayrollAllowanceTypeAssignComponent', () => {
  let component: PayrollAllowanceTypeAssignComponent;
  let fixture: ComponentFixture<PayrollAllowanceTypeAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollAllowanceTypeAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollAllowanceTypeAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
