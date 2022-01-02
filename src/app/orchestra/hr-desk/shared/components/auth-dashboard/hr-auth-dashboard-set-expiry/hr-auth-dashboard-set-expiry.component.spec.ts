/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrAuthDashboardSetExpiryComponent } from './hr-auth-dashboard-set-expiry.component';

describe('HrAuthDashboardSetExpiryComponent', () => {
  let component: HrAuthDashboardSetExpiryComponent;
  let fixture: ComponentFixture<HrAuthDashboardSetExpiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrAuthDashboardSetExpiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrAuthDashboardSetExpiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
