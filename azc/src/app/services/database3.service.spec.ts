import { TestBed } from '@angular/core/testing';

import { Database3Service } from './database3.service';

describe('Database3Service', () => {
  let service: Database3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Database3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
