/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShiftgroupManageSupervisorsViewTableComponent } from './shiftgroup-manage-supervisors-view-table.component';

describe('ShiftgroupManageSupervisorsViewTableComponent', () => {
  let component: ShiftgroupManageSupervisorsViewTableComponent;
  let fixture: ComponentFixture<ShiftgroupManageSupervisorsViewTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftgroupManageSupervisorsViewTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftgroupManageSupervisorsViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
