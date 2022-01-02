/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrOtRequestsDetailViewModelComponent } from './hr-ot-requests-detail-view-model.component';

describe('HrOtRequestsDetailViewModelComponent', () => {
  let component: HrOtRequestsDetailViewModelComponent;
  let fixture: ComponentFixture<HrOtRequestsDetailViewModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrOtRequestsDetailViewModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrOtRequestsDetailViewModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
