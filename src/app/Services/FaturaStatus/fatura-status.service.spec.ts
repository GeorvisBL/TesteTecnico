import { TestBed } from '@angular/core/testing';

import { FaturaStatusService } from './fatura-status.service';

describe('FaturaStatusService', () => {
  let service: FaturaStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaturaStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
