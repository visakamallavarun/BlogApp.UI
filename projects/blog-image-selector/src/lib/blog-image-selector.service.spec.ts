import { TestBed } from '@angular/core/testing';

import { BlogImageSelectorService } from './blog-image-selector.service';

describe('BlogImageSelectorService', () => {
  let service: BlogImageSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogImageSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
