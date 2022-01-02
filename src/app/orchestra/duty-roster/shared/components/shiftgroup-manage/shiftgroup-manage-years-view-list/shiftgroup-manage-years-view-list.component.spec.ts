/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShiftgroupManageYearsViewListComponent } from './shiftgroup-manage-years-view-list.component';

describe('ShiftgroupManageYearsViewListComponent', () => {
  let component: ShiftgroupManageYearsViewListComponent;
  let fixture: ComponentFixture<ShiftgroupManageYearsViewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftgroupManageYearsViewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftgroupManageYearsViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
