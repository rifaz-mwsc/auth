/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DutyrosterHrWeeklyshiftManageComponent } from './dutyroster-hr-weeklyshift-manage.component';

describe('DutyrosterHrWeeklyshiftManageComponent', () => {
  let component: DutyrosterHrWeeklyshiftManageComponent;
  let fixture: ComponentFixture<DutyrosterHrWeeklyshiftManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyrosterHrWeeklyshiftManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyrosterHrWeeklyshiftManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
