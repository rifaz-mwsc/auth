import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrHolidaysViewCardComponent } from './hr-holidays-view-card.component';

describe('HrHolidaysViewCardComponent', () => {
  let component: HrHolidaysViewCardComponent;
  let fixture: ComponentFixture<HrHolidaysViewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrHolidaysViewCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrHolidaysViewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
