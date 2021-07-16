import { TestBed } from '@angular/core/testing';

import { VerificadorNoSesionGuard } from './verificador-no-sesion.guard';

describe('VerificadorNoSesionGuard', () => {
  let guard: VerificadorNoSesionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerificadorNoSesionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
