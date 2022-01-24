import { TestBed } from '@angular/core/testing';

import { LoginUiService } from './login-ui.service';

describe('LoginUiService', () => {
  let service: LoginUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
