/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HrAttendanceAbsenceService } from './hr-attendance-absence.service';

describe('Service: HrAttendanceAbsence', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrAttendanceAbsenceService]
    });
  });

  it('should ...', inject([HrAttendanceAbsenceService], (service: HrAttendanceAbsenceService) => {
    expect(service).toBeTruthy();
  }));
});
