/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HrAllowanceRecordService } from './hr-allowance-record.service';

describe('Service: HrAllowanceRecord', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrAllowanceRecordService]
    });
  });

  it('should ...', inject([HrAllowanceRecordService], (service: HrAllowanceRecordService) => {
    expect(service).toBeTruthy();
  }));
});
