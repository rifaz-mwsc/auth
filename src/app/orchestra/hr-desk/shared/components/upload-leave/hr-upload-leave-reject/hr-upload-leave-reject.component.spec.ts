/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrUploadLeaveRejectComponent } from './hr-upload-leave-reject.component';

describe('HrUploadLeaveRejectComponent', () => {
  let component: HrUploadLeaveRejectComponent;
  let fixture: ComponentFixture<HrUploadLeaveRejectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrUploadLeaveRejectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrUploadLeaveRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
