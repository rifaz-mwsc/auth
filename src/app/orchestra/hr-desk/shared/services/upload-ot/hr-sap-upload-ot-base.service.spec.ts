import { TestBed } from '@angular/core/testing';

import { HrSapUploadOtBaseService } from './hr-sap-upload-ot-base.service';

describe('HrSapUploadOtBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HrSapUploadOtBaseService = TestBed.get(HrSapUploadOtBaseService);
    expect(service).toBeTruthy();
  });
});
