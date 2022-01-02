/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrLeaveRequestsExtendModelComponent } from './hr-leave-requests-extend-model.component';

describe('HrLeaveRequestsExtendModelComponent', () => {
  let component: HrLeaveRequestsExtendModelComponent;
  let fixture: ComponentFixture<HrLeaveRequestsExtendModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrLeaveRequestsExtendModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrLeaveRequestsExtendModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
