/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DutyrosterHrManageWeeklyShiftsComponent } from './dutyroster-hr-manage-weekly-shifts.component';

describe('DutyrosterHrManageWeeklyShiftsComponent', () => {
  let component: DutyrosterHrManageWeeklyShiftsComponent;
  let fixture: ComponentFixture<DutyrosterHrManageWeeklyShiftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyrosterHrManageWeeklyShiftsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyrosterHrManageWeeklyShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
