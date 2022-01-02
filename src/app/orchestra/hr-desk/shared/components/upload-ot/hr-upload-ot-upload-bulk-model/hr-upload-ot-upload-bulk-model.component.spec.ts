/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrUploadOtUploadBulkModelComponent } from './hr-upload-ot-upload-bulk-model.component';

describe('HrUploadOtUploadBulkModelComponent', () => {
  let component: HrUploadOtUploadBulkModelComponent;
  let fixture: ComponentFixture<HrUploadOtUploadBulkModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrUploadOtUploadBulkModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrUploadOtUploadBulkModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
