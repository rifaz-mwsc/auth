/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrAllowanceTypeAssignViewComponent } from './hr-allowance-type-assign-view.component';

describe('HrAllowanceTypeAssignViewComponent', () => {
  let component: HrAllowanceTypeAssignViewComponent;
  let fixture: ComponentFixture<HrAllowanceTypeAssignViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrAllowanceTypeAssignViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrAllowanceTypeAssignViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
