import { TestBed } from '@angular/core/testing';

import { DatabaseSentService } from './databaseSent.service';

describe('DatabaseSentService', () => {
  let service: DatabaseSentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseSentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
