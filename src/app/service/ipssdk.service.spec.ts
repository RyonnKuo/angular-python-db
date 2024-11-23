import { TestBed } from '@angular/core/testing';

import { IpssdkService } from './ipssdk.service';

describe('IpssdkService', () => {
  let service: IpssdkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpssdkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
