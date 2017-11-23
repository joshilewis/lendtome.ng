import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { IndexComponent } from './index/index.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { LibrariesComponent } from './libraries/libraries.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignedInHomeComponent } from './signed-in-home/signed-in-home.component';
import { DefaultGuard } from './core/default.guard';

const routes: Routes = [
  { path: '', redirectTo: 'signed-in', pathMatch: 'full' },
  // { path: '', component: SignedInindexComponent, canActivate: [DefaultGuard]  },
  // { path: '**', redirectTo: 'signed-in', pathMatch: 'full' },
  { path: 'user', component: UserProfileComponent },
  { path: 'index', component: IndexComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'libraries', component: LibrariesComponent, canActivate: [AuthGuard]  },
  { path: 'signed-in', component: SignedInHomeComponent, canActivate: [DefaultGuard]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
