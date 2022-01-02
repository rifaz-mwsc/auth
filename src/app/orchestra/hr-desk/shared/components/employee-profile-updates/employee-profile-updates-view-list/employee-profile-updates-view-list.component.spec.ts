/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EmployeeProfileUpdatesViewListComponent } from './employee-profile-updates-view-list.component';

describe('EmployeeProfileUpdatesViewListComponent', () => {
  let component: EmployeeProfileUpdatesViewListComponent;
  let fixture: ComponentFixture<EmployeeProfileUpdatesViewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeProfileUpdatesViewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeProfileUpdatesViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
