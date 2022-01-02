/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrAttendanceRunFullDetailViewComponent } from './hr-attendance-run-full-detail-view.component';

describe('HrAttendanceRunFullDetailViewComponent', () => {
  let component: HrAttendanceRunFullDetailViewComponent;
  let fixture: ComponentFixture<HrAttendanceRunFullDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrAttendanceRunFullDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrAttendanceRunFullDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
