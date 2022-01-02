/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrRemoteEmployeeViewListComponent } from './hr-remote-employee-view-list.component';

describe('HrRemoteEmployeeViewListComponent', () => {
  let component: HrRemoteEmployeeViewListComponent;
  let fixture: ComponentFixture<HrRemoteEmployeeViewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrRemoteEmployeeViewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrRemoteEmployeeViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
