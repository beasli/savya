import { TestBed } from '@angular/core/testing';

import { KycguardService } from './kycguard.service';

describe('KycguardService', () => {
  let service: KycguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KycguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
