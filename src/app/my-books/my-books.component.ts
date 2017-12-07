import { Component, OnInit } from "@angular/core";
import { LendtomeService } from "../lendtome.service";
import { BookSearchResult } from "../dto/booksearchresult";
import { NewBookSearcherComponent } from "../new-book-searcher/new-book-searcher.component";
import { BarcodeScannerComponent } from "../barcode-scanner/barcode-scanner.component";

@Component({
  selector: "app-my-books",
  templateUrl: "./my-books.component.html",
  styleUrls: ["./my-books.component.css"]
})
export class MyBooksComponent implements OnInit {
  constructor(public lendtomeService: LendtomeService) {}

  ngOnInit() {}

  public removeBook(book: BookSearchResult): void {
    this.lendtomeService
      .removeBook(book)
      .then(resolve => {
        this.lendtomeService.refreshBooks();
      })
      .catch(err => console.log(err));
  }
}
