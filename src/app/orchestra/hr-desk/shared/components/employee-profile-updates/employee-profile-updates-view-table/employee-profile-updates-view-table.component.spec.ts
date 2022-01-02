/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EmployeeProfileUpdatesViewTableComponent } from './employee-profile-updates-view-table.component';

describe('EmployeeProfileUpdatesViewTableComponent', () => {
  let component: EmployeeProfileUpdatesViewTableComponent;
  let fixture: ComponentFixture<EmployeeProfileUpdatesViewTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeProfileUpdatesViewTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeProfileUpdatesViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
