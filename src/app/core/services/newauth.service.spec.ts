import { TestBed } from '@angular/core/testing';

import { NewAuthService } from './newauth.service';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewAuthService = TestBed.get(NewAuthService);
    expect(service).toBeTruthy();
  });
});
