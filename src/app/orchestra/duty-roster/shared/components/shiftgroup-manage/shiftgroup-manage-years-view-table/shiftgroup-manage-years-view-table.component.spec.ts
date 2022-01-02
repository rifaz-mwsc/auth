/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShiftgroupManageYearsViewTableComponent } from './shiftgroup-manage-years-view-table.component';

describe('ShiftgroupManageYearsViewTableComponent', () => {
  let component: ShiftgroupManageYearsViewTableComponent;
  let fixture: ComponentFixture<ShiftgroupManageYearsViewTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftgroupManageYearsViewTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftgroupManageYearsViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
