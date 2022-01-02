/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HrEmployeeProfileBaseService } from './hr-employee-profile-base.service';

describe('Service: HrEmployeeProfileBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrEmployeeProfileBaseService]
    });
  });

  it('should ...', inject([HrEmployeeProfileBaseService], (service: HrEmployeeProfileBaseService) => {
    expect(service).toBeTruthy();
  }));
});
