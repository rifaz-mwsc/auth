/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HrAllowanceTypeAssignService } from './hr-allowance-type-assign.service';

describe('Service: HrAllowanceTypeAssign', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrAllowanceTypeAssignService]
    });
  });

  it('should ...', inject([HrAllowanceTypeAssignService], (service: HrAllowanceTypeAssignService) => {
    expect(service).toBeTruthy();
  }));
});
