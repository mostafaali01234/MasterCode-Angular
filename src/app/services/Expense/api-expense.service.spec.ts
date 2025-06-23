import { TestBed } from '@angular/core/testing';

import { ApiExpenseService } from './api-expense.service';

describe('ApiExpenseService', () => {
  let service: ApiExpenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiExpenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
