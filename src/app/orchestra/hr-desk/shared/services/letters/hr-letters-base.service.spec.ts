import { TestBed } from '@angular/core/testing';

import { HrLettersBaseService } from './hr-letters-base.service';

describe('HrLettersBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HrLettersBaseService = TestBed.get(HrLettersBaseService);
    expect(service).toBeTruthy();
  });
});
