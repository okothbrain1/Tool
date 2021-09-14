import { TestBed } from '@angular/core/testing';

import { Database5Service } from './database5.service';

describe('Database5Service', () => {
  let service: Database5Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Database5Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
