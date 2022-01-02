/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WeeklyshiftManageViewTableComponent } from './weeklyshift-manage-view-table.component';

describe('WeeklyshiftManageViewTableComponent', () => {
  let component: WeeklyshiftManageViewTableComponent;
  let fixture: ComponentFixture<WeeklyshiftManageViewTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyshiftManageViewTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyshiftManageViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
