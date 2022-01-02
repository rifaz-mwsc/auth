/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrAllowanceSalaryKeyViewComponent } from './hr-allowance-salary-key-view.component';

describe('HrAllowanceSalaryKeyViewComponent', () => {
  let component: HrAllowanceSalaryKeyViewComponent;
  let fixture: ComponentFixture<HrAllowanceSalaryKeyViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrAllowanceSalaryKeyViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrAllowanceSalaryKeyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
