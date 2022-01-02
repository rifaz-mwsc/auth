/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrSapUploadOtComponent } from './hr-sap-upload-ot.component';

describe('HrSapUploadOtComponent', () => {
  let component: HrSapUploadOtComponent;
  let fixture: ComponentFixture<HrSapUploadOtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrSapUploadOtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrSapUploadOtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
