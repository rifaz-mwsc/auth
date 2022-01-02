/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrAllowanceTypeAssignCommonViewComponent } from './hr-allowance-type-assign-common-view.component';

describe('HrAllowanceTypeAssignCommonViewComponent', () => {
  let component: HrAllowanceTypeAssignCommonViewComponent;
  let fixture: ComponentFixture<HrAllowanceTypeAssignCommonViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrAllowanceTypeAssignCommonViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrAllowanceTypeAssignCommonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
