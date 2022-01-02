/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrOtRequestsShotenModelComponent } from './hr-ot-requests-shoten-model.component';

describe('HrOtRequestsShotenModelComponent', () => {
  let component: HrOtRequestsShotenModelComponent;
  let fixture: ComponentFixture<HrOtRequestsShotenModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrOtRequestsShotenModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrOtRequestsShotenModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
