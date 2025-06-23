import { TestBed } from '@angular/core/testing';

import { ApiJobService } from './api-job.service';

describe('ApiJobService', () => {
  let service: ApiJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
