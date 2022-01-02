/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrAllowanceTypeRateDeleteComponent } from './hr-allowance-type-rate-delete.component';

describe('HrAllowanceTypeRateDeleteComponent', () => {
  let component: HrAllowanceTypeRateDeleteComponent;
  let fixture: ComponentFixture<HrAllowanceTypeRateDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrAllowanceTypeRateDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrAllowanceTypeRateDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
