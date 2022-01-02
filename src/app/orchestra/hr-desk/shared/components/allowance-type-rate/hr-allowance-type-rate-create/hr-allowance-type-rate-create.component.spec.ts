/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrAllowanceTypeRateCreateComponent } from './hr-allowance-type-rate-create.component';

describe('HrAllowanceTypeRateCreateComponent', () => {
  let component: HrAllowanceTypeRateCreateComponent;
  let fixture: ComponentFixture<HrAllowanceTypeRateCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrAllowanceTypeRateCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrAllowanceTypeRateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
