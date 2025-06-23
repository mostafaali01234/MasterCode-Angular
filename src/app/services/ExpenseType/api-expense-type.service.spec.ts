import { TestBed } from '@angular/core/testing';

import { ApiExpenseTypeService } from './api-expense-type.service';

describe('ApiExpenseTypeService', () => {
  let service: ApiExpenseTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiExpenseTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
