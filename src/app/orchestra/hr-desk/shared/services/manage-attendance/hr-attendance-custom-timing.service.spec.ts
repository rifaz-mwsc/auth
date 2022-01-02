/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HrAttendanceCustomTimingService } from './hr-attendance-custom-timing.service';

describe('Service: HrAttendanceCustomTiming', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrAttendanceCustomTimingService]
    });
  });

  it('should ...', inject([HrAttendanceCustomTimingService], (service: HrAttendanceCustomTimingService) => {
    expect(service).toBeTruthy();
  }));
});
