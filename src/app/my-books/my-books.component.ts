import { Component, OnInit } from "@angular/core";
import { LendtomeService } from "../lendtome.service";
import { BookSearchResult } from "../dto/booksearchresult";
import { NewBookSearcherComponent } from "../new-book-searcher/new-book-searcher.component";
import { BarcodeScannerComponent } from "../barcode-scanner/barcode-scanner.component";
import { Call_Status } from "../infra/call-status";
import { MatSnackBar } from "@angular/material";
import { Constants } from "../infra/contstants";

@Component({
  selector: "app-my-books",
  templateUrl: "./my-books.component.html",
  styleUrls: ["./my-books.component.css"]
})
export class MyBooksComponent implements OnInit {
  public Call_Status = Call_Status;
  public callStatus: Map<string, Call_Status>;
  constructor(
    public lendtomeService: LendtomeService,
    private snackBar: MatSnackBar
  ) {
    this.callStatus = new Map<string, Call_Status>();
  }

  ngOnInit() {}

  public removeBook(book: BookSearchResult): void {
    this.callStatus[book.title] = Call_Status.Pending;
    this.callStatus.set(book.title, Call_Status.Pending);
    this.lendtomeService
      .removeBook(book)
      .then(resolve => {
        this.snackBar.open(
          "Book successfully removed",
          "Ok",
          Constants.defaults.snackBarConfig
        );
        this.lendtomeService.refreshBooks();
      })
      .catch(err => console.log(err));
  }
}
