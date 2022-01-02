/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrHolidaysDetailViewModelComponent } from './hr-holidays-detail-view-model.component';

describe('HrHolidaysDetailViewModelComponent', () => {
  let component: HrHolidaysDetailViewModelComponent;
  let fixture: ComponentFixture<HrHolidaysDetailViewModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrHolidaysDetailViewModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrHolidaysDetailViewModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
