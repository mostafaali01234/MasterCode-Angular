import { TestBed } from '@angular/core/testing';

import { ApiLoanService } from './api-loan.service';

describe('ApiLoanService', () => {
  let service: ApiLoanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiLoanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
