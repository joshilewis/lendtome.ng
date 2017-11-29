import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GoogleBook } from './googlebook';

@Injectable()
export class GoogleBooksService {

  private API_PATH = 'https://www.googleapis.com/books/v1/volumes?q=';

    constructor(private http: HttpClient, ) {}

    searchBooks(searchTerm: string): Observable<GoogleBook[]> {
      return this.http
        .jsonp<{ items: GoogleBook[] }>(`${this.API_PATH}${searchTerm}&maxResults=10`, `callback`)
        .map(books => books.items || []);
    }

}
