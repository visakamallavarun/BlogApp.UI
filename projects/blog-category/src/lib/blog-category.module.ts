import { NgModule } from '@angular/core';
import { BlogCategoryComponent } from './blog-category.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from './category/services/category.service';

@NgModule({
  declarations: [
    BlogCategoryComponent,
    CategoryListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    CommonModule
  ],
  exports: [
    BlogCategoryComponent,
    CategoryListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
  ]
})
export class BlogCategoryModule { }
