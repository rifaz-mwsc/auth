/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrAttendanceCustomTimingDeleteComponent } from './hr-attendance-custom-timing-delete.component';

describe('HrAttendanceCustomTimingDeleteComponent', () => {
  let component: HrAttendanceCustomTimingDeleteComponent;
  let fixture: ComponentFixture<HrAttendanceCustomTimingDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrAttendanceCustomTimingDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrAttendanceCustomTimingDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
