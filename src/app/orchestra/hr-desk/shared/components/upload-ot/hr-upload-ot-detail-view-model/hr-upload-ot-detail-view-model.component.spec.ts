/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrUploadOtDetailViewModelComponent } from './hr-upload-ot-detail-view-model.component';

describe('HrUploadOtDetailViewModelComponent', () => {
  let component: HrUploadOtDetailViewModelComponent;
  let fixture: ComponentFixture<HrUploadOtDetailViewModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrUploadOtDetailViewModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrUploadOtDetailViewModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
