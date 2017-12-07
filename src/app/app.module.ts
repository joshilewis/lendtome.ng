import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { AngularFireModule } from "angularfire2";
import { environment } from "../environments/environment";
import { PersistenceModule } from "angular-persistence";

import { AppComponent } from "./app.component";
import { RoutingModule } from "./infra/routing.module";
import { IndexComponent } from "./index/index.component";
import { HowItWorksComponent } from "./how-it-works/how-it-works.component";
import { LendtomeService } from "./lendtome.service";
import { SignInComponent } from "./sign-in/sign-in.component";
import { HomeComponent } from "./home/home.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { ProfileComponent } from "./profile/profile.component";
import { AddBookComponent } from "./add-book/add-book.component";
import { GoogleBooksService } from "./googlebooks/google-books.service";
import { MyBooksComponent } from "./my-books/my-books.component";
import { NewBookSearcherComponent } from "./new-book-searcher/new-book-searcher.component";
import { BarcodeScannerDialogComponent } from "./barcode-scanner-dialog/barcode-scanner-dialog.component";
import { BarcodeDecoderService } from "./barcode-scanner-dialog/barcode-decoder.service";
import { BarcodeScannerComponent } from "./barcode-scanner/barcode-scanner.component";
import { LibraryResultsComponent } from "./library-results/library-results.component";
import { ConnectedLibrariesComponent } from "./connected-libraries/connected-libraries.component";
import { BookSearchResultsComponent } from "./book-search-results/book-search-results.component";
import { InfraModule } from "./infra/infra.module";

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HowItWorksComponent,
    SignInComponent,
    HomeComponent,
    ToolbarComponent,
    ProfileComponent,
    AddBookComponent,
    MyBooksComponent,
    NewBookSearcherComponent,
    BarcodeScannerDialogComponent,
    BarcodeScannerComponent,
    LibraryResultsComponent,
    ConnectedLibrariesComponent,
    BookSearchResultsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    AngularFireModule.initializeApp(environment.firebase, "lend-to.me"),
    PersistenceModule,
    HttpClientJsonpModule,
    InfraModule
  ],
  providers: [LendtomeService, GoogleBooksService, BarcodeDecoderService],
  entryComponents: [BarcodeScannerDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
