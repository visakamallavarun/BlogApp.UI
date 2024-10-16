import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { AddContent } from '../models/content-post.model';
import { GetCategory } from '../models/blog-category';
import { map } from 'rxjs/operators';
import { UpdateBlogPostLanguage } from '../models/update-blog-post-on-language.model';
import { GenerateCategoryResponse } from '../models/category-generate.modely';
import { Category, CategoryService } from 'blog-category';
import { ImageService } from 'blog-image-selector';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  model?: BlogPost;
  modelcontentGenerator?:AddContent;
  modelCategoryGenerator?:GetCategory;
  selectedLanguage: string = 'English';
  languages: string[] = ['English', 'French', 'German', 'Hindi'];
  categories$? : Observable<Category[]>;
  selectedCategories?: string[];
  isImageSelectorVisible : boolean = false;
  modelLanguageTranslation?:UpdateBlogPostLanguage;


  routeSubscription?: Subscription;
  updateBlogPostSubscription?: Subscription;
  getBlogPostSubscription?: Subscription;
  deleteBlogPostSubscription?: Subscription;
  imageSelectSubscricption?: Subscription;
  getContentGenerationSubscription?:Subscription;
  getCategoryGenerationSubscription?:Subscription;
  getBlogPostTranslationSubscription?:Subscription;


  constructor(private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categoryService: CategoryService,
    private router:Router,
    private imageService: ImageService) {

  }


  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();


    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) => {
              this.model = response;
              this.selectedCategories = response.categories.map(x => x.id);
            }
          });
          ;
        }

        this.imageSelectSubscricption = this.imageService.onSelectImage()
        .subscribe({
          next: (response) => {
            if (this.model) {
              this.model.featuredImageUrl = response.url;
              this.isImageSelectorVisible = false;
            }
          }
        })
      }
    });
  }

  onFormSubmit(): void {
    if (this.model && this.id) {
      var updateBlogPost: UpdateBlogPost = {
        author: this.model.author,
        content: this.model.content,
        shortDescription: this.model.shortDescription,
        featuredImageUrl: this.model.featuredImageUrl,
        isVisible: this.model.isVisible,
        publishedDate: this.model.publishedDate,
        title: this.model.title,
        urlHandle: this.model.urlHandle,
        categories: this.selectedCategories ?? []
      };
      
      this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts');
        }
      });
    }

  }

  onDelete(): void {
    if (this.id) {
      this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts');
        }
      });
    }
  }

  onLanguageSelector(event: Event): void {
    const selectedLanguage = (event.target as HTMLSelectElement).value;
    if (this.model && this.id) {
      var updateBlogPost: UpdateBlogPost = {
        author: this.model.author,
        content: this.model.content,
        shortDescription: this.model.shortDescription,
        featuredImageUrl: this.model.featuredImageUrl,
        isVisible: this.model.isVisible,
        publishedDate: this.model.publishedDate,
        title: this.model.title,
        urlHandle: this.model.urlHandle,
        categories: this.selectedCategories ?? []
      };
      if(!this.modelLanguageTranslation){
        this.modelLanguageTranslation = {
          selectedLanguage: selectedLanguage,
          updateBlogPost: updateBlogPost
        };
      }

      this.getBlogPostTranslationSubscription=this.blogPostService.updateBolgPostOnLanguage(this.modelLanguageTranslation).
      subscribe({
        next:(response:BlogPost)=>{
          if(this.model){
            this.model.title=response.title;
            this.model.shortDescription=response.shortDescription;
            this.model.content=response.content;
            this.model.author=response.author;
          }
        }
      })
    }
  }
  onContentGenerator(): void {
    if(this.model?.title && this.model.shortDescription){
      if (!this.modelcontentGenerator) {
        this.modelcontentGenerator = { title: '', shortDescription: '' };
      }
      this.modelcontentGenerator.title=this.model?.title;
      this.modelcontentGenerator.shortDescription=this.model?.shortDescription;
      this.getContentGenerationSubscription=this.blogPostService.generateContent(this.modelcontentGenerator).
      subscribe({
        next: (response:string) => {
          if(this.model){
            this.model.content=response;
          }
        }
      });
    }
  }

 onCategoryGenerator(): void {
    if (this.model?.content) {
      this.getCategoryGenerationSubscription = this.blogPostService.generateCategory(this.model.content)
        .subscribe({
          next: (response: GenerateCategoryResponse) => {
            if (this.model && response) {
              this.categories$ = this.categoryService.getAllCategories().pipe(
                map((categories: Category[]) => {
                  const combinedCategories = [...categories];
                  response.allCategories.forEach(newCat => {
                    if (!combinedCategories.some(cat => cat.id === newCat.id)) {
                      combinedCategories.push(newCat);
                    }
                  });
                  return combinedCategories;
                })
              );
              this.selectedCategories = [response.newCategory.id];
            }
          },
          error: (err) => {
            console.error('Error occurred:', err);
          }
        });
    }}




  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector() : void {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscricption?.unsubscribe();
  }
}
