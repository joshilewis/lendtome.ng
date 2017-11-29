import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule  } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PersistenceModule } from 'angular-persistence';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { MaterialModuleModule } from './/material-module.module';
import { IndexComponent } from './index/index.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { CoreModule } from './core/core.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TokenInterceptor } from './core/token.interceptor';
import { LendtomeService } from './lendtome.service';
import { AuthService } from './core/auth.service';
import { AuthGuard } from './core/auth.guard';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { DefaultGuard } from './core/default.guard';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProfileComponent } from './profile/profile.component';
import { AddBookComponent } from './add-book/add-book.component';
import { GoogleBooksService } from './googlebooks/google-books.service';
import { WA18396Interceptor } from './core/WA18396.interceptor';
import { MyBooksComponent } from './my-books/my-books.component';
import { NewBookSearcherComponent } from './new-book-searcher/new-book-searcher.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HowItWorksComponent,
    UserProfileComponent,
    SignInComponent,
    HomeComponent,
    ToolbarComponent,
    ProfileComponent,
    AddBookComponent,
    MyBooksComponent,
    NewBookSearcherComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModuleModule,
    AngularFireModule.initializeApp(environment.firebase, 'lend-to.me'),
    CoreModule,
    PersistenceModule,
    HttpClientJsonpModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WA18396Interceptor,
      multi: true,
    },
    LendtomeService,
    AuthService,
    AuthGuard,
    DefaultGuard,
    GoogleBooksService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
