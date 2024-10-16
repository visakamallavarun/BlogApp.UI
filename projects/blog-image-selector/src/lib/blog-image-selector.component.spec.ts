import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogImageSelectorComponent } from './blog-image-selector.component';

describe('BlogImageSelectorComponent', () => {
  let component: BlogImageSelectorComponent;
  let fixture: ComponentFixture<BlogImageSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogImageSelectorComponent]
    });
    fixture = TestBed.createComponent(BlogImageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
