/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrUploadLeaveUploadBulkModelComponent } from './hr-upload-leave-upload-bulk-model.component';

describe('HrUploadLeaveUploadBulkModelComponent', () => {
  let component: HrUploadLeaveUploadBulkModelComponent;
  let fixture: ComponentFixture<HrUploadLeaveUploadBulkModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrUploadLeaveUploadBulkModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrUploadLeaveUploadBulkModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
