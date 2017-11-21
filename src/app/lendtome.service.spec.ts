import { TestBed, inject } from '@angular/core/testing';

import { LendtomeService } from './lendtome.service';

describe('LendtomeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LendtomeService]
    });
  });

  it('should be created', inject([LendtomeService], (service: LendtomeService) => {
    expect(service).toBeTruthy();
  }));
});
