/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HrAllowanceTypeService } from './hr-allowance-type.service';

describe('Service: HrAllowanceType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrAllowanceTypeService]
    });
  });

  it('should ...', inject([HrAllowanceTypeService], (service: HrAllowanceTypeService) => {
    expect(service).toBeTruthy();
  }));
});
