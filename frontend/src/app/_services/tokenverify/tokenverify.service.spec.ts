import { TestBed } from '@angular/core/testing';

import { TokenverifyService } from './tokenverify.service';

describe('TokenverifyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenverifyService = TestBed.get(TokenverifyService);
    expect(service).toBeTruthy();
  });
});
