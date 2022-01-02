/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrAttendanceCustomTimingCommonViewComponent } from './hr-attendance-custom-timing-common-view.component';

describe('HrAttendanceCustomTimingCommonViewComponent', () => {
  let component: HrAttendanceCustomTimingCommonViewComponent;
  let fixture: ComponentFixture<HrAttendanceCustomTimingCommonViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrAttendanceCustomTimingCommonViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrAttendanceCustomTimingCommonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
