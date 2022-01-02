import { TestBed } from '@angular/core/testing';

import { HrHolidaysBaseService } from './hr-holidays-base.service';

describe('HrHolidaysBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HrHolidaysBaseService = TestBed.get(HrHolidaysBaseService);
    expect(service).toBeTruthy();
  });
});
