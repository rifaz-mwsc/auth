/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HrAttendanceRunService } from './hr-attendance-run.service';

describe('Service: HrAttendanceRun', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrAttendanceRunService]
    });
  });

  it('should ...', inject([HrAttendanceRunService], (service: HrAttendanceRunService) => {
    expect(service).toBeTruthy();
  }));
});
