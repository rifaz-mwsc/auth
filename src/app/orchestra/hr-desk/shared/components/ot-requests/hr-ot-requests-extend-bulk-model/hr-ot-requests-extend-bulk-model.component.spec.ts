/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrOtRequestsExtendBulkModelComponent } from './hr-ot-requests-extend-bulk-model.component';

describe('HrOtRequestsExtendBulkModelComponent', () => {
  let component: HrOtRequestsExtendBulkModelComponent;
  let fixture: ComponentFixture<HrOtRequestsExtendBulkModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrOtRequestsExtendBulkModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrOtRequestsExtendBulkModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
