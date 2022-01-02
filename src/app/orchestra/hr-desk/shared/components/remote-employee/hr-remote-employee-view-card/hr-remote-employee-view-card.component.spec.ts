/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrRemoteEmployeeViewCardComponent } from './hr-remote-employee-view-card.component';

describe('HrRemoteEmployeeViewCardComponent', () => {
  let component: HrRemoteEmployeeViewCardComponent;
  let fixture: ComponentFixture<HrRemoteEmployeeViewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrRemoteEmployeeViewCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrRemoteEmployeeViewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
