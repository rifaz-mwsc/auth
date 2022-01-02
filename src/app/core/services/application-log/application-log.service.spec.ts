/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApplicationLogService } from './application-log.service';

describe('Service: ApplicationLog', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicationLogService]
    });
  });

  it('should ...', inject([ApplicationLogService], (service: ApplicationLogService) => {
    expect(service).toBeTruthy();
  }));
});
