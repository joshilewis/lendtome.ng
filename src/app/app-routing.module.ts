import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./core/auth.guard";
import { IndexComponent } from "./index/index.component";
import { HowItWorksComponent } from "./how-it-works/how-it-works.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { HomeComponent } from "./home/home.component";
import { DefaultGuard } from "./core/default.guard";
import { ProfileComponent } from "./profile/profile.component";
import { AddBookComponent } from "./add-book/add-book.component";
import { MyBooksComponent } from "./my-books/my-books.component";
import { BarcodeScannerDialogComponent } from "./barcode-scanner-dialog/barcode-scanner-dialog.component";
import { LibraryResultsComponent } from "./library-results/library-results.component";
import { ConnectedLibrariesComponent } from "./connected-libraries/connected-libraries.component";
import { BookSearchResultsComponent } from "./book-search-results/book-search-results.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "user", component: UserProfileComponent },
  { path: "index", component: IndexComponent },
  { path: "how-it-works", component: HowItWorksComponent },
  { path: "sign-in", component: SignInComponent },
  { path: "home", component: HomeComponent, canActivate: [DefaultGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: "addbook/:searchTerm",
    component: AddBookComponent,
    canActivate: [AuthGuard]
  },
  { path: "mybooks", component: MyBooksComponent, canActivate: [AuthGuard] },
  {
    path: "scan",
    component: BarcodeScannerDialogComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "librarysearch/:searchTerm",
    component: LibraryResultsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "libraries",
    component: ConnectedLibrariesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "booksearch/:searchTerm",
    component: BookSearchResultsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
