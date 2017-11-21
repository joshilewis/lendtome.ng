import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { LibrariesComponent } from './libraries/libraries.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'get-started', component: GetStartedComponent },
  { path: 'libraries', component: LibrariesComponent },
  { path: 'user', component: UserProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
