import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LendtomeService } from "../lendtome.service";
import { BookSearchResult } from "../booksearchresult";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-book-search-results",
  templateUrl: "./book-search-results.component.html",
  styleUrls: ["./book-search-results.component.css"]
})
export class BookSearchResultsComponent implements OnInit {
  public searchResults: Observable<BookSearchResult[]>;
  public searchTerm: string;

  constructor(
    private route: ActivatedRoute,
    public lendtomeService: LendtomeService
  ) {
    this.searchTerm = this.route.snapshot.paramMap.get("searchTerm");
    this.searchResults = this.lendtomeService.searchBooks(this.searchTerm);
  }

  ngOnInit() {}
}
