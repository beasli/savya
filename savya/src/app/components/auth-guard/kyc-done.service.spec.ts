import { TestBed } from '@angular/core/testing';

import { KycDoneService } from './kyc-done.service';

describe('KycDoneService', () => {
  let service: KycDoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KycDoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
