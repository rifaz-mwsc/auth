import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrUploadOtViewTableComponent } from './hr-upload-ot-view-table.component';

describe('HrUploadOtViewTableComponent', () => {
  let component: HrUploadOtViewTableComponent;
  let fixture: ComponentFixture<HrUploadOtViewTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrUploadOtViewTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrUploadOtViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
