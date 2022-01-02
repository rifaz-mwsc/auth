/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrExtendOtViewListComponent } from './hr-extend-ot-view-list.component';

describe('HrExtendOtViewListComponent', () => {
  let component: HrExtendOtViewListComponent;
  let fixture: ComponentFixture<HrExtendOtViewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrExtendOtViewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrExtendOtViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
