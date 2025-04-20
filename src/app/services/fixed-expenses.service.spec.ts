import { TestBed } from '@angular/core/testing';

import { FixedExpenseService } from './fixed-expenses.service';

describe('FixedExpensesService', () => {
  let service: FixedExpenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixedExpenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
