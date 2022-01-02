/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DutyrosterHrShiftSapuploadComponent } from './dutyroster-hr-shift-sapupload.component';

describe('DutyrosterHrShiftSapuploadComponent', () => {
  let component: DutyrosterHrShiftSapuploadComponent;
  let fixture: ComponentFixture<DutyrosterHrShiftSapuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyrosterHrShiftSapuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyrosterHrShiftSapuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
