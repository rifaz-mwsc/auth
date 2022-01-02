/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrLeaveRequestsDetailViewModelComponent } from './hr-leave-requests-detail-view-model.component';

describe('HrLeaveRequestsDetailViewModelComponent', () => {
  let component: HrLeaveRequestsDetailViewModelComponent;
  let fixture: ComponentFixture<HrLeaveRequestsDetailViewModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrLeaveRequestsDetailViewModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrLeaveRequestsDetailViewModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
