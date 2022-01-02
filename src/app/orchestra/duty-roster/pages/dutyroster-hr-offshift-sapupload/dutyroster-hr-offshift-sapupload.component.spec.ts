/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DutyrosterHrOffshiftSapuploadComponent } from './dutyroster-hr-offshift-sapupload.component';

describe('DutyrosterHrOffshiftSapuploadComponent', () => {
  let component: DutyrosterHrOffshiftSapuploadComponent;
  let fixture: ComponentFixture<DutyrosterHrOffshiftSapuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyrosterHrOffshiftSapuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyrosterHrOffshiftSapuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
