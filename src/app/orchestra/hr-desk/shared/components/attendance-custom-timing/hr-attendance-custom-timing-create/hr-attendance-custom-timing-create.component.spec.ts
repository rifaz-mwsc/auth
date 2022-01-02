/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrAttendanceCustomTimingCreateComponent } from './hr-attendance-custom-timing-create.component';

describe('HrAttendanceCustomTimingCreateComponent', () => {
  let component: HrAttendanceCustomTimingCreateComponent;
  let fixture: ComponentFixture<HrAttendanceCustomTimingCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrAttendanceCustomTimingCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrAttendanceCustomTimingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
