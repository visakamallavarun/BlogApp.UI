import { NgModule } from '@angular/core';
import { BlogImageSelectorComponent } from './blog-image-selector.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ImageSelectorComponent } from './components/image-selector/image-selector.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BlogImageSelectorComponent,
    ImageSelectorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    BlogImageSelectorComponent,
    ImageSelectorComponent
  ]
})
export class BlogImageSelectorModule { }
