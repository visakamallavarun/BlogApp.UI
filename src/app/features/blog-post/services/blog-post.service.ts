import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Observable,throwError } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { environment } from 'src/environments/environment';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { AddContent } from '../models/content-post.model';
import { UpdateBlogPostLanguage } from '../models/update-blog-post-on-language.model';
import { GenerateCategoryResponse } from '../models/category-generate.modely';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient) { }

  createBlogPost(data: AddBlogPost) : Observable<BlogPost> {
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/blogposts?addAuth=true`, data);
  }

  getAllBlogPosts() : Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/blogposts`);
  }

  getBlogPostById(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}`);
  }

  getBlogPostByUrlHandle(urlHandle: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${urlHandle}`);
  }

  updateBlogPost(id: string, updatedBlogPost: UpdateBlogPost): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}?addAuth=true`, updatedBlogPost);
  }

  deleteBlogPost(id: string): Observable<BlogPost> {
    return this.http.delete<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}?addAuth=true`);
  }

  generateContent(data:AddContent): Observable<string> {
    return this.http.post<string>(`${environment.apiBaseUrl}/api/BlogPosts/Content/`,data, { responseType: 'text' as 'json' });
  }

  generateCategory(content: string): Observable<GenerateCategoryResponse> {
  const payload = { content: content };
    return this.http.post<GenerateCategoryResponse>(
      `${environment.apiBaseUrl}/api/BlogPosts/Categories/Content`, 
      payload, 
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    )
  }


  updateBolgPostOnLanguage(data:UpdateBlogPostLanguage):Observable<BlogPost> {
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/BlogPosts/translate/`, data);
  }
}
