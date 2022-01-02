/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GenerateDailyAttendanceDeatilsComponent } from './generate-daily-attendance-deatils.component';

describe('GenerateDailyAttendanceDeatilsComponent', () => {
  let component: GenerateDailyAttendanceDeatilsComponent;
  let fixture: ComponentFixture<GenerateDailyAttendanceDeatilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateDailyAttendanceDeatilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateDailyAttendanceDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
