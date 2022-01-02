/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrAttendanceCustomTimingViewComponent } from './hr-attendance-custom-timing-view.component';

describe('HrAttendanceCustomTimingViewComponent', () => {
  let component: HrAttendanceCustomTimingViewComponent;
  let fixture: ComponentFixture<HrAttendanceCustomTimingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrAttendanceCustomTimingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrAttendanceCustomTimingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
