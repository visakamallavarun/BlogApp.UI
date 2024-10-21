import { APP_INITIALIZER, Injectable, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { MarkdownModule } from 'ngx-markdown';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ImageSelectorLibModule } from 'image-selector-lib';
import { CategoryLibModule, LibConfigurationProvider, LibToConfigureConfiguration } from 'category-lib';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ConfigurationStore {
  private internalConfig: LibToConfigureConfiguration = {
    backendApi: ''
  }; 

  setConfig(config: LibToConfigureConfiguration) {
    this.internalConfig = config;
  }

  getConfig() {
    return this.internalConfig;
  }
}

export function initApp(configurationStore: ConfigurationStore) {
  return () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        configurationStore.setConfig({backendApi: environment.apiBaseUrl});
        resolve();
      }, 2000);
    });
  };
}

@Injectable({ providedIn: 'root' })
export class ConfigFromApp implements LibConfigurationProvider {
  constructor(private configStore: ConfigurationStore) {}

  get config(): LibToConfigureConfiguration {
    return this.configStore.getConfig();
  }
}



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BlogpostListComponent,
    AddBlogpostComponent,
    EditBlogpostComponent,
    HomeComponent,
    BlogDetailsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    ImageSelectorLibModule.forRoot({
      config: {
        provide: LibConfigurationProvider,
        useClass: ConfigFromApp,
      },
    }),
    CategoryLibModule.forRoot({
      config: {
        provide: LibConfigurationProvider,
        useClass: ConfigFromApp,
      },
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [ConfigurationStore],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

