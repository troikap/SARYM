import { TestBed } from '@angular/core/testing';

import { EstadousuarioService } from './estadousuario.service';

describe('EstadousuarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstadousuarioService = TestBed.get(EstadousuarioService);
    expect(service).toBeTruthy();
  });
});
