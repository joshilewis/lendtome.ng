import { Component, OnInit, QueryList } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { GoogleBook } from "../googlebooks/googlebook";
import { GoogleBooksService } from "../googlebooks/google-books.service";
import { catchError, map, tap } from "rxjs/operators";
import { LendtomeService } from "../lendtome.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-book",
  templateUrl: "./add-book.component.html",
  styleUrls: ["./add-book.component.css"]
})
export class AddBookComponent implements OnInit {
  public books: Observable<GoogleBook[]>;
  public searchTerm: string;
  public addingIds: string[];
  public addedIds: string[];
  constructor(
    private route: ActivatedRoute,
    private googleBooksService: GoogleBooksService,
    public lendtomeService: LendtomeService,
    private router: Router
  ) {
    this.searchTerm = this.route.snapshot.paramMap.get("searchTerm");
    this.books = googleBooksService.searchBooks(this.searchTerm);
    this.addingIds = [];
    this.addedIds = [];
  }

  ngOnInit() {}

  public addBook(bookToAdd: GoogleBook): void {
    this.addingIds.push(bookToAdd.id);
    this.lendtomeService
      .addBook(bookToAdd)
      .then(res => {
        this.addingIds = this.addingIds.filter(x => x !== bookToAdd.id);
        this.addedIds.push(bookToAdd.id);
        // this.router.navigateByUrl("mybooks");
      })
      .catch(err => console.log(err));
  }
}
