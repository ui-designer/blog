import { TestBed, async, inject } from '@angular/core/testing';

import { IsloginGuard } from './islogin.guard';

describe('IsloginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsloginGuard]
    });
  });

  it('should ...', inject([IsloginGuard], (guard: IsloginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
