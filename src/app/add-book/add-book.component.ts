import { Component, OnInit, QueryList } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { GoogleBook } from "../googlebooks/googlebook";
import { GoogleBooksService } from "../googlebooks/google-books.service";
import { catchError, map, tap } from "rxjs/operators";
import { LendtomeService } from "../lendtome.service";
import { Router } from "@angular/router";
import { Call_Status } from "../infra/call-status";

@Component({
  selector: "app-add-book",
  templateUrl: "./add-book.component.html",
  styleUrls: ["./add-book.component.css"]
})
export class AddBookComponent implements OnInit {
  public books: Observable<GoogleBook[]>;
  public searchTerm: string;
  public callStatus: Map<string, Call_Status>;
  public Call_Status = Call_Status;
  constructor(
    private route: ActivatedRoute,
    private googleBooksService: GoogleBooksService,
    public lendtomeService: LendtomeService,
    private router: Router
  ) {
    this.searchTerm = this.route.snapshot.paramMap.get("searchTerm");
    this.books = googleBooksService.searchBooks(this.searchTerm);
    this.callStatus = new Map<string, Call_Status>();
  }

  ngOnInit() {}

  public addBook(bookToAdd: GoogleBook): void {
    this.callStatus[bookToAdd.id] = Call_Status.Pending;
    this.callStatus.set(bookToAdd.id, Call_Status.Pending);
    this.lendtomeService
      .addBook(bookToAdd)
      .then(res => {
        this.callStatus[bookToAdd.id] = Call_Status.Success;
        // this.router.navigateByUrl("mybooks");
      })
      .catch(err => console.log(err));
  }
}
