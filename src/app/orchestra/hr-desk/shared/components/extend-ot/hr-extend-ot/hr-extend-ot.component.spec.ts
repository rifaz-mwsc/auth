/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrExtendOtComponent } from './hr-extend-ot.component';

describe('HrExtendOtComponent', () => {
  let component: HrExtendOtComponent;
  let fixture: ComponentFixture<HrExtendOtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrExtendOtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrExtendOtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
