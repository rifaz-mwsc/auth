/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrUploadLeaveDetailViewModelComponent } from './hr-upload-leave-detail-view-model.component';

describe('HrUploadLeaveDetailViewModelComponent', () => {
  let component: HrUploadLeaveDetailViewModelComponent;
  let fixture: ComponentFixture<HrUploadLeaveDetailViewModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrUploadLeaveDetailViewModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrUploadLeaveDetailViewModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
