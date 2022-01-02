import { TestBed } from '@angular/core/testing';

import { HrSapUploadMedicalLeaveBaseService } from './hr-sap-upload-medical-leave-base.service';

describe('HrSapUploadMedicalLeaveBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HrSapUploadMedicalLeaveBaseService = TestBed.get(HrSapUploadMedicalLeaveBaseService);
    expect(service).toBeTruthy();
  });
});
