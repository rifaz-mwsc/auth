/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DutyrosterHrViewShiftGroupsComponent } from './dutyroster-hr-view-shift-groups.component';

describe('DutyrosterHrViewShiftGroupsComponent', () => {
  let component: DutyrosterHrViewShiftGroupsComponent;
  let fixture: ComponentFixture<DutyrosterHrViewShiftGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyrosterHrViewShiftGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyrosterHrViewShiftGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
