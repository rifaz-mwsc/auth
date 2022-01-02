/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LeaveRequestsBaseService } from './leave-requests-base.service';

describe('Service: LeaveRequestsBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaveRequestsBaseService]
    });
  });

  it('should ...', inject([LeaveRequestsBaseService], (service: LeaveRequestsBaseService) => {
    expect(service).toBeTruthy();
  }));
});
