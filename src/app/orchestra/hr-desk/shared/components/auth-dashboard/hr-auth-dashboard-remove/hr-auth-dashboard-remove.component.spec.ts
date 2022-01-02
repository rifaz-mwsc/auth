/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrAuthDashboardRemoveComponent } from './hr-auth-dashboard-remove.component';

describe('HrAuthDashboardRemoveComponent', () => {
  let component: HrAuthDashboardRemoveComponent;
  let fixture: ComponentFixture<HrAuthDashboardRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrAuthDashboardRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrAuthDashboardRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
