import { TestBed, inject } from '@angular/core/testing';

import { GoogleBooksServiceService } from './google-books-service.service';

describe('GoogleBooksServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleBooksServiceService]
    });
  });

  it('should be created', inject([GoogleBooksServiceService], (service: GoogleBooksServiceService) => {
    expect(service).toBeTruthy();
  }));
});
