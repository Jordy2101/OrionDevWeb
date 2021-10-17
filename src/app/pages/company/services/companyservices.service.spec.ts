import { TestBed } from '@angular/core/testing';

import { CompanyservicesService } from './companyservices.service';

describe('CompanyservicesService', () => {
  let service: CompanyservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
