/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrganizationBaseService } from './organization-base.service';

describe('Service: OrganizationBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganizationBaseService]
    });
  });

  it('should ...', inject([OrganizationBaseService], (service: OrganizationBaseService) => {
    expect(service).toBeTruthy();
  }));
});
