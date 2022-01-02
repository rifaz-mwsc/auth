import { TestBed } from '@angular/core/testing';

import { HrManualPunchBaseService } from './hr-manual-punch-base.service';

describe('HrManualPunchBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HrManualPunchBaseService = TestBed.get(HrManualPunchBaseService);
    expect(service).toBeTruthy();
  });
});
