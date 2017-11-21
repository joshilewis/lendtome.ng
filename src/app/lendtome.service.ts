import { Injectable } from '@angular/core';
import { PersistenceService } from 'angular-persistence';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { LibrarySearchResult } from './librarysearchresult';
import { BookSearchResult } from './booksearchresult';
import { error } from 'util';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AuthService } from './core/auth.service';
import { retry } from 'rxjs/operators/retry';

@Injectable()
export class LendtomeService {
  apiBase = 'https://dev.lend-to.me/api/';
  administeredLibraries: Observable<LibrarySearchResult[]>;
  constructor(
    private persistenceService: PersistenceService,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.administeredLibraries = this.http
      .get<LibrarySearchResult[]>('https://dev.lend-to.me/api/libraries/');
  }

  listLibraries(): Observable<LibrarySearchResult[]> {
      return this.http
        .get<LibrarySearchResult[]>('https://dev.lend-to.me/api/libraries/');
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
