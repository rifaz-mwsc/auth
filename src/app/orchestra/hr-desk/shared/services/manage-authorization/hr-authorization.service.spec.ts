/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HrAuthorizationService } from './hr-authorization.service';

describe('Service: HrAuthorization', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrAuthorizationService]
    });
  });

  it('should ...', inject([HrAuthorizationService], (service: HrAuthorizationService) => {
    expect(service).toBeTruthy();
  }));
});
