import { TestBed } from '@angular/core/testing';

import { LoginValidationService } from './login-validation.service';

describe('LoginValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginValidationService = TestBed.get(LoginValidationService);
    expect(service).toBeTruthy();
  });
});
