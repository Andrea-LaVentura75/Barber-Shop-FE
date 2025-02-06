import { TestBed } from '@angular/core/testing';

import { TaglioService } from './taglio.service';

describe('TaglioService', () => {
  let service: TaglioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaglioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
