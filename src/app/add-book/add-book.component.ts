import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GoogleBook } from '../googlebooks/googlebook';
import { GoogleBooksService } from '../googlebooks/google-books-service.service';
import { catchError, map, tap } from 'rxjs/operators';
import { LendtomeService } from '../lendtome.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  books: Observable<GoogleBook[]>;
  constructor(
    private route: ActivatedRoute,
    private googleBooksService: GoogleBooksService,
    public lendtomeService: LendtomeService,
    private router: Router,
  ) {
    this.books = googleBooksService
      .searchBooks(this.route.snapshot.paramMap.get('isbn'));
  }

  ngOnInit() {
    this.lendtomeService.initialiseLibrary();
  }

  public addBook(bookToAdd: GoogleBook): void {
    this.lendtomeService.addBook(bookToAdd)
      .then(res => {
          this.router.navigateByUrl('home');
        })
      .catch(err => console.log(err));
  }
}
