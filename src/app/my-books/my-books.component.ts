import { Component, OnInit } from '@angular/core';
import { LendtomeService } from '../lendtome.service';
import { BookSearchResult } from '../booksearchresult';
import { NewBookSearcherComponent } from '../new-book-searcher/new-book-searcher.component';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {

  constructor(public lendtomeService: LendtomeService) { }

  ngOnInit() {
    this.lendtomeService.initialiseLibrary();
  }

  public removeBook(book: BookSearchResult): void {
    this.lendtomeService
      .removeBook(book)
      .then(res => {
        this.lendtomeService.refreshBooks();
      })
      .catch(err => console.log(err));
  }
}
