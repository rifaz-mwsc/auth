/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OffshiftSapuploadViewListComponent } from './offshift-sapupload-view-list.component';

describe('OffshiftSapuploadViewListComponent', () => {
  let component: OffshiftSapuploadViewListComponent;
  let fixture: ComponentFixture<OffshiftSapuploadViewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffshiftSapuploadViewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffshiftSapuploadViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
