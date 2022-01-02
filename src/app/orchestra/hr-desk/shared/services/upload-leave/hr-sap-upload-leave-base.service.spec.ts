import { TestBed } from '@angular/core/testing';

import { HrSapUploadLeaveBaseService } from './hr-sap-upload-leave-base.service';

describe('HrSapUploadLeaveBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HrSapUploadLeaveBaseService = TestBed.get(HrSapUploadLeaveBaseService);
    expect(service).toBeTruthy();
  });
});
