/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShiftgroupManageSupervisorsViewListComponent } from './shiftgroup-manage-supervisors-view-list.component';

describe('ShiftgroupManageSupervisorsViewListComponent', () => {
  let component: ShiftgroupManageSupervisorsViewListComponent;
  let fixture: ComponentFixture<ShiftgroupManageSupervisorsViewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftgroupManageSupervisorsViewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftgroupManageSupervisorsViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
