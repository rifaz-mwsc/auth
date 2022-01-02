/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OffshiftSapuploadViewTableComponent } from './offshift-sapupload-view-table.component';

describe('OffshiftSapuploadViewTableComponent', () => {
  let component: OffshiftSapuploadViewTableComponent;
  let fixture: ComponentFixture<OffshiftSapuploadViewTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffshiftSapuploadViewTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffshiftSapuploadViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
