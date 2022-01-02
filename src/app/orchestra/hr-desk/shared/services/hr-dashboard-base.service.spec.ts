/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HrDashboardBaseService } from './hr-dashboard-base.service';

describe('Service: HrDashboardBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrDashboardBaseService]
    });
  });

  it('should ...', inject([HrDashboardBaseService], (service: HrDashboardBaseService) => {
    expect(service).toBeTruthy();
  }));
});
