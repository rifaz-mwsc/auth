/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrLeaveRequestsSapUploadModelComponent } from './hr-leave-requests-sap-upload-model.component';

describe('HrLeaveRequestsSapUploadModelComponent', () => {
  let component: HrLeaveRequestsSapUploadModelComponent;
  let fixture: ComponentFixture<HrLeaveRequestsSapUploadModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrLeaveRequestsSapUploadModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrLeaveRequestsSapUploadModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
