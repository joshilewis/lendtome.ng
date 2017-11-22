import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LibrarySearchResult } from '../librarysearchresult';
import { BookSearchResult } from '../booksearchresult';
import { LendtomeService } from '../lendtome.service';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LibrariesComponent implements OnInit {
  constructor(public lendtomeService: LendtomeService, private http: HttpClient) {}

  ngOnInit() {
  }

  listBooks() {
    this.http
      .get<BookSearchResult[]>(
        'https://dev.lend-to.me/api/libraries/e63299b1-0ae5-4d8f-8c09-0eb8d2934f73/books/'
      )
      .subscribe(data => {
        data.forEach(result => {
          console.log(
            `Book result: ${result.title} by ${result.author} published in ${result.publishYear}`
          );
        });
      });
  }
}
