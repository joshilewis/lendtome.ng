import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { IndexComponent } from './index/index.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { LibrariesComponent } from './libraries/libraries.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { DefaultGuard } from './core/default.guard';
import { MustBeSignedOut } from './core/must-be-signed-out.guard.';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'user', component: UserProfileComponent },
  { path: 'index', component: IndexComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'sign-in', component: SignInComponent, canActivate: [MustBeSignedOut] },
  { path: 'libraries', component: LibrariesComponent, canActivate: [AuthGuard]  },
  { path: 'home', component: HomeComponent, canActivate: [DefaultGuard]  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
