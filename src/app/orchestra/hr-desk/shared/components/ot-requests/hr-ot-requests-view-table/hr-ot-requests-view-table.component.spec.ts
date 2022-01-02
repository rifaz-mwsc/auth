import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrOtRequestsViewTableComponent } from './hr-ot-requests-view-table.component';

describe('HrOtRequestsViewTableComponent', () => {
  let component: HrOtRequestsViewTableComponent;
  let fixture: ComponentFixture<HrOtRequestsViewTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrOtRequestsViewTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrOtRequestsViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
