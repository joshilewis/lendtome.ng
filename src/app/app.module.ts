import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PersistenceModule } from 'angular-persistence';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { MaterialModuleModule } from './/material-module.module';
import { IndexComponent } from './index/index.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { LibrariesComponent } from './libraries/libraries.component';
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
import { MustBeSignedOut } from './core/must-be-signed-out.guard.';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HowItWorksComponent,
    LibrariesComponent,
    UserProfileComponent,
    SignInComponent,
    HomeComponent,
    ToolbarComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModuleModule,
    AngularFireModule.initializeApp(environment.firebase, 'lend-to.me'),
    CoreModule,
    PersistenceModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    LendtomeService,
    AuthService,
    AuthGuard,
    DefaultGuard,
    MustBeSignedOut,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
