import { TestBed } from '@angular/core/testing';

import { CompalinService } from './complain.service';

describe('CompalinService', () => {
  let service: CompalinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompalinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
