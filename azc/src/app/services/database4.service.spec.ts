import { TestBed } from '@angular/core/testing';

import { Database4Service } from './database4.service';

describe('Database4Service', () => {
  let service: Database4Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Database4Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
