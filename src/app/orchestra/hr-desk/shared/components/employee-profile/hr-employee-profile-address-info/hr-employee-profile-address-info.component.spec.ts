/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrEmployeeProfileAddressInfoComponent } from './hr-employee-profile-address-info.component';

describe('HrEmployeeProfileAddressInfoComponent', () => {
  let component: HrEmployeeProfileAddressInfoComponent;
  let fixture: ComponentFixture<HrEmployeeProfileAddressInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrEmployeeProfileAddressInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrEmployeeProfileAddressInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
