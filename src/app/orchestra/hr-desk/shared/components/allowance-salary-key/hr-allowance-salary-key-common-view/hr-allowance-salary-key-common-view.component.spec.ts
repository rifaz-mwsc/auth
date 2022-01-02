/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrAllowanceSalaryKeyCommonViewComponent } from './hr-allowance-salary-key-common-view.component';

describe('HrAllowanceSalaryKeyCommonViewComponent', () => {
  let component: HrAllowanceSalaryKeyCommonViewComponent;
  let fixture: ComponentFixture<HrAllowanceSalaryKeyCommonViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrAllowanceSalaryKeyCommonViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrAllowanceSalaryKeyCommonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
