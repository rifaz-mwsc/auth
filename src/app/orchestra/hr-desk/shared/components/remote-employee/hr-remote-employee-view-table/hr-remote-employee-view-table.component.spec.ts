/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrRemoteEmployeeViewTableComponent } from './hr-remote-employee-view-table.component';

describe('HrRemoteEmployeeViewTableComponent', () => {
  let component: HrRemoteEmployeeViewTableComponent;
  let fixture: ComponentFixture<HrRemoteEmployeeViewTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrRemoteEmployeeViewTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrRemoteEmployeeViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
