/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmployeeBaseService } from './employee-base.service';

describe('Service: EmployeeBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeBaseService]
    });
  });

  it('should ...', inject([EmployeeBaseService], (service: EmployeeBaseService) => {
    expect(service).toBeTruthy();
  }));
});
