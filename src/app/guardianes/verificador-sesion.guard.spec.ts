import { TestBed } from '@angular/core/testing';

import { VerificadorSesionGuard } from './verificador-sesion.guard';

describe('VerificadorSesionGuard', () => {
  let guard: VerificadorSesionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerificadorSesionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
