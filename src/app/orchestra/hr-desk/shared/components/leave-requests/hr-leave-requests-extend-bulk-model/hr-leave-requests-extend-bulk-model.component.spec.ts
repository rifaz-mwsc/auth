/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrLeaveRequestsExtendBulkModelComponent } from './hr-leave-requests-extend-bulk-model.component';

describe('HrLeaveRequestsExtendBulkModelComponent', () => {
  let component: HrLeaveRequestsExtendBulkModelComponent;
  let fixture: ComponentFixture<HrLeaveRequestsExtendBulkModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrLeaveRequestsExtendBulkModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrLeaveRequestsExtendBulkModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
