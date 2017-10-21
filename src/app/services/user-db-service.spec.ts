import { TestBed, inject } from '@angular/core/testing';

import { UserDBService } from './user-db-service';

describe('UserDBService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDBService]
    });
  });

  it('should be created', inject([UserDBService], (service: UserDBService) => {
    expect(service).toBeTruthy();
  }));
});
