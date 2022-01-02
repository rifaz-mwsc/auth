import { TestBed } from '@angular/core/testing';

import { HrExtendRequestsBaseService } from './hr-extend-requests-base.service';

describe('HrExtendRequestsBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HrExtendRequestsBaseService = TestBed.get(HrExtendRequestsBaseService);
    expect(service).toBeTruthy();
  });
});
