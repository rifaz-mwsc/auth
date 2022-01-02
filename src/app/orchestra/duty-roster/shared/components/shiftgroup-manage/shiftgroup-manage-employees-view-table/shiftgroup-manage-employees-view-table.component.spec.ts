/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShiftgroupManageEmployeesViewTableComponent } from './shiftgroup-manage-employees-view-table.component';

describe('ShiftgroupManageEmployeesViewTableComponent', () => {
  let component: ShiftgroupManageEmployeesViewTableComponent;
  let fixture: ComponentFixture<ShiftgroupManageEmployeesViewTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftgroupManageEmployeesViewTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftgroupManageEmployeesViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
