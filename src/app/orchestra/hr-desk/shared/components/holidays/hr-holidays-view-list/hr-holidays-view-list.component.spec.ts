import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrHolidaysViewListComponent } from './hr-holidays-view-list.component';

describe('HrHolidaysViewListComponent', () => {
  let component: HrHolidaysViewListComponent;
  let fixture: ComponentFixture<HrHolidaysViewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrHolidaysViewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrHolidaysViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
