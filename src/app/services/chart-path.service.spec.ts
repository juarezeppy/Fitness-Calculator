import { TestBed, inject } from '@angular/core/testing';

import { ChartPathService } from './chart-path.service';

describe('ChartPathService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartPathService]
    });
  });

  it('should be created', inject([ChartPathService], (service: ChartPathService) => {
    expect(service).toBeTruthy();
  }));
});
