import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrHolidaysViewTableComponent } from './hr-holidays-view-table.component';

describe('HrHolidaysViewTableComponent', () => {
  let component: HrHolidaysViewTableComponent;
  let fixture: ComponentFixture<HrHolidaysViewTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrHolidaysViewTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrHolidaysViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
