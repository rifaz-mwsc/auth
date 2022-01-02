/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HrEmployeeStatisticsBaseService } from './hr-employee-statistics-base.service';

describe('Service: HrEmployeeStatisticsBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrEmployeeStatisticsBaseService]
    });
  });

  it('should ...', inject([HrEmployeeStatisticsBaseService], (service: HrEmployeeStatisticsBaseService) => {
    expect(service).toBeTruthy();
  }));
});
