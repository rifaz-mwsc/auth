/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShiftgroupManageEmployeesViewCardComponent } from './shiftgroup-manage-employees-view-card.component';

describe('ShiftgroupManageEmployeesViewCardComponent', () => {
  let component: ShiftgroupManageEmployeesViewCardComponent;
  let fixture: ComponentFixture<ShiftgroupManageEmployeesViewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftgroupManageEmployeesViewCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftgroupManageEmployeesViewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
