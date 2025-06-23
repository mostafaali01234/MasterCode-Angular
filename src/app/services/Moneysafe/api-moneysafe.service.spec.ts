import { TestBed } from '@angular/core/testing';

import { ApiMoneysafeService } from './api-moneysafe.service';

describe('ApiMoneysafeService', () => {
  let service: ApiMoneysafeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMoneysafeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
