/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrAuthDashboardDetailsCommonViewComponent } from './hr-auth-dashboard-details-common-view.component';

describe('HrAuthDashboardDetailsCommonViewComponent', () => {
  let component: HrAuthDashboardDetailsCommonViewComponent;
  let fixture: ComponentFixture<HrAuthDashboardDetailsCommonViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrAuthDashboardDetailsCommonViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrAuthDashboardDetailsCommonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
