/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CoreApiAuthService } from './core-api-auth.service';

describe('Service: CoreApiAuth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoreApiAuthService]
    });
  });

  it('should ...', inject([CoreApiAuthService], (service: CoreApiAuthService) => {
    expect(service).toBeTruthy();
  }));
});
