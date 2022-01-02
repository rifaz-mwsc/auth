/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DutyrosterHrManageShiftGroupComponent } from './dutyroster-hr-manage-shift-group.component';

describe('DutyrosterHrManageShiftGroupComponent', () => {
  let component: DutyrosterHrManageShiftGroupComponent;
  let fixture: ComponentFixture<DutyrosterHrManageShiftGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyrosterHrManageShiftGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyrosterHrManageShiftGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
