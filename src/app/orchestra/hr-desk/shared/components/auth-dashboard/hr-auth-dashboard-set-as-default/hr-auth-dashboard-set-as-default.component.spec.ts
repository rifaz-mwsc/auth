/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrAuthDashboardSetAsDefaultComponent } from './hr-auth-dashboard-set-as-default.component';

describe('HrAuthDashboardSetAsDefaultComponent', () => {
  let component: HrAuthDashboardSetAsDefaultComponent;
  let fixture: ComponentFixture<HrAuthDashboardSetAsDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrAuthDashboardSetAsDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrAuthDashboardSetAsDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
