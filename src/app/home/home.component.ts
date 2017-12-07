import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../infra/auth/auth.service";
import { LendtomeService } from "../lendtome.service";
import { BookSearchResult } from "../dto/booksearchresult";
import { BarcodeScannerComponent } from "../barcode-scanner/barcode-scanner.component";
import { LibrarySearchResult } from "../dto/librarysearchresult";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(
    public lendtomeService: LendtomeService,
    private router: Router
  ) {}

  ngOnInit() {}

  public searchForLibraries(searchTerm: string): void {
    this.router.navigateByUrl("librarysearch/" + searchTerm);
  }

  public searchForBooks(searchTerm: string): void {
    this.router.navigateByUrl("booksearch/" + searchTerm);
  }

  public acceptConnection(library: LibrarySearchResult): void {
    this.lendtomeService
      .acceptConnection(library)
      .then(this.lendtomeService.refreshLibraryStatus)
      .catch(err => console.log(err));
  }
}
