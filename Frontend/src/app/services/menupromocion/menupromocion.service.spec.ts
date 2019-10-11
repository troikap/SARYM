import { TestBed } from '@angular/core/testing';

import { MenupromocionService } from './menupromocion.service';

describe('MenupromocionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenupromocionService = TestBed.get(MenupromocionService);
    expect(service).toBeTruthy();
  });
});
