import { TestBed } from '@angular/core/testing';

import { OtpGuardService } from './otp-guard.service';

describe('OtpGuardService', () => {
  let service: OtpGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtpGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
