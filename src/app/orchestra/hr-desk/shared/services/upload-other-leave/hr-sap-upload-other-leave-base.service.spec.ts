import { TestBed } from '@angular/core/testing';

import { HrSapUploadOtherLeaveBaseService } from './hr-sap-upload-other-leave-base.service';

describe('HrSapUploadOtherLeaveBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HrSapUploadOtherLeaveBaseService = TestBed.get(HrSapUploadOtherLeaveBaseService);
    expect(service).toBeTruthy();
  });
});
