/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AttendanceBaseService } from './attendance-base.service';

describe('Service: AttendanceBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttendanceBaseService]
    });
  });

  it('should ...', inject([AttendanceBaseService], (service: AttendanceBaseService) => {
    expect(service).toBeTruthy();
  }));
});
