import { TestBed } from '@angular/core/testing';

import { AstronautsService } from '../services/astronauts.service';

describe('AstronautsService', () => {
  let service: AstronautsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AstronautsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
