import { TestBed } from '@angular/core/testing';

import { HrOtRequestsBaseService } from './hr-ot-requests-base.service';

describe('HrOtRequestsBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HrOtRequestsBaseService = TestBed.get(HrOtRequestsBaseService);
    expect(service).toBeTruthy();
  });
});
