/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HrMangeEmployeeBaseService } from './hr-mange-employee-base.service';

describe('Service: HrMangeEmployeeBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrMangeEmployeeBaseService]
    });
  });

  it('should ...', inject([HrMangeEmployeeBaseService], (service: HrMangeEmployeeBaseService) => {
    expect(service).toBeTruthy();
  }));
});
