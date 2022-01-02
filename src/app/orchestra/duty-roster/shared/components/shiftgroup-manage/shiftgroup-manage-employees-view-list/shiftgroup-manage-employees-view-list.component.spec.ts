/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShiftgroupManageEmployeesViewListComponent } from './shiftgroup-manage-employees-view-list.component';

describe('ShiftgroupManageEmployeesViewListComponent', () => {
  let component: ShiftgroupManageEmployeesViewListComponent;
  let fixture: ComponentFixture<ShiftgroupManageEmployeesViewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftgroupManageEmployeesViewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftgroupManageEmployeesViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
