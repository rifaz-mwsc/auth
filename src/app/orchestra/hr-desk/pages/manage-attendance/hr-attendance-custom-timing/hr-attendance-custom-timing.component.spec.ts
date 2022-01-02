/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrAttendanceCustomTimingComponent } from './hr-attendance-custom-timing.component';

describe('HrAttendanceCustomTimingComponent', () => {
  let component: HrAttendanceCustomTimingComponent;
  let fixture: ComponentFixture<HrAttendanceCustomTimingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrAttendanceCustomTimingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrAttendanceCustomTimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
