import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrUploadLeaveViewTableComponent } from './hr-upload-leave-view-table.component';

describe('HrUploadLeaveViewTableComponent', () => {
  let component: HrUploadLeaveViewTableComponent;
  let fixture: ComponentFixture<HrUploadLeaveViewTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrUploadLeaveViewTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrUploadLeaveViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
