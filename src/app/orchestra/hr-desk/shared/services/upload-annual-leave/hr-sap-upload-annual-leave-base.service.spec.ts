import { TestBed } from '@angular/core/testing';

import { HrSapUploadAnnualLeaveBaseService } from './hr-sap-upload-annual-leave-base.service';

describe('HrSapUploadAnnualLeaveBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HrSapUploadAnnualLeaveBaseService = TestBed.get(HrSapUploadAnnualLeaveBaseService);
    expect(service).toBeTruthy();
  });
});
