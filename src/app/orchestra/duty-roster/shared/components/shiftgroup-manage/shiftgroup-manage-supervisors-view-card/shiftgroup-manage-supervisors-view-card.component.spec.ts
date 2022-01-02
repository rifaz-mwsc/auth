/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShiftgroupManageSupervisorsViewCardComponent } from './shiftgroup-manage-supervisors-view-card.component';

describe('ShiftgroupManageSupervisorsViewCardComponent', () => {
  let component: ShiftgroupManageSupervisorsViewCardComponent;
  let fixture: ComponentFixture<ShiftgroupManageSupervisorsViewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftgroupManageSupervisorsViewCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftgroupManageSupervisorsViewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
