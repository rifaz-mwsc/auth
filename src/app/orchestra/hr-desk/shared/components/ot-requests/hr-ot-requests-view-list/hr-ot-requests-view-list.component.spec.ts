import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrOtRequestsViewListComponent } from './hr-ot-requests-view-list.component';

describe('HrOtRequestsViewListComponent', () => {
  let component: HrOtRequestsViewListComponent;
  let fixture: ComponentFixture<HrOtRequestsViewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrOtRequestsViewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrOtRequestsViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
