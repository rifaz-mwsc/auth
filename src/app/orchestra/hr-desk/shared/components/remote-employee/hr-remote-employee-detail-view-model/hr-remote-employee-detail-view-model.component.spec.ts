/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrRemoteEmployeeDetailViewModelComponent } from './hr-remote-employee-detail-view-model.component';

describe('HrRemoteEmployeeDetailViewModelComponent', () => {
  let component: HrRemoteEmployeeDetailViewModelComponent;
  let fixture: ComponentFixture<HrRemoteEmployeeDetailViewModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrRemoteEmployeeDetailViewModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrRemoteEmployeeDetailViewModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
