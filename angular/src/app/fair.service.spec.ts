import { TestBed } from '@angular/core/testing';

import { FairService } from './fair.service';

describe('FairService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FairService = TestBed.get(FairService);
    expect(service).toBeTruthy();
  });
});
