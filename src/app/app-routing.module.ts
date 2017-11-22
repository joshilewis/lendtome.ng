import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { HomeComponent } from './home/home.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { LibrariesComponent } from './libraries/libraries.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'user', component: UserProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: 'how-it-works', component: HowItWorksComponent, canActivate: [AuthGuard] },
  { path: 'get-started', component: GetStartedComponent, canActivate: [AuthGuard]  },
  { path: 'libraries', component: LibrariesComponent, canActivate: [AuthGuard]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
