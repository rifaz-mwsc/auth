import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrOtRequestsViewCardComponent } from './hr-ot-requests-view-card.component';

describe('HrOtRequestsViewCardComponent', () => {
  let component: HrOtRequestsViewCardComponent;
  let fixture: ComponentFixture<HrOtRequestsViewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrOtRequestsViewCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrOtRequestsViewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
