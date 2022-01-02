/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrEmployeeProfileBasicInfoComponent } from './hr-employee-profile-basic-info.component';

describe('HrEmployeeProfileBasicInfoComponent', () => {
  let component: HrEmployeeProfileBasicInfoComponent;
  let fixture: ComponentFixture<HrEmployeeProfileBasicInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrEmployeeProfileBasicInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrEmployeeProfileBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
